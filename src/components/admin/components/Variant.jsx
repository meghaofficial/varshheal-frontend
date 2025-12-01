import React, { useState, useRef } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import ImageUploader from "../ImageUploader";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import axiosPrivate from "../../../utils/axiosPrivate";

/**
 * Chrome-like Tabs component
 *
 * Props: optional initialTabs array.
 *
 * Each tab object: { id, title, url, favicon }
 */
const Variant = ({ initialTabs, form, setForm, id }) => {
  const creationDefault = [
    {
      id: "t1",
      title: "Variant 1",
      colorName: "",
      colorCode: "",
      images: [{ url: null, public_id: "", position: 0 }],
      stock: 0,
    },
  ];
  const [updateFLoading, setUpdateFLoading] = useState(false);
  const [updateImgLoading, setUpdateImgLoading] = useState(false);

  // INIT tabs based on form.variants for update mode
  const [tabs, setTabs] = useState(
    form?.variants?.length > 0 ? form.variants : creationDefault
  );

  // set active tab initially
  const [activeTab, setActiveTab] = useState(
    (form?.variants?.length > 0 ? form.variants : creationDefault)[0]
  );

  const dragRef = useRef(null);
  const containerRef = useRef(null);

  const addTab = (e) => {
    e.preventDefault();
    const newTab = {
      id: `t${tabs.length + 1}`,
      title: `Variant ${tabs.length + 1}`,
      colorName: "",
      colorCode: "",
      images: [{ url: null, public_id: "", position: 0 }],
      stock: 0,
    };
    setTabs((t) => [...t, newTab]);
    setActiveTab(newTab);
    // scroll into view
    setTimeout(() => {
      const el = document.getElementById(`tab-${newTab.id}`);
      el?.scrollIntoView({ behavior: "smooth", inline: "end" });
    }, 50);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();

    setTabs((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const next = prev.filter((p) => p.id !== id);

      // If the tab being closed is the active tab
      if (activeTab && activeTab.id === id) {
        const newActive =
          next[idx] || // next tab on the right
          next[idx - 1] || // or previous tab
          null; // or no tabs

        setActiveTab(newActive); // NEW: set full tab object
      }

      return next;
    });
  };

  // Drag & drop reorder
  const onDragStart = (e, index) => {
    dragRef.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = dragRef.current;
    if (dragIndex === undefined || dragIndex === dropIndex) return;
    setTabs((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(dragIndex, 1);
      copy.splice(dropIndex, 0, moved);
      return copy;
    });
    dragRef.current = null;
  };

  const updateActiveTab = (updates) => {
    setActiveTab((prev) => {
      const newTab = { ...prev, ...updates };

      setTabs((prevTabs) =>
        prevTabs.map((t) => (t.id === newTab.id ? newTab : t))
      );

      setForm((prev) => ({
        ...prev,
        variants: prev?.variants?.map((t) => (t.id === newTab.id ? newTab : t)),
      }));

      return newTab;
    });
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, variants: tabs }));
  }, [tabs]);

  const initializedRef = useRef(false);

  useEffect(() => {
    // Only run on initialization when editing an existing product
    if (!initializedRef.current && form?.variants?.length > 0) {
      setTabs(form.variants);
      setActiveTab(form.variants[0]);
      initializedRef.current = true; // prevent future re-runs
    }
  }, [form.variants]);

  const handleUpdateVariantFields = async (e) => {
    e.preventDefault();
    setUpdateFLoading(true);
    try {
      const res = await axiosPrivate.put(`/products/${id}/variants`, {
        variants: form?.variants,
      });

      toastSuccess("Variant Fields Updated Successfully!");
    } catch (err) {
      console.error("Update Variant Error:", err);
      toastError("Updation failed!");
      throw err;
    } finally {
      setUpdateFLoading(false);
    }
  };

  const buildVariantImageFormData = (variants) => {
    const formData = new FormData();

    // Append JSON first
    formData.append("variants", JSON.stringify(variants));

    // Append ONLY files (in sequence)
    variants.forEach((variant) => {
      variant.images.forEach((img) => {
        if (img.file instanceof File) {
          formData.append("images", img.file);
        }
      });
    });

    return formData;
  };

  const handleUpdateVariantImages = async (e) => {
    e.preventDefault();
    setUpdateImgLoading(true);
    try {
      const formData = buildVariantImageFormData(form?.variants);

      const response = await axiosPrivate.put(
        `/products/${id}/variant-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toastSuccess("Category Icon Updated Successfully!");
    } catch (err) {
      console.error("Update Variant Images Error:", err);
      toastError("Updation failed!");
      throw err;
    } finally {
      setUpdateImgLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 px-1.5 pt-2 bg-gray-100 rounded-t-md">
        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-auto no-scrollbar px-1"
          style={{ scrollbarWidth: "none" }}
          aria-label="Tabs"
        >
          {tabs?.map((tab, idx) => {
            const isActive = tab?.id === activeTab?.id;
            return (
              <div
                id={`tab-${tab.id}`}
                key={tab.id}
                draggable
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, idx)}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-3 px-3 min-w-[160px] max-w-[280px] h-8 select-none cursor-pointer
                  ${
                    isActive
                      ? "bg-white shadow-md rounded-t-lg -mb-2"
                      : "bg-transparent rounded-md"
                  } transition`}
              >
                {/* Title */}
                <span
                  className={`text-[12px] text-gray-700 truncate ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {tab.title}
                </span>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Close Button */}
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  aria-label={`Close ${tab.title}`}
                  className={`p-1 rounded hover:bg-gray-100 transition cursor-pointer ${
                    isActive ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  <FiX size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={addTab}
            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-50 transition  cursor-pointer"
            aria-label="New tab"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* Content preview */}
      <div className="border-t-0 rounded-b-md p-4 bg-gray-100/30">
        {tabs?.length === 0 ? (
          <div className="text-gray-500 h-[200px]">No tabs</div>
        ) : (
          <div>
            {/* Color name + Color code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[12px] font-medium text-gray-700">
                  Color Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={activeTab?.colorName}
                  onChange={(e) => {
                    updateActiveTab({ colorName: e.target.value });
                  }}
                  className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder=""
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-gray-700">
                  Color Code
                </label>
                <input
                  type="text"
                  value={activeTab?.colorCode}
                  onChange={(e) => {
                    updateActiveTab({ colorCode: e.target.value });
                  }}
                  className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder=""
                />
              </div>
            </div>

            {/* stock */}
            <div className="mt-4">
              <label className="text-[12px] font-medium text-gray-700">
                Stock <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={activeTab?.stock}
                onChange={(e) => {
                  updateActiveTab({ stock: e.target.value });
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder=""
              />
            </div>

            {/* Update fields button */}
            {form?.title && (
              <>
                {updateFLoading ? (
                  <button className="w-full py-2 mt-2 bg-blue-500 text-white rounded font-medium transition">
                    Loading...
                  </button>
                ) : (
                  <button
                    className="w-full py-2 bg-blue-600 mt-2 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                    onClick={handleUpdateVariantFields}
                  >
                    Update Variant Fields
                  </button>
                )}
              </>
            )}
            {/* images */}
            <div className="mt-3">
              <label className="text-[12px] font-medium text-gray-700">
                Add Image
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {activeTab?.images?.map((d, index) => (
                    <div className="w-25 mt-2" key={index}>
                      <ImageUploader
                        img={d?.url}
                        onImageSelect={(file) => {
                          updateActiveTab({
                            images: activeTab.images.map((img, i) =>
                              i === index ? { ...img, url: file } : img
                            ),
                          });
                        }}
                        type="sub"
                        id={`img-${index}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateActiveTab({
                      images: [
                        ...activeTab.images,
                        {
                          url: null,
                          public_id: "",
                          position: activeTab.images.length,
                        },
                      ],
                    });
                  }}
                  className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-50 transition cursor-pointer"
                  aria-label="New tab"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Update images button */}
            {form?.title && (
              <>
                {updateImgLoading ? (
                  <button className="w-full py-2 mt-2 bg-blue-500 text-white rounded font-medium transition">
                    Loading...
                  </button>
                ) : (
                  <button
                    className="w-full py-2 mt-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition cursor-pointer"
                    onClick={handleUpdateVariantImages}
                  >
                    Update Variant Images
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Variant;
