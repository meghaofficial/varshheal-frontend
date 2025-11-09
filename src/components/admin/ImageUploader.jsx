import { useEffect, useState } from "react";

const ImageUploader = ({ img, type, onImageSelect, activeCat, id="imageInput" }) => {
  const [preview, setPreview] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelect(file);
    }
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelect(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // Show existing image if provided from props (Cloudinary URL)
  useEffect(() => {
    if (img && typeof img === "string") {
      setPreview(img);
    }
    if (!img){
      setPreview(null)
    }
  }, [img]);

  useEffect(() => {
    if (activeCat && activeCat?.thumbnail){
      setPreview(activeCat?.thumbnail);
    }
  }, [activeCat]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        htmlFor={id}
        className={`w-full ${
          type !== "sub" ? "h-[260px]" : "h-[80px]"
        } border-2 border-dashed border-gray-400 rounded flex flex-col items-center justify-center cursor-pointer hover:border-purple-700 transition`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="text-gray-500 text-center">
            <p className="text-[11px]">Drag & drop an image here</p>
            <p className="text-xs mt-1">or click to browse</p>
          </div>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
