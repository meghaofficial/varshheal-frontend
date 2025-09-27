const CustomInput = ({ type, label, id, setFormData, formData }) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {/* here we are taking id bcz id (password) = formData.password so give id as same as formData field */}
      <input
        value={formData.id}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, id: e.target.value }))
        }
        type={type}
        id={id}
        placeholder={`Enter your ${label}`}
        className="w-full text-sm bg-white/50 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
      />
    </div>
  );
};

export default CustomInput;
