// src/lib/auth-utils.js
// Utilitaires d'authentification pour les Server Components
// Ces fonctions permettent de :
// - Vérifier si l'utilisateur est connecté
// - Vérifier si l'utilisateur a un rôle spécifique
// - Récupérer la session côté serveur

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

// Récupérer la session côté serveur
export async function getSession() {
  return await getServerSession(authOptions);
}

// Vérifier que l'utilisateur est connecté
// Redirige vers login si non connecté
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

// Vérifier que l'utilisateur a le rôle ADMIN
// Redirige vers unauthorized si pas admin
export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}

// Vérifier un rôle spécifique
export async function requireRole(role) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect("/unauthorized");
  }

  return session;
}
