// app/admin/products/[id]/edit/page.js

import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth-utils";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditProductPage({ params }) {
  const { id } =await params;
  await requireAdmin();
  if (!id) return <p className="text-red-600">ID non trouvé dans URL</p>;

  const product = await prisma.product.findUnique({ where: { id } });
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  if (!product) return <p className="text-red-600">Produit non trouvé</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Modifier le Produit</h1>

      <form action={editProductAction} className="space-y-4">
        <input type="hidden" name="id" value={id} />

        <div>
          <label className="block mb-1 font-semibold">Titre</label>
          <input
            name="title"
            defaultValue={product.title}
            className="w-full p-2 rounded border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Prix (DT)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            className="w-full p-2 rounded border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Stock</label>
          <input
            name="stock"
            type="number"
            defaultValue={product.stock}
            className="w-full p-2 rounded border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Catégorie</label>
          <select
            name="categoryId"
            defaultValue={product.categoryId || ""}
            className="w-full p-2 rounded border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="">Sans catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-500 transition-colors"
        >
          Modifier
        </button>
      </form>

      <Link
        href="/admin/products"
        className="mt-4 block text-gray-600 hover:text-blue-600 hover:underline"
      >
        ← Retour aux produits
      </Link>
    </div>
  );
}

async function editProductAction(formData) {
  "use server";

  const id = formData.get("id");
  const title = formData.get("title");
  const price = parseFloat(formData.get("price"));
  const stock = parseInt(formData.get("stock"));
  const categoryId = formData.get("categoryId") || null;

  await prisma.product.update({
    where: { id },
    data: { title, price, stock, categoryId },
  });


  redirect(`/admin/products`);
}
