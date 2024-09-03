import { api } from '@/config/axios.config';
import { loginSchema } from '@/schemas/auth.schema';
import NextAuth, { User } from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import Credential from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';

export const { signIn, signOut, handlers, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  providers: [
    Credential({
      authorize: async (credentials) => {
        try {
          console.log(credentials);
          const validateFields = loginSchema.safeParse(credentials);
          if (!validateFields.success) throw new Error('Login Gagal');
          let defaultLogin = false;
          if (defaultLogin) {
            const res = await api.get('/user', {
              params: {
                phone_number: credentials?.phone_number,
                password: credentials?.password,
              },
            });
            const user = res.data[0];
            console.log(user);
            delete user.password;
            delete user.confirm_password;
            return user;
          } else {
            const res = await api.post('/auth/login', credentials);
            console.log(res.data.data);
            const token = res.data.data;
            if (!token) throw new Error('Login error!');
            const user = jwtDecode(token) as User;
            return user;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone_number = token.phone_number as string;
        session.user.email = token.email as string;
        session.user.full_name = token.full_name as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.full_name = user.full_name;
        token.phone_number = user.phone_number;
        token.email = user.email;
        token.gender = user.gender;
        token.image = user.image;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
  },
});
