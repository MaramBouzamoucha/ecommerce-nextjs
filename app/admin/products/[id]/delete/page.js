// app/admin/products/[id]/delete/page.js
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth-utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DeleteProductPage({ params }) {
  const { id } = await params;
  await requireAdmin();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return <p className="text-red-600 mt-10 text-center">Produit non trouvé</p>;

  async function deleteProductAction() {
    "use server";
    await prisma.product.delete({ where: { id } });
    redirect("/admin/products?success=Produit+supprimé+avec+succès");
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md text-gray-800 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Supprimer le Produit</h1>
      <p className="mb-6">
        Êtes-vous sûr de vouloir supprimer le produit{" "}
        <span className="font-semibold">{product.title}</span> ?
      </p>

      <form action={deleteProductAction} className="flex justify-center gap-4">
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Oui, supprimer
        </button>
        <Link
          href={`/admin/products/${id}`}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors"
        >
          Annuler
        </Link>
      </form>
    </div>
  );
}
