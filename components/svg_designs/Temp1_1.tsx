import React from "react";

const Temp1_1: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="36bc3396ab">
          <path
            d="M 0.0859375 130.695312 L 240.414062 130.695312 L 240.414062 141.484375 L 0.0859375 141.484375 Z M 0.0859375 130.695312 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#36bc3396ab)">
        <path
          fill={fillColor}
          d="M -0.464844 130.695312 L 242.078125 130.695312 L 242.078125 141.484375 L -0.464844 141.484375 Z M -0.464844 130.695312 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export default Temp1_1;
