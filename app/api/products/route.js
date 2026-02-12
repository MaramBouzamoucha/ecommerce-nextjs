import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// Petite fonction utilitaire pour créer un slug simple
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // supprime caractères spéciaux
    .replace(/\s+/g, "-")     // espaces -> tirets
    .replace(/-+/g, "-");     // plusieurs tirets -> un seul
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    // On évite de renvoyer les détails internes
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des produits." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validation minimale (séance 4 : validation plus complète)
    const title = body.title?.trim();
    const description = body.description?.trim();
    const price = Number(body.price);
    const stock = Number(body.stock ?? 0);
    const categoryId = body.categoryId || null;
    

    if (!title || !description || Number.isNaN(price)) {
      return NextResponse.json(
        { message: "Champs invalides : title, description, price obligatoires." },
        { status: 400 }
      );
    }

    const slug = body.slug?.trim() || slugify(title);

    const created = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price,
        stock: Number.isNaN(stock) ? 0 : stock,
        categoryId,
        imageUrl,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    // Erreur fréquente : slug déjà existant
    return NextResponse.json(
      { message: "Erreur serveur lors de la création du produit." },
      { status: 500 }
    );
  }
}
