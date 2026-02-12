"use client";

import { useState } from "react";
import Image from "next/image";
import { updateCartItem, removeFromCart } from "../actions/cart";

export default function CartItemRow({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  // Modifier la quantité
  async function handleQuantityChange(newQuantity) {
    if (newQuantity < 1) return;

    setLoading(true);
    setQuantity(newQuantity);
    await updateCartItem(item.id, newQuantity);
    setLoading(false);
  }

  // Supprimer l’item
  async function handleRemove() {
    setLoading(true);
    await removeFromCart(item.id);
    setLoading(false);
  }

  const subtotal = item.product.price * quantity;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      
      {/* Image produit */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.product.imageUrl ?? "/placeholder-product.jpg"}
          alt={item.product.title}
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Infos produit */}
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">
          {item.product.title}
        </h3>
        <p className="text-gray-600">
          {item.product.price.toFixed(2)} €
        </p>
      </div>

      {/* Quantité */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={loading || quantity <= 1}
          className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          -
        </button>

        <span className="w-8 text-center">
          {quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={loading}
          className="w-8 h-8 border rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Sous-total */}
      <div className="w-24 text-right font-semibold">
        {subtotal.toFixed(2)} €
      </div>

      {/* Supprimer */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="text-red-600 hover:text-red-800"
      >
        Supprimer
      </button>

    </div>
  );
}