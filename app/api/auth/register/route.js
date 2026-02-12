// app/api/auth/register/route.js
/*
API pour l'inscription des utilisateurs
Etapes :
1. Valider les données reçues
2. Vérifier si l'email existe déjà
3. Hasher le mot de passe
4. Créer l'utilisateur en base
5. Retourner une réponse de succès
*/

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
export async function POST(request) {
  try {
    // Récupérer les données du formulaire
    const body = await request.json();
    const { name, email, password } = body;

    // Validation des champs obligatoires
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Validation du format email (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Format email invalide" },
        { status: 400 }
      );
    }

    // Validation longueur mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Mot de passe trop court (minimum 6 caractères)" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds

    // Créer l'utilisateur en base
    const user = await prisma.user.create({
      data: {
        name: name?.trim() || null,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "USER", // Role par défaut
      },
    });

    // Retourner une réponse de succès (sans le mot de passe)
    return NextResponse.json(
      {
        message: "Inscription réussie",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur inscription :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
