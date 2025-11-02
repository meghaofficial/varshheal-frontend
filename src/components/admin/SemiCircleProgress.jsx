const SemiCircleProgress = ({ value, max = 100 }) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = Math.PI * normalizedRadius; // half circle length
  const progress = (value / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        height={radius + strokeWidth}
        width={radius * 2 + strokeWidth}
      >
        {/* Background semi-circle */}
        <path
          d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2
          } ${radius}`}
          fill="transparent"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress semi-circle */}
        <path
          d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2
          } ${radius}`}
          fill="transparent"
          stroke="#7C3AED"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>

      {/* Center content */}
      <div className="text-center -mt-14">
        <p className="text-xl font-bold">{value.toFixed(2)}%</p>
        <span className="px-2 py-1 text-sm bg-gray-100 rounded">
          +{Math.round(value / 6)}%
        </span>
      </div>
    </div>
  );
};

export default SemiCircleProgress;