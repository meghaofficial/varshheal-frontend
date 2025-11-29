import React, { useState } from "react";
import CategoryTree from "./CategoryTree";
import { IoIosArrowBack } from "react-icons/io";
import axiosPrivate from "../../../utils/axiosPrivate";
import { useEffect } from "react";
import ImageUploader from "../ImageUploader";
import { toastError, toastSuccess } from "../../../utils/toast";

const CreateCategoryForm = ({ setOpenCreate, setActive, active }) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    parent: "",
    description: "",
    isActive: true,
    isFeatured: false,
    banner: null,
    icon: null,
  });
  const [selected, setSelected] = useState([]); // selected cat consists of id of category
  const [loading, setLoading] = useState(false);
  const [updateFLoading, setUpdateFLoading] = useState(false);
  const [updateBannerLoading, setUpdateBannerLoading] = useState(false);
  const [updateIconLoading, setUpdateIconLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const autoSlugify = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  // Creating category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);

      formData.append("isActive", form.isActive);
      formData.append("isFeatured", form.isFeatured);
      formData.append("description", form.description);
      if (selected[0]) {
        formData.append("parent", selected[0]);
      }
      if (form.banner) formData.append("banner", form.banner);
      if (form.icon) formData.append("icon", form.icon);

      const res = await axiosPrivate.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toastSuccess("Category Uploaded Successfully!");
    } catch (err) {
      console.error("Create Category Error:", err);
      toastError("Upload failed!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Updating fields
  const updateCategoryFields = async (e) => {
    e.preventDefault();
    setUpdateFLoading(true);
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        parent: selected[0] || null,
        isActive: form.isActive,
        isFeatured: form.isFeatured,
      };
      const res = await axiosPrivate.patch(
        `/categories/${active?._id}`,
        payload
      );
      toastSuccess("Category Fields Updated Successfully!");
    } catch (err) {
      console.error("Update Category Fields Error:", err);
      toastError("Updation failed!");
      throw err;
    } finally {
      setUpdateFLoading(false);
    }
  };

  // Update banner
  const updateCategoryBanner = async (e) => {
    e.preventDefault();
    setUpdateBannerLoading(true);
    try {
      const formData = new FormData();
      formData.append("banner", form.banner);

      const res = await axiosPrivate.put(
        `/categories/${active?._id}/banner`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toastSuccess("Category Banner Updated Successfully!");
    } catch (err) {
      console.error("Update Banner Error:", err);
      toastError("Updation failed!");
      throw err;
    } finally {
      setUpdateBannerLoading(false);
    }
  };

  // Update icon
  const updateCategoryIcon = async (e) => {
    e.preventDefault();
    setUpdateIconLoading(true);
    try {
      const formData = new FormData();
      formData.append("icon", form.icon);

      const res = await axiosPrivate.put(
        `/categories/${active?._id}/icon`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toastSuccess("Category Icon Updated Successfully!");
    } catch (err) {
      console.error("Update Icon Error:", err);
      toastError("Updation failed!");
      throw err;
    } finally {
      setUpdateIconLoading(false);
    }
  };

  useEffect(() => {
    if (active) {
      setForm({
        name: active?.name,
        slug: active?.slug,
        parent: active?.parent,
        description: active?.description,
        isActive: active?.isActive,
        isFeatured: active?.isFeatured,
        banner: active?.banner?.url,
        icon: active?.icon?.url,
      });
      const parentId =
        active?.parent?._id || // if populated
        active?.parent || // if plain ID
        null;
      setSelected(parentId ? [parentId] : []);
    }
  }, [active]);

  return (
    <div className="">
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
          className="bg-white p-6 rounded-md border border-gray-200 shadow-md max-w-3xl mx-auto space-y-6"
        >
          <h2 className="font-semibold text-gray-800">
            {active ? "Update" : "Create"} Category
          </h2>

          {/* Name + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => {
                  updateField("name", e.target.value);
                  updateField("slug", autoSlugify(e.target.value));
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="e.g. Smart Locks"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="smart-locks"
              />
            </div>
          </div>

          {/* Banner + Icon Upload */}
          {!active && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Banner
                </label>
                <ImageUploader
                  img={form.banner}
                  onImageSelect={(file) =>
                    setForm((prev) => ({ ...prev, banner: file }))
                  }
                  id="banner"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Icon
                </label>
                <ImageUploader
                  img={form.icon}
                  onImageSelect={(file) =>
                    setForm((prev) => ({ ...prev, icon: file }))
                  }
                  id="icon"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded h-24 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Short description..."
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-10">
            {/* Active Toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`w-12 h-6 rounded-full ${
                  form.isActive ? "bg-blue-500" : "bg-gray-300"
                } relative transition`}
                onClick={() => updateField("isActive", !form.isActive)}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    form.isActive ? "right-0.5" : "left-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-gray-700">Active</span>
            </label>

            {/* Is Featured */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateField("isFeatured", e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-gray-700">Featured</span>
            </label>
          </div>

          {active ? (
            <>
              {updateFLoading ? (
                <button className="w-full py-3 bg-blue-500 text-white rounded font-medium transition">
                  Loading...
                </button>
              ) : (
                <button
                  className="w-full py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                  onClick={updateCategoryFields}
                >
                  Update Fields Category
                </button>
              )}
            </>
          ) : (
            <>
              {/* Submit */}
              {loading ? (
                <button className="w-full py-3 bg-blue-500 text-white rounded font-medium transition">
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  Create Category
                </button>
              )}
            </>
          )}

          {/* for updating banner */}
          {active && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Banner
                </label>
                <ImageUploader
                  img={form.banner}
                  onImageSelect={(file) =>
                    setForm((prev) => ({ ...prev, banner: file }))
                  }
                  id="banner"
                />
                <div className="mb-4"></div>
                {updateBannerLoading ? (
                  <button className="w-full py-3 bg-blue-500 text-white rounded font-medium transition">
                    Loading...
                  </button>
                ) : (
                  <button
                    className="w-full py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                    onClick={updateCategoryBanner}
                  >
                    Update Banner
                  </button>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Icon
                </label>
                <ImageUploader
                  img={form.icon}
                  onImageSelect={(file) =>
                    setForm((prev) => ({ ...prev, icon: file }))
                  }
                  id="icon"
                />
                <div className="mb-4"></div>
                {updateIconLoading ? (
                  <button className="w-full py-3 bg-blue-500 text-white rounded font-medium transition">
                    Loading...
                  </button>
                ) : (
                  <button
                    className="w-full py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                    onClick={updateCategoryIcon}
                  >
                    Update Icon
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
