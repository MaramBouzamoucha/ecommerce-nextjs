"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToCart } from "../actions/cart";

export default function AddToCartButton({ productId }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAddToCart() {
    // Vérifier si l'utilisateur est connecté
    if (status === "unauthenticated") {
      router.push(
        `/auth/login?callbackUrl=${window.location.pathname}`
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Appel de la Server Action
      const result = await addToCart(productId, 1);

      if (result?.success) {
        setMessage("Ajouté au panier ✅");

        // Effacer le message après 2 secondes
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage(result?.error || "Erreur");
      }
    } catch (error) {
      setMessage("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading || status === "loading"}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                   hover:bg-blue-500 transition disabled:opacity-50"
      >
        {loading ? "Ajout en cours..." : "Ajouter au panier"}
      </button>

      {message && (
        <p className="text-green-600 text-center mt-2">
          {message}
        </p>
      )}
    </div>
  );
}