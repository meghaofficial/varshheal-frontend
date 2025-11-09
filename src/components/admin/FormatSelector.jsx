const FormatSelector = ({ radioOptions, selectedFormat, setSelectedFormat }) => {
  return (
    <div className="flex gap-4">
      {radioOptions?.map((ro, index) => (
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition 
        ${
          selectedFormat === ro?.format
            ? "bg-purple-700 text-white"
            : "border border-gray-400 hover:border-purple-700"
        }`}
          onClick={() => setSelectedFormat(ro?.format)}
          key={index}
        >
          <span className="text-[11px] font-[400]">{ro?.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FormatSelector;