import React from 'react'

const Loader = ({ height, width, fill, bg }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width={width}
      height={height}
      style={{
        shapeRendering: "auto",
        display: "block",
        background: {bg},
      }}
    >
      <g>
        <path
          stroke="none"
          fill={fill}
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            values="0 50 51;360 50 51"
            keyTimes="0;1"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  )
}

export default Loader
