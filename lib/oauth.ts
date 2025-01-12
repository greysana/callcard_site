import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next/client";
import { cookieSet } from "./auth";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }: any) {
      await connectToDatabase();

      try {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = new User({
            email: user.email,
            first_name: profile.given_name || profile.firstName || "",
            last_name: profile.family_name || profile.lastName || "",
            register_type: account.provider,
          });
          console.log("User registered in successfully:", existingUser.email);

          await existingUser.save();
        }
        console.log("User signed in successfully:", existingUser.email);
        const token = jwt.sign(
          { id: existingUser._id, email: existingUser.email },
          process.env.JWT_SECRET!,
          { expiresIn: "7d" }
        );
        // console.log("token: " + token);
        cookieSet(token);
      } catch (error) {
        console.error("Error signing in user:", error);
        return false;
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      return process.env.NEXTAUTH_URL + "/dashboard";
    },

    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },

    async jwt({ token, user, account, profile }: any) {
      await connectToDatabase();

      try {
        let existingUser = await User.findOne({ email: token.email });
        // console.log(existingUser);
        const token1 = jwt.sign(
          { id: existingUser._id, email: existingUser.email },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );
        token.picture = token1;
        token.sub = existingUser._id;
        token.accessToken = account.access_token;
      } catch (err) {}
      // console.log({ token, user, account, profile });
      return token;
    },
  },
});
