import React, { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../utils/toast";
import axiosPrivate from "../utils/axiosPrivate";

export default function ToggleButton({ status, productId, show }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState(false);

  const handleUpdateProduct = async () => {
    setLoading(true);

    try {
      const res = await axiosPrivate.patch(
        `/update-product/${productId}`,
        {
          status: ans ? "published" : "draft",
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toastSuccess("Status updated successfully!");
    } catch (err) {
      console.error(err);
      toastError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "draft") setEnabled(false);
    else setEnabled(true);
  }, [status]);

  useEffect(() => {
    if (enabled && status === "draft") {
      const a = confirm("Are you sure you want to publish this product?");
      setAns(a);
    }
  }, [enabled]);

  useEffect(() => {
    if (ans) handleUpdateProduct();
  }, [ans]);

  return (
    <div className="flex items-center justify-center">
      <div className="min-w-[100px]">
        {show && (
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer shadow-inner
            ${enabled ? "bg-green-500" : "bg-gray-300"}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300
              ${enabled ? "translate-x-4.5" : "-translate-x-0.5"}`}
            ></div>
          </button>
        )}

        <p className="pl-2 mt-2 font-medium text-[12px]">
          Status:{" "}
          <span className="font-bold">{enabled ? "Published" : "Draft"}</span>
        </p>
      </div>
    </div>
  );
}
