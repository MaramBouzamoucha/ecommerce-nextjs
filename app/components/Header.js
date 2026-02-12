// src/components/Header.js
"use client";

/*
Header avec gestion de la session utilisateur
- Liens de navigation
- Bouton connexion / déconnexion selon l'état
- Avatar et nom de l'utilisateur connecté
*/

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  // Hook pour récupérer la session
  // status peut être : "loading", "authenticated", "unauthenticated"
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            My Shop
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Produits
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600">
              Panier
            </Link>

            {/* Affichage conditionnel selon l'état de connexion */}
            {status === "loading" ? (
              // Chargement de la session
              <span className="text-gray-400">...</span>
            ) : session ? (
              // Utilisateur connecté
              <div className="flex items-center gap-4">
                {/* Lien admin si role ADMIN */}
                {session.user.role === "ADMIN" && (
                  <Link href="/admin" className="text-purple-600 hover:underline">
                    Admin
                  </Link>
                )}

                {/* Avatar et nom */}
                <div className="flex items-center gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {session.user.name?.[0] || session.user.email?.[0]}
                      </span>
                    </div>
                  )}
                  <span className="text-gray-700">
                    {session.user.name || session.user.email}
                  </span>
                </div>

                {/* Bouton déconnexion */}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600 hover:underline"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              // Utilisateur non connecté
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Inscription
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
