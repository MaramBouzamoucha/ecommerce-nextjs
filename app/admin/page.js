// app/admin/page.js
// Dashboard principal de l'administration
// Affiche des statistiques :
// - Nombre de produits
// - Nombre de commandes
// - Nombre d'utilisateurs
// - Chiffre d'affaires
import Link from "next/link";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../lib/auth-utils";

export default async function AdminDashboard() {
  // Vérification admin (double sécurité avec le layout)
  await requireAdmin();

  // Récupérer les statistiques
  const [productsCount, ordersCount, usersCount, totalRevenue] = await Promise.all([
    // Nombre de produits
    prisma.product.count(),

    // Nombre de commandes
    prisma.order.count(),

    // Nombre d'utilisateurs
    prisma.user.count(),

    // Chiffre d'affaires (somme des commandes payées)
    prisma.order.aggregate({
      where: { status: "PAID" },
      _sum: { total: true },
    }),
  ]);

  // Formater le chiffre d'affaires
  const revenue = totalRevenue._sum.total || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Administration
      </h1>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Produits */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Produits</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{productsCount}</p>
        </div>

        {/* Commandes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Commandes</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{ordersCount}</p>
        </div>

        {/* Utilisateurs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Utilisateurs</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{usersCount}</p>
        </div>

        {/* Chiffre d'affaires */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Chiffre affaires</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {revenue.toFixed(2)} DT
          </p>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Actions rapides
  </h2>

  <div className="flex gap-4">
    <Link
      href="/admin/products/new"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Ajouter un produit
    </Link>

    <Link
      href="/admin/categories/new"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Ajouter une catégorie
    </Link>
  </div>
</div><div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Actions rapides
  </h2>

  <div className="flex gap-4">
    <Link
      href="/admin/products/new"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Ajouter un produit
    </Link>

    <Link
      href="/admin/categories/new"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Ajouter une catégorie
    </Link>
  </div>
</div>
      </div>
   
  );
}
