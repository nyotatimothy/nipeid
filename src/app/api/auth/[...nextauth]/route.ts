import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // Add more providers here (Google, GitHub, etc.)
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      // Attach user role to session for RBAC
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && (user as any).role) {
        (token as any).role = (user as any).role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST }; 