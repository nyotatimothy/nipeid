import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !(user as any).password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, (user as any).password);

          if (!isPasswordValid) {
            return null;
          }

          if ((user as any).status !== 'ACTIVE') {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === 'google' || account.provider === 'facebook') {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          });

          if (!existingUser) {
            // Create new user if they don't exist
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                role: 'USER',
                status: 'ACTIVE',
                emailVerified: new Date(), // Social login means email is verified
              }
            });
          }

          return true;
        } catch (error) {
          console.error('Social sign-in error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.role = user.role;
        
        // If it's a social login and we don't have a role yet
        if (account?.provider === 'google' || account?.provider === 'facebook') {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email }
            });
            if (dbUser) {
              token.role = dbUser.role;
            }
          } catch (error) {
            console.error('JWT callback error:', error);
          }
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}; 