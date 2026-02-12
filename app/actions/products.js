"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
export async function createProduct(formData) {
  // formData vient d'un <form action={createProduct}>
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock") || 0);
  const imageUrl = formData.get("imageUrl")?.toString().trim() || null;

  if (!title || !description || Number.isNaN(price)) {
    // En seance 4 : on renverra un message d'erreur plus propre à l'UI
    throw new Error("Champs invalides.");
  }
  const slug = slugify(title);
  await prisma.product.create({
    data: {
      title,
      slug,
      description,
      price,
      stock: Number.isNaN(stock) ? 0 : stock,
      isActive: true,
      imageUrl,
    },
  });
  revalidatePath("/products");
}
