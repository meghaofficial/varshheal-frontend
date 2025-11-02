import { useEffect, useState } from "react";
import TagsInput from "./TagsInput";

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
  const [materialTags, setMaterialTags] = useState([]);
  const [selectedGender, setSelectedGender] = useState("female");
  const [selectedFit, setSelectedFit] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedClosure, setSelectedClosure] = useState("");
  const [selectedStrap, setSelectedStrap] = useState("");

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
    setMaterialTags([]);
    setSelectedGender("female");
    setSelectedFit("");
    setSelectedPattern("");
    setSelectedOccasion("");
  }, [selectedFormat]);

  useEffect(() => {
    sizes.forEach(s => {
      if (s.isSelected){
        setFormData(prev => ({ ...prev, size: [...prev.size, s.size] }));
      }
      else {
        setFormData(prev => ({ ...prev, size: prev?.size?.filter?.(d => d !== s.size) }));
      }
    })
  }, [sizes]);

  return (
    <div>
      {console.log("sizzzz", formData.size)}
      {selectedFormat === "cloth" && (
        <>
          {/* size */}
          <div className="flex flex-col gap-2">
            <label>Select Size</label>
            <div className="flex items-center gap-2">
              {sizes.map((s, index) => (
                <div
                  key={s.size}
                  className={`w-10 h-10 cursor-pointer border flex items-center justify-center rounded text-sm ${
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
                    <span className="text-xs font-medium">
                      {c.toUpperCase()}
                    </span>
                    <span className="text-xs">✕</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No colors added yet</p>
              )}
            </div>
          </div>
          {/* material */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Material</label>
            <TagsInput tags={materialTags} setTags={setMaterialTags} />
          </div>
          {/* gender */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Target Audience</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedGender === "male"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedGender("male")}
              >
                <p>Male</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedGender === "female"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedGender("female")}
              >
                <p>Female</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedGender === "unisex"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedGender("unisex")}
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
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedFit === "slim"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedFit("slim")}
              >
                <p>Slim Fit</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedFit === "regular"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedFit("regular")}
              >
                <p>Regular Fit</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedFit === "oversized"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedFit("oversized")}
              >
                <p>Oversized</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedFit === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedFit("")}
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
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedPattern === "solid"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedPattern("solid")}
              >
                <p>Solid</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedPattern === "striped"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedPattern("striped")}
              >
                <p>Striped</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedPattern === "printed"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedPattern("printed")}
              >
                <p>Printed</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedPattern === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedPattern("")}
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
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedOccasion === "casual"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedOccasion("casual")}
              >
                <p>Casual</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedOccasion === "formal"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedOccasion("formal")}
              >
                <p>Formal</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedOccasion === "party"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedOccasion("party")}
              >
                <p>Party</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedOccasion === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedOccasion("")}
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
              // value={catFormData?.id}
              // onChange={(e) =>
              //   setCatFormData((prev) => ({
              //     ...prev,
              //     id: e.target.value,
              //   }))
              // }
            />
          </div>
        </>
      )}
      {selectedFormat === "bag" && (
        <>
          {/* material */}
          <div className="flex flex-col gap-2">
            <label>Material</label>
            <TagsInput tags={materialTags} setTags={setMaterialTags} />
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
                    <span className="text-xs font-medium">
                      {c.toUpperCase()}
                    </span>
                    <span className="text-xs">✕</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No colors added yet</p>
              )}
            </div>
          </div>
          {/* dimensions */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Dimensions (LxWxH)</label>
            <div className="flex items-center gap-2 text-sm">
              <input
                type="text"
                className="outline-none border border-gray-400 rounded p-2 w-10 text-center"
                placeholder="L"
              />
              x
              <input
                type="text"
                className="outline-none border border-gray-400 rounded p-2 w-10 text-center"
                placeholder="W"
              />
              x
              <input
                type="text"
                className="outline-none border border-gray-400 rounded p-2 w-10 text-center"
                placeholder="H"
              />
              cm
            </div>
          </div>
          {/* closure type */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Closure Type</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedClosure === "zipper"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedClosure("zipper")}
              >
                <p>Zipper</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedClosure === "magnetic"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedClosure("magnetic")}
              >
                <p>Magnetic</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedClosure === "button"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedClosure("button")}
              >
                <p>Button</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedClosure === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedClosure("")}
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
              // value={catFormData?.id}
              // onChange={(e) =>
              //   setCatFormData((prev) => ({
              //     ...prev,
              //     id: e.target.value,
              //   }))
              // }
            />
          </div>
          {/* compartment details */}
          <div className="flex flex-col mt-4 gap-2">
            <label>Compartment Details</label>
            <input
              type="text"
              placeholder="Compartment Details, eg - 1 Main + 2 Pockets"
              className="outline-none border border-gray-400 rounded p-2"
              // value={catFormData?.id}
              // onChange={(e) =>
              //   setCatFormData((prev) => ({
              //     ...prev,
              //     id: e.target.value,
              //   }))
              // }
            />
          </div>
          {/* gender */}
          <div className="flex flex-col gap-2 mt-4">
            <label>Target Audience</label>
            <div className="flex items-center gap-2">
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedGender === "male"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedGender("male")}
              >
                <p>Male</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedGender === "female"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedGender("female")}
              >
                <p>Female</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedGender === "unisex"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedGender("unisex")}
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
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedStrap === "adjustable"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedStrap("adjustable")}
              >
                <p>Adjustable</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedStrap === "detachable"
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedStrap("detachable")}
              >
                <p>Detachable</p>
              </div>
              <div
                className={`text-sm border p-2 w-fit rounded cursor-pointer ${
                  selectedStrap === ""
                    ? "border-purple-700 text-black"
                    : "border-gray-400 text-gray-500"
                }`}
                onClick={() => setSelectedStrap("")}
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