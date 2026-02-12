import { createProduct } from "../../../actions/products";
import Image from "next/image";
export default function NewProductActionPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Creer un produit (Server Action)
      </h1>

      <form action={createProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black">Titre</label>
          <input
            name="title"
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Prix</label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="w-full border rounded p-2 text-black"
              required
            />
          </div>
         <div>
  <label className="block text-sm font-medium text-black">Image (URL)</label>
  <input
    name="imageUrl"
    type="text"
    className="w-full border rounded p-2 text-black"
    placeholder="https://example.com/image.jpg"
  />
</div>


          <div>
            <label className="block text-sm font-medium text-black">Stock</label>
            <input
              name="stock"
              type="number"
              className="w-full border rounded p-2 text-black"
              defaultValue="0"
            />
          </div>
        </div>

        <button className="px-4 py-2 rounded bg-black text-white">
          Creer
        </button>

        <p className="text-sm text-gray-600">
          Apres creation, allez sur <code>/products</code> pour voir la revalidation.
        </p>
      </form>
    </div>
  );
}
