import { useEffect, useState } from "react";
import TagsInput from "./TagsInput";
import ImageUploader from "./ImageUploader";

const ProductSpecification = ({ formData, setFormData, selectedFormat }) => {
  const [sizes, setSizes] = useState([
    { size: "XS", isSelected: false },
    { size: "S", isSelected: false },
    { size: "M", isSelected: false },
    { size: "L", isSelected: false },
    { size: "XL", isSelected: false },
    { size: "XXL", isSelected: false },
  ]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);

  const isValidColor = (value) => {
    const s = new Option().style;
    s.color = value;
    return s.color !== "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && color.trim()) {
      e.preventDefault();
      const inputColor = color.trim().toLowerCase();
      if (isValidColor(inputColor) && !colors.includes(inputColor)) {
        setColors([...colors, inputColor]);
      }
      setColor("");
    }
  };

  const removeColor = (c) => {
    setColors(colors.filter((clr) => clr !== c));
  };

  useEffect(() => {
    setSizes([
      { size: "XS", isSelected: false },
      { size: "S", isSelected: false },
      { size: "M", isSelected: false },
      { size: "L", isSelected: false },
      { size: "XL", isSelected: false },
      { size: "XXL", isSelected: false },
    ]);
    setColor("");
    setColors([]);
    setFormData((prev) => ({
      ...prev,
      material: "",
      target_audience: "",
      fit_type: "",
      pattern: "",
      occasion: "",
      size: [],
    }));
  }, [selectedFormat]);

  useEffect(() => {
    const selectedSizes = sizes.filter((s) => s.isSelected).map((s) => s.size);

    setFormData((prev) => ({
      ...prev,
      size: selectedSizes,
    }));
  }, [sizes]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, color: colors }));
  }, [colors]);

  return (
    <div>
      {selectedFormat === "clothing" && (
        <>
          {/* size */}
          <div className="flex flex-col gap-2">
            <label>Select Size</label>
            <div className="flex items-center gap-2">
              {sizes.map((s, index) => (
                <div
                  key={s.size}
                  className={`w-10 h-10 cursor-pointer border flex items-center justify-center rounded text-[10px] ${
                    s.isSelected
                      ? "border-purple-700 text-black"
                      : "border-gray-400 text-gray-500"
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, isSelected: !item.isSelected }
                          : item
                      )
                    )
                  }
                >
                  <p>{s.size}</p>
                </div>
              ))}
            </div>
          </div>
          {/* size chart */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Size Chart</label>
            <ImageUploader
              img={formData?.size_chart}
              type="sub"
              id="size_chart"
              onImageSelect={(file) =>
                setFormData((prev) => ({ ...prev, size_chart: file }))
              }
            />
          </div>
          {/* color */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Color</label>

            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type color (e.g. red, #3498db) and press Enter"
              className="outline-none border border-gray-400 rounded p-2"
            />

            {/* Show colors */}
            <div className="flex flex-wrap gap-2 mt-1">
              {colors.length > 0 ? (
                colors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 border rounded-full px-3 py-1 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      color: c === "white" ? "black" : "#fff",
                    }}
                    onClick={() => removeColor(c)}
                    title="Click to remove"
                  >
                    <span className="text-[10px] font-medium">
                      {c.toUpperCase()}
                    </span>
                    <span className="text-[10px]">✕</span>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-gray-500">No colors added yet</p>
              )}
            </div>
          </div>
          {/* material */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Material</label>
            <input
              type="text"
              placeholder="Material"
              className="outline-none border border-gray-400 rounded p-2"
              value={formData?.material}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  material: e.target.value,
                }))
              }
            />
          </div>
          {/* gender */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Target Audience</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.target_audience === "male"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, target_audience: "male" }))
                }
              >
                <p>Male</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.target_audience === "female"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    target_audience: "female",
                  }))
                }
              >
                <p>Female</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.target_audience === "unisex"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    target_audience: "unisex",
                  }))
                }
              >
                <p>Unisex</p>
              </div>
            </div>
          </div>
          {/* fit type */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Fit Type</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.fit_type === "slim"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, fit_type: "slim" }))
                }
              >
                <p>Slim Fit</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.fit_type === "regular"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, fit_type: "regular" }))
                }
              >
                <p>Regular Fit</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.fit_type === "oversized"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, fit_type: "oversized" }))
                }
              >
                <p>Oversized</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.fit_type === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, fit_type: "" }))
                }
              >
                <p>None</p>
              </div>
            </div>
          </div>
          {/* pattern */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Pattern</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.pattern === "solid"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, pattern: "solid" }))
                }
              >
                <p>Solid</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.pattern === "stripped"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, pattern: "stripped" }))
                }
              >
                <p>Striped</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.pattern === "printed"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, pattern: "printed" }))
                }
              >
                <p>Printed</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.pattern === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, pattern: "" }))
                }
              >
                <p>None</p>
              </div>
            </div>
          </div>
          {/* occasion */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Occasion</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.occasion === "casual"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, occasion: "casual" }))
                }
              >
                <p>Casual</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.occasion === "formal"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, occasion: "formal" }))
                }
              >
                <p>Formal</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.occasion === "party"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, occasion: "party" }))
                }
              >
                <p>Party</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.occasion === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, occasion: "" }))
                }
              >
                <p>None</p>
              </div>
            </div>
          </div>
          {/* care instructions */}
          <div className="flex flex-col mt-4 gap-2">
            <label>Care Instructions</label>
            <textarea
              type="text"
              placeholder="Care Instructions"
              className="outline-none border border-gray-400 rounded p-2 resize-none"
              rows={4}
              value={formData.care_instruction}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  care_instruction: e.target.value,
                }))
              }
            />
          </div>
        </>
      )}
      {selectedFormat === "bags" && (
        <>
          {/* material */}
          <div className="flex flex-col gap-2">
            <label>Material</label>
            <input
              type="text"
              placeholder="Material"
              className="outline-none border border-gray-400 rounded p-2"
              value={formData?.material}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  material: e.target.value,
                }))
              }
            />
          </div>
          {/* color */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Color Options</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type color (e.g. red, #3498db) and press Enter"
              className="outline-none border border-gray-400 rounded p-2"
            />

            {/* Show colors */}
            <div className="flex flex-wrap gap-2 mt-1">
              {colors.length > 0 ? (
                colors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 border rounded-full px-3 py-1 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      color: c === "white" ? "black" : "#fff",
                    }}
                    onClick={() => removeColor(c)}
                    title="Click to remove"
                  >
                    <span className="text-[11px] font-medium">
                      {c.toUpperCase()}
                    </span>
                    <span className="text-[11px]">✕</span>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-gray-500">No colors added yet</p>
              )}
            </div>
          </div>
          {/* dimensions */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Dimensions (LxWxH)</label>
            <div className="flex items-center gap-2 text-[11px]">
              <input
                type="text"
                className="outline-none border border-gray-400 rounded p-2 w-10 text-center"
                placeholder="L"
                value={formData.dimensions.length}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      length: e.target.value,
                    },
                  }))
                }
              />
              x
              <input
                type="text"
                className="outline-none border border-gray-400 rounded p-2 w-10 text-center"
                placeholder="W"
                value={formData.dimensions.breadth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      breadth: e.target.value,
                    },
                  }))
                }
              />
              x
              <input
                type="text"
                className="outline-none border border-gray-400 rounded p-2 w-10 text-center"
                placeholder="H"
                value={formData.dimensions.height}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      height: e.target.value,
                    },
                  }))
                }
              />
              cm
            </div>
          </div>
          {/* closure type */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Closure Type</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.closure_type === "zipper"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, closure_type: "zipper" }))
                }
              >
                <p>Zipper</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.closure_type === "magnetic"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, closure_type: "magnetic" }))
                }
              >
                <p>Magnetic</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.closure_type === "button"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, closure_type: "button" }))
                }
              >
                <p>Button</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.closure_type === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, closure_type: "" }))
                }
              >
                <p>None</p>
              </div>
            </div>
          </div>
          {/* capacity */}
          <div className="flex flex-col mt-4 gap-2">
            <label>Capacity (L)</label>
            <input
              type="text"
              placeholder="Capacity"
              className="outline-none border border-gray-400 rounded p-2"
              value={formData.capacity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, capacity: e.target.value }))
              }
            />
          </div>
          {/* compartment details */}
          <div className="flex flex-col mt-4 gap-2">
            <label>Compartment Details</label>
            <input
              type="text"
              placeholder="Compartment Details, eg - 1 Main + 2 Pockets"
              className="outline-none border border-gray-400 rounded p-2"
              value={formData.compartment_details}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  compartment_details: e.target.value,
                }))
              }
            />
          </div>
          {/* gender */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Target Audience</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.target_audience === "male"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, target_audience: "male" }))
                }
              >
                <p>Male</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.target_audience === "female"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    target_audience: "female",
                  }))
                }
              >
                <p>Female</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.target_audience === "unisex"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    target_audience: "unisex",
                  }))
                }
              >
                <p>Unisex</p>
              </div>
            </div>
          </div>
          {/* strap type */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Strap Type</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.strap_type === "adjustable"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, strap_type: "adjustable" }))
                }
              >
                <p>Adjustable</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.strap_type === "detachable"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, strap_type: "detachable" }))
                }
              >
                <p>Detachable</p>
              </div>
              <div
                className={`text-[11px] border p-2 w-fit rounded cursor-pointer ${
                  formData.strap_type === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, strap_type: "" }))
                }
              >
                <p>None</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSpecification;
