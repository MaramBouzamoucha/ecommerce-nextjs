import Link from "next/link";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
        🛍️ Catalogue
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 
                       hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative h-52 bg-gray-100 overflow-hidden">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover 
                             group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Pas d’image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {p.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {p.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-600">
                  {p.price} TND
                </span>

                <span className="text-sm text-gray-500 group-hover:text-emerald-600 transition">
                  Voir →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
