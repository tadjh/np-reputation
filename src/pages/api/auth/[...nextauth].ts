import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify" } },
    }),
    // ...add more providers here
  ],
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#064e3b", // Hex color code
    logo: "https://np-reputation.vercel.app/_next/image?url=%2FuhnBb.png&w=3840&q=75", // Absolute URL to image
    buttonText: "", // Hex color code
  },
};

export default NextAuth(authOptions);
