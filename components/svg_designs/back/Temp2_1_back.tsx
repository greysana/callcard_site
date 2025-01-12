import React from "react";

const Temp2_1_back: React.FC<{ fillColor?: string; opacity: string }> = ({
  fillColor,
  opacity,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="321"
      zoomAndPan="magnify"
      viewBox="0 0 240.75 141.750002"
      height="189"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="c4188336f2">
          <path
            d="M 0.0859375 70.742188 L 240.414062 70.742188 L 240.414062 141.5 L 0.0859375 141.5 Z M 0.0859375 70.742188 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="ca2b37a38c">
          <path
            d="M 0.0859375 77 L 240.414062 77 L 240.414062 141.5 L 0.0859375 141.5 Z M 0.0859375 77 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="34af077a5c">
          <path
            d="M 0.0859375 97 L 240.414062 97 L 240.414062 141.5 L 0.0859375 141.5 Z M 0.0859375 97 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#c4188336f2)">
        <path
          fill={fillColor}
          d="M -7.082031 144.757812 L -7.082031 80.066406 C 106.78125 190.066406 129.414062 78.617188 267.285156 70.78125 L 267.285156 144.757812 Z M -7.082031 144.757812 "
          fillOpacity={0.2}
          fillRule="evenodd"
        />
      </g>
      <g clipPath="url(#ca2b37a38c)">
        <path
          fill={fillColor}
          d="M 267.285156 144.757812 L 267.285156 99.746094 C 165.089844 72.644531 105.320312 205.484375 -7.082031 77.582031 L -7.082031 144.757812 Z M 267.285156 144.757812 "
          fillOpacity={opacity}
          fillRule="evenodd"
        />
      </g>
      <g clipPath="url(#34af077a5c)">
        <path
          fill={fillColor}
          d="M 267.285156 160.484375 L 267.285156 116.542969 C 173.65625 77.960938 124.851562 188.285156 -7.082031 97.914062 L -7.082031 160.480469 L 267.285156 160.480469 Z M 267.285156 160.484375 "
          fillOpacity={opacity}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default Temp2_1_back;
