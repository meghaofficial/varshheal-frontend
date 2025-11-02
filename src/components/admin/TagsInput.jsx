import { useState } from "react";

const TagsInput = ({ formData, setFormData, placeholder = "Add a tag..." }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();

      if (!formData?.tags?.includes(newTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && formData?.tags?.length > 0) {
      // remove last tag on backspace
      setFormData(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }))
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-400 rounded bg-white">
      {formData?.tags?.map((tag, i) => (
        <div
          key={i}
          className="flex items-center gap-1 border border-purple-700 px-2 py-0.5 rounded-full text-sm"
        >
          <span>{tag}</span>
          <button
            type="button"
            className="ml-1 hover:text-purple-700"
            onClick={() => removeTag(tag)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-sm"
      />
    </div>
  );
};

export default TagsInput;