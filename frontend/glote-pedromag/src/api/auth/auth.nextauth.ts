import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '@/api/axios';
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface User {
  id: string;  
  full_name: string;
  email: string;
  role: string;
}

interface CustomSession extends DefaultSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

interface JWT {
  id?: string;
  fullName?: string | null;
  email?: string | null;
  role?: string | null;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your.email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const response = await api.post('/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const user: User = response.data;

          if (response.status === 200 && user) {
            return {
              id: user.id.toString(), 
              name: user.full_name,
              email: user.email,
              role: user.role,
            };
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Login error:', error.response ? error.response.data : error.message);
          } else {
            console.error('Login error:', (error as Error).message);
          }
          throw new Error('Erro durante o login.');
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string | null,  
        name: token.fullName ?? null,
        email: token.email ?? null,
        role: token.role ?? null,
      } as CustomSession['user'];

      return session as CustomSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default NextAuth(authOptions);
