import React from "react";
import axiosPrivate from "../../../utils/axiosPrivate";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useState } from "react";

const ProductTable = ({ products, setActive, setOpenCreate, fetchProducts }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      const res = await axiosPrivate.delete(`/products/${productId}`);
      await fetchProducts();
      toastSuccess("Product Deleted Successfully!");
    } catch (err) {
      console.error("Delete Product Error:", err);
      toastError("Deletion failed!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto text-[12px]">
      {products?.length > 0 ? (
        <table className="min-w-full border border-gray-200 overflow-hidden">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Thumbnail
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Title
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Brand
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Discount (%)
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Final Price
              </th>
              {/* sum of all variants.stock */}
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Total Stock
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Featured
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Edit
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Remove
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products?.map((prod, idx) => (
              <tr
                key={prod?._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Thumbnail */}
                <td className="px-6 py-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 ">
                    <img
                      src={prod?.variants?.[0]?.images?.[0]?.url}
                      alt={prod?.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </td>

                {/* Title */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {prod?.title}
                </td>

                {/* Brand */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {prod?.brand}
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {prod?.category?.name}
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  Rs. {prod?.price}
                </td>

                {/* discount */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {prod?.discountPercentage}%
                </td>

                {/* final price */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  Rs. {prod?.discountedPrice}
                </td>

                {/* total stock */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {prod?.totalStock}
                </td>

                {/* Active */}
                <td className="px-6 py-4">
                  <span
                    className={`${
                      prod?.isActive ? "text-green-600" : "text-red-500"
                    } font-medium`}
                  >
                    {prod?.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Featured */}
                <td className="px-6 py-4">
                  <span
                    className={`${
                      prod?.isFeatured ? "text-blue-600" : "text-gray-500"
                    } font-medium`}
                  >
                    {prod?.isFeatured ? "Featured" : "No"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 font-medium hover:underline"
                    onClick={() => {
                      setActive(prod);
                      setOpenCreate(true);
                    }}
                  >
                    Edit
                  </button>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    className="text-red-600 font-medium cursor-pointer"
                    onClick={() => {
                      handleDeleteProduct(prod?._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <span>No Product Found!</span>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
