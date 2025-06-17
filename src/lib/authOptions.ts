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
          console.log('Social login attempt:', { 
            provider: account.provider, 
            email: user.email,
            name: user.name
          });
          
          // Check if user exists
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          });

          if (!existingUser) {
            console.log('Creating new user for social login');
            // Create new user if they don't exist
            existingUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || profile.name,
                role: 'USER',
                status: 'ACTIVE',
                emailVerified: new Date(), // Social login means email is verified
                // Store social login info
                provider: account.provider,
                providerId: account.providerAccountId,
              }
            });
            console.log('New user created:', existingUser.id);
          } else {
            console.log('Existing user found:', existingUser.id);
            // Update the user's social login info
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                provider: account.provider,
                providerId: account.providerAccountId
                // Note: lastLogin field removed as it doesn't exist in the User model
              }
            });
            console.log('User social login info updated');
          }

          // Add the user's role and ID to the user object so it's available in the JWT callback
          user.role = existingUser.role;
          user.id = existingUser.id;
          
          return true;
        } catch (error) {
          console.error('Social sign-in error:', error);
          return false;
        } finally {
          await prisma.$disconnect();
        }
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        console.log('JWT callback for user:', user.email);
        
        // Set user ID and role in the token
        token.id = user.id;
        token.role = user.role;
        token.provider = account?.provider || 'credentials';
        
        // For social logins, ensure we have the latest role from the database
        if (account?.provider === 'google' || account?.provider === 'facebook') {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email }
            });
            if (dbUser) {
              token.role = dbUser.role;
              token.id = dbUser.id;
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
          }
        }
      }

      // Handle phone authentication tokens
      if (token.provider === 'phone') {
        // Phone auth tokens already contain the necessary data
        return token;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        console.log('Session callback for token:', { 
          id: token.id, 
          role: token.role, 
          provider: token.provider 
        });
        
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
        
        // Handle phone authentication
        if (token.provider === 'phone') {
          session.user.phone = token.phone;
          // Phone users might not have email/name initially
          session.user.email = token.email || null;
          session.user.name = token.name || null;
        }
      }
      
      console.log('Session created:', { 
        id: session.user.id, 
        role: session.user.role, 
        provider: session.user.provider 
      });
      
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
};
