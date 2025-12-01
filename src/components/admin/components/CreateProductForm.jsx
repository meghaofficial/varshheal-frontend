import React from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CategoryTree from "./CategoryTree";
import Variant from "./Variant";
import ProductDescription from "./ProductDescription";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import axiosPrivate from "../../../utils/axiosPrivate";

const CreateProductForm = ({ setOpenCreate, setActive, active }) => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    description: {
      paragraph: "",
      points: [],
      specs: {},
    },
    price: "",
    discountPercentage: "",
    variants: [],
    isFeatured: false,
    isActive: false,
  });
  const [selected, setSelected] = useState([]); // selected cat consists of id of category
  const [loading, setLoading] = useState(false);
  const [updateFLoading, setUpdateFLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();

    fd.append("title", form?.title);
    fd.append("brand", form?.brand);
    fd.append("category", selected?.[0]);
    fd.append("price", form?.price);
    fd.append("discountPercentage", form?.discountPercentage);
    fd.append("isFeatured", form?.isFeatured);
    fd.append("isActive", form?.isActive);
    fd.append("description", JSON.stringify(form?.description));

    // Prepare variants WITHOUT files
    const variantsToSend = form?.variants.map((v) => ({
      colorName: v.colorName,
      colorCode: v.colorCode,
      stock: v.stock,
      images: v.images.map((img) => ({
        url: null,
        public_id: "",
        position: img.position,
      })),
    }));

    fd.append("variants", JSON.stringify(variantsToSend));

    // Add all images in the EXACT order required by backend
    form?.variants.forEach((v) => {
      v.images.forEach((img) => {
        fd.append("images", img.url); // input file
      });
    });

    try {
      const res = await axiosPrivate.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toastSuccess("Product Uploaded Successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
      toastError("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, category: selected[0] }));
  }, [selected]);

  useEffect(() => {
    if (active) {
      const updatedVariants = active?.variants?.map((v, index) => ({
        ...v,
        id: `t${index + 1}`,
        title: `Variant ${index + 1}`,
      }));
      setForm({
        title: active?.title,
        brand: active?.brand,
        category: active?.category?._id,
        description: {
          paragraph: active?.description?.paragraph,
          points: active?.description?.points,
          specs: active?.description?.specs,
        },
        price: active?.price,
        discountPercentage: active?.discountPercentage,
        variants: updatedVariants,
        isFeatured: active?.isFeatured || false,
        isActive: active?.isActive || false,
      });
      setSelected([active?.category?._id]);
    }
  }, [active]);

  const handleUpdateFields = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.put(`/products/${active?._id}`, form);

      toastSuccess("Product Fields Updated Successfully!");
    } catch (err) {
      console.error("Update Product Error:", err);
      toastError("Updation failed!");
      throw err;
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 mb-3 cursor-pointer"
        onClick={() => {
          setOpenCreate(false);
          setActive(null);
        }}
      >
        <IoIosArrowBack size={15} className="" />
        <span>Back</span>
      </div>
      <div className="flex items-start gap-3">
        {/* left side category tree it is */}
        <div className="w-1/2">
          <CategoryTree
            selected={selected}
            onChange={(val) => setSelected(val)}
          />
        </div>
        {/* right side form */}
        <form
          onSubmit={!active && handleSubmit}
          className="bg-white p-6 rounded-md border border-gray-200 shadow-md max-w-3xl mx-auto space-y-4"
        >
          <h2 className="font-semibold text-gray-800">
            {active ? "Update" : "Create"} Product
          </h2>
          {/* Name + Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[12px] font-medium text-gray-700">
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={form?.title || ""}
                onChange={(e) => {
                  updateField("title", e.target.value);
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder=""
              />
            </div>

            <div>
              <label className="text-[12px] font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                value={form?.brand || ""}
                onChange={(e) => {
                  updateField("brand", e.target.value);
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder=""
              />
            </div>
          </div>

          {/* description */}
          <ProductDescription form={form} setForm={setForm} active={active} />

          {/* Toggles (while updation, we shift to upwards) */}
          {active && (
            <div className="flex items-center gap-10">
              {/* Active Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-12 h-6 rounded-full ${
                    form?.isActive ? "bg-blue-500" : "bg-gray-300"
                  } relative transition`}
                  onClick={() => updateField("isActive", !form?.isActive)}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                      form?.isActive ? "right-0.5" : "left-0.5"
                    }`}
                  ></div>
                </div>
                <span className="text-gray-700">Active</span>
              </label>

              {/* Is Featured */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form?.isFeatured}
                  onChange={(e) => updateField("isFeatured", e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Featured</span>
              </label>
            </div>
          )}

          {/* Price + Discounted % */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[12px] font-medium text-gray-700">
                Price <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={form?.price}
                onChange={(e) => {
                  updateField("price", e.target.value);
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder=""
              />
            </div>

            <div>
              <label className="text-[12px] font-medium text-gray-700">
                Discount %
              </label>
              <input
                type="text"
                value={form?.discountPercentage}
                onChange={(e) => {
                  updateField("discountPercentage", e.target.value);
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder=""
              />
            </div>
          </div>

          {/* UPDATION OF IMAGE IS NOT WORKING AND ADD THE FEATURE OF REMOVING THE IMAGE */}

          {/* Update fields button */}
          {updateFLoading ? (
            <button className="w-full py-3 bg-blue-500 text-white rounded font-medium transition">
              Loading...
            </button>
          ) : (
            <button
              className="w-full py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
              onClick={handleUpdateFields}
            >
              Update Product Fields
            </button>
          )}

          {/* variant */}
          <Variant form={form} setForm={setForm} id={active?._id} />

          {/* Toggles */}
          {!active && (
            <div className="flex items-center gap-10">
              {/* Active Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-12 h-6 rounded-full ${
                    form?.isActive ? "bg-blue-500" : "bg-gray-300"
                  } relative transition`}
                  onClick={() => updateField("isActive", !form?.isActive)}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                      form?.isActive ? "right-0.5" : "left-0.5"
                    }`}
                  ></div>
                </div>
                <span className="text-gray-700">Active</span>
              </label>

              {/* Is Featured */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form?.isFeatured}
                  onChange={(e) => updateField("isFeatured", e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Featured</span>
              </label>
            </div>
          )}

          {/* Create button on in case of create not in case of update */}
          {!active && (
            <>
              {loading ? (
                <button className="w-full py-3 bg-blue-500 text-white rounded font-medium transition">
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  Create Product
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
