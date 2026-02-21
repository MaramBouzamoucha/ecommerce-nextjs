// app/admin/products/page.js

import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../lib/auth-utils";
import Link from "next/link";

export default async function AdminProductsPage() {
  // 🔐 Vérification ADMIN
  await requireAdmin();

  // 📦 Récupération des produits
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Produits</h1>

        <Link
          href="/admin/products/new-actions"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Ajouter Produit
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">Aucun produit trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Prix</th>
                <th className="p-3 text-left">Catégorie</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, i) => (
                <tr
                  key={product.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 text-gray-800 font-medium">{product.title}</td>
                  <td className="p-3 text-gray-700">{product.price} DT</td>
                  <td className="p-3 text-gray-700">
                    {product.category?.name || "Sans catégorie"}
                  </td>
                  <td className="p-3 text-gray-700">{product.stock}</td>
                  <td className="p-3 space-x-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Voir
                    </Link>

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-yellow-600 hover:underline"
                    >
                      Modifier
                    </Link>

                    <Link
                      href={`/admin/products/${product.id}/delete`}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
