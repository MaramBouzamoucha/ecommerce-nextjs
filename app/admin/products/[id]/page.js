// app/admin/products/[id]/page.js
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth-utils";
import Link from "next/link";

export default async function ViewProductPage({ params }) {
  const { id } = await params;
  await requireAdmin();

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) return <p className="text-red-600 mt-10 text-center">Produit non trouvé</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">{product.title}</h1>

      <div className="space-y-4">
        <p><span className="font-semibold">Prix :</span> {product.price} DT</p>
        <p><span className="font-semibold">Stock :</span> {product.stock}</p>
        <p><span className="font-semibold">Catégorie :</span> {product.category?.name || "Sans catégorie"}</p>
        {product.description && (
          <p><span className="font-semibold">Description :</span> {product.description}</p>
        )}
      </div>

      <div className="mt-6 space-x-4">
        <Link
          href={`/admin/products/${id}/edit`}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
        >
          Modifier
        </Link>
        <Link
          href={`/admin/products/${id}/delete`}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Supprimer
        </Link>
        <Link
          href="/admin/products"
          className="text-gray-600 hover:text-blue-600 hover:underline"
        >
          ← Retour à la liste
        </Link>
      </div>
    </div>
  );
}
