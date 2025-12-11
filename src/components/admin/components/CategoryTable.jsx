import { useState } from "react";
import axiosPrivate from "../../../utils/axiosPrivate";
import { toastError, toastSuccess } from "../../../utils/toast";

const CategoryTable = ({ categories, setActive, setOpenCreate }) => {

  const [loading, setLoading] = useState(false);

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setLoading(true);
    try {
      const res = await axiosPrivate.delete(`/categories/${id}`);
      toastSuccess("Category Deleted Successfully!");
    } catch (err) {
      console.error("Delete Category Error:", err);
      toastError(err.response.data.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto ">
      {categories?.length > 0 ? (
        <table className="min-w-full border border-gray-200 overflow-hidden">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Icon
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Description
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Active
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Featured
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Action
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Remove
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {categories?.map((cat, idx) => (
              <tr
                key={cat?._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Icon */}
                <td className="px-6 py-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 ">
                    <img
                      src={cat?.icon?.url}
                      alt={cat?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </td>

                {/* Name */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {cat?.name}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {cat?.description}
                </td>

                {/* Active */}
                <td className="px-6 py-4">
                  <span
                    className={`${
                      cat?.isActive ? "text-green-600" : "text-red-500"
                    } font-medium`}
                  >
                    {cat?.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Featured */}
                <td className="px-6 py-4">
                  <span
                    className={`${
                      cat?.isFeatured ? "text-blue-600" : "text-gray-500"
                    } font-medium`}
                  >
                    {cat?.isFeatured ? "Featured" : "No"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 font-medium hover:underline"
                    onClick={() => {
                      setActive(cat);
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
                      deleteCategory(cat?._id)
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
          <span>No Category Found!</span>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
