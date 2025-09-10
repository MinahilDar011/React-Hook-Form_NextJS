"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductFormData } from "@/features/products/product";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
  initialValues?: ProductFormData;
}

export default function ProductForm({
  onSubmit,
  onCancel,
  initialValues,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset({
        title: "",
        description: "",
        price: 0,
        thumbnail: "",
      });
    }
  }, [initialValues, reset]);

  // const submitHandler = (data: ProductFormData) => {
  //   onSubmit(data);
  // };

  const submitHandler = (data: ProductFormData) => {
    onSubmit(data);
    reset({ title: "", description: "", price: 0, thumbnail: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3 mb-6 max-w-md mx-auto border p-4 rounded-lg shadow-sm bg-white"
    >
      <input
        className="border px-3 py-2 rounded-md"
        placeholder="Title"
        {...register("title", { required: true, minLength: 3 })}
      />
      {errors.title && (
        <span className="text-red-500 text-sm">Title is required</span>
      )}

      <input
        className="border px-3 py-2 rounded-md"
        placeholder="Description"
        {...register("description", { required: true, minLength: 5 })}
      />
      {errors.description && (
        <span className="text-red-500 text-sm">Description is required</span>
      )}

      <input
        type="number"
        min = "0"
        className="border px-3 py-2 rounded-md"
        placeholder="Price"
        {...register("price", { required: true, min: 0 })}
      />
      {errors.price && (
        <span className="text-red-500 text-sm">Enter a valid price</span>
      )}

      <input
        className="border px-3 py-2 rounded-md"
        placeholder="Image URL"
        {...register("thumbnail", { required: true })}
      />
      {errors.thumbnail && (
        <span className="text-red-500 text-sm">Image URL is required</span>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {initialValues ? "Update Product" : "Add Product"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
