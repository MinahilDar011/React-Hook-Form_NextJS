"use client";

import Image from "next/image";
import { Product } from "../product";

export default function ProductCard({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="border rounded-2xl p-4 shadow-lg flex flex-col items-center bg-gradient-to-b from-white to-gray-50 hover:shadow-xl transition">
      <Image
        src={product.thumbnail || product.images?.[0] || "/placeholder.png"}
        alt={product.title}
        width={160}
        height={160}
        className="w-40 h-40 object-cover mb-4 rounded-md"
      />
      <h3 className="font-bold text-lg text-center mb-1">{product.title}</h3>
      <p className="text-gray-500 text-sm mb-2 text-center line-clamp-2">
        {product.description}
      </p>
      <p className="text-blue-600 font-semibold mb-3">${product.price}</p>

      <div className="flex gap-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          onClick={() => onUpdate(product.id)}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
