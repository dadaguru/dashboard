import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

import GoogleProvider from "next-auth/providers/google";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;    
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    /* GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //token: true,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        console.log("profile is :", profile);
        // Return all the profile information you need.
        // The only truly required field is `id`
        // to be able identify the account when added to a database
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },      
    }), */
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);          
          /*in console the value of above user is : {
            id: '410544b2-4001-4271-9855-fec4b6a6442a',
            name: 'User',
            email: 'user@nextmail.com',
            password: '$2b$10$whThoqddRbpBYx7VkNcKoOBiqYpN9AYZGaqeFxYe2m/XzDxEV4Gyu',
            role: 'admin'
          } */
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});