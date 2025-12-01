import React, { useState } from "react";
import { useEffect } from "react";

const ProductDescription = ({ form, setForm, active }) => {
  const [activeTab, setActiveTab] = useState("paragraph");

  const [paragraph, setParagraph] = useState("");

  const [points, setPoints] = useState([""]);

  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const addPoint = (e) => {
    e.preventDefault();
    setPoints([...points, ""]);
    if (form?.description.points > 0) {
      setForm((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          points: [...prev.description.points, ""],
        },
      }));
    }
    else {
      setForm((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          points: [""],
        },
      }));
    }
  };
  const updatePoint = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
    setForm((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        points: updated,
      },
    }));
  };
  const removePoint = (idx) => {
    setPoints(points.filter((_, i) => i !== idx));
    setForm((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        points: points.filter((_, i) => i !== idx),
      },
    }));
  };

  const convertSpecsToObject = (specsArray) => {
    const obj = {};
    specsArray.forEach((item) => {
      if (item.key?.trim()) {
        obj[item.key] = item.value || "";
      }
    });
    return obj;
  };

  const addSpec = (e) => {
    e.preventDefault();
    setSpecs([...specs, { key: "", value: "" }]);
  };
  const updateSpecKey = (i, val) => {
    const updated = [...specs];
    updated[i].key = val;
    setSpecs(updated);
  };
  const updateSpecValue = (i, val) => {
    const updated = [...specs];
    updated[i].value = val;
    setSpecs(updated);
  };
  const removeSpec = (i) => {
    setSpecs(specs.filter((_, idx) => idx !== i));
  };

  useEffect(() => {
    const obj = convertSpecsToObject(specs);
    setForm((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        specs: obj,
      },
    }));
  }, [specs]);

  useEffect(() => {
    if (active) {
      const specsArray = Object.entries(active?.description?.specs).map(
        ([key, value]) => ({
          key,
          value,
        })
      );
      setSpecs(specsArray);
      setParagraph(active?.description?.paragraph);
      setPoints(active?.description?.points);
    }
  }, [active]);

  return (
    <div className="bg-white border border-gray-200 rounded-md space-y-2">
      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-200 p-2">
        {["paragraph", "points", "specs"].map((tab) => (
          <button
            key={tab}
            onClick={(e) => {
              e.preventDefault();
              switchTab(tab);
            }}
            className={`px-3 py-1.5 rounded cursor-pointer text-[12px] font-medium capitalize transition 
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-2">
        {activeTab === "paragraph" && (
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Description (Paragraph)
            </label>
            <textarea
              rows={4}
              value={paragraph}
              onChange={(e) => {
                setParagraph(e.target.value);
                setForm((prev) => ({
                  ...prev,
                  description: {
                    ...prev.description,
                    paragraph: e.target.value,
                  },
                }));
              }}
              className="w-full border border-gray-200 rounded p-2 text-[12px] focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write a detailed description..."
            />
          </div>
        )}

        {activeTab === "points" && (
          <div>
            <label className="block text-[12px] font-medium mb-2">
              Description Points
            </label>
            <div className="space-y-3">
              {points?.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updatePoint(idx, e.target.value)}
                    className="flex-1 border border-gray-200 rounded p-2 text-[12px] focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder={`Point ${idx + 1}`}
                  />
                  <button
                    className="text-red-500 cursor-pointer text-[12px] hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      removePoint(idx);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={addPoint}
                className="text-blue-600 cursor-pointer mb-2 text-[12px] font-medium hover:underline"
              >
                + Add Point
              </button>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            <label className="block text-[12px] font-medium mb-2">
              Specifications (Key - Value)
            </label>

            <div className="space-y-3">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => updateSpecKey(idx, e.target.value)}
                    className="w-1/3 border border-gray-200 rounded p-2 text-[12px] focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Key (e.g., Material)"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpecValue(idx, e.target.value)}
                    className="flex-1 border border-gray-200 rounded p-2 text-[12px] focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Value (e.g., Stainless Steel)"
                  />

                  <button
                    className="text-red-500 cursor-pointer text-[12px] hover:underline"
                    onClick={() => removeSpec(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={addSpec}
                className="text-blue-600 mb-2 cursor-pointer text-[12px] font-medium hover:underline"
              >
                + Add Spec
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
