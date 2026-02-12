// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

// 1️⃣ Définir authOptions AVANT le handler
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Chercher l'utilisateur en base
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });
        if (!user) return null;

        // Vérifier le mot de passe
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Retourner l'utilisateur pour NextAuth
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" }, // facultatif
  secret: process.env.NEXTAUTH_SECRET,
};

// 2️⃣ Créer le handler avec NextAuth
const handler = NextAuth(authOptions);

// 3️⃣ Exporter pour App Router
export { handler as GET, handler as POST };