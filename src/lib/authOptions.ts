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
            console.log('Getting latest user data for social login');
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email }
            });
            
            if (dbUser) {
              console.log('User found in database, updating token');
              token.id = dbUser.id;
              token.role = dbUser.role;
              token.name = dbUser.name || user.name;
              token.email = dbUser.email;
              token.provider = account.provider;
              token.providerId = dbUser.providerId;
            } else {
              console.log('User not found in database during JWT callback');
            }
          } catch (error) {
            console.error('JWT callback error:', error);
          } finally {
            await prisma.$disconnect();
          }
        }
        
        console.log('JWT token created:', { 
          id: token.id, 
          role: token.role, 
          provider: token.provider 
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        // Use token.id if available, otherwise fall back to token.sub
        session.user.id = token.id || token.sub;
        session.user.role = token.role || 'USER'; // Default to USER if no role is set
        session.user.provider = token.provider;
        
        console.log('Session created:', { 
          id: session.user.id, 
          role: session.user.role, 
          provider: session.user.provider 
        });
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
};
