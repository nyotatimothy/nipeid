import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    data: session,
    status,
    isAuthenticated: !!session,
    user: session?.user || null
  };
} 