"use client";

import Image from "next/image";

import { useState } from "react";
import ProductForm from "@/features/products/components/ProductForm";
import { ProductFormData } from "@/features/products/product";

export default function ProductsList() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // const handleAddProduct = (data: ProductFormData) => {
  //   setProducts((prev) => [...prev, data]);
  // };

  // const handleDelete = (index: number) => {
  //   setProducts((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleEditSubmit = (data: ProductFormData) => {
  //   if (editingIndex !== null) {
  //     setProducts((prev) =>
  //       prev.map((p, i) => (i === editingIndex ? data : p))
  //     );
  //     setEditingIndex(null);
  //   }
  // };

  const handleAddProduct = (data: ProductFormData) => {
    const newProducts = [...products];
    newProducts.push(data);
    setProducts(newProducts);
  };

  const handleDelete = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleEditSubmit = (data: ProductFormData) => {
    if (editingIndex !== null) {
      const newProducts = [...products];
      newProducts[editingIndex] = data;
      setProducts(newProducts);
      setEditingIndex(null);
    }
  };

  return (
    <div className="p-4">
      {editingIndex !== null ? (
        <ProductForm
          initialValues={products[editingIndex]}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      ) : (
        <ProductForm onSubmit={handleAddProduct} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 shadow-lg flex flex-col items-center bg-white hover:shadow-xl transition"
          >
            <Image
              src={
                product.thumbnail && product.thumbnail.startsWith("http")
                  ? product.thumbnail
                  : "/placeholder.png"
              }
              alt={product.title}
              width={160}
              height={160}
              className="w-40 h-40 object-cover mb-4 rounded-md"
            />

            <h3 className="font-bold text-lg text-center mb-1">
              {product.title}
            </h3>
            <p className="text-gray-500 text-sm mb-2 text-center line-clamp-2">
              {product.description}
            </p>
            <p className="text-blue-600 font-semibold mb-3">${product.price}</p>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                onClick={() => setEditingIndex(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
