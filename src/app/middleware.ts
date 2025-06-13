import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create a new ratelimiter that allows 5 requests per minute
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
})

export async function middleware(request: NextRequest) {
  // Only rate limit the search and report endpoints
  if (
    request.nextUrl.pathname === '/api/lost-document' ||
    request.nextUrl.pathname === '/api/search-document'
  ) {
    const ip = request.ip ?? '127.0.0.1'
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`
    )
    
    if (!success) {
      return new NextResponse('Too many requests. Please try again later.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      })
    }

    const response = NextResponse.next()
    
    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())
    
    return response
  }

  return NextResponse.next()
} 