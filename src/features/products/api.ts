import { Product } from "./product";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(BASE_URL);
    // if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function postProduct(newProduct: {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}): Promise<Product> {
  const res = await fetch(BASE_URL + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

export async function putProduct(
  id: number,
  updatedData: { title?: string; description?: string; price?: number }
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function removeProduct(id: number): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
