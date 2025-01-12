import React from "react";

const Temp1_3: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="17419d16b7">
          <path
            d="M 27.820312 0.0898438 L 41.039062 0.0898438 L 41.039062 10.878906 L 27.820312 10.878906 Z M 27.820312 0.0898438 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#17419d16b7)">
        <path
          fill={fillColor}
          d="M 27.820312 0.0898438 L 41.054688 0.0898438 L 41.054688 10.878906 L 27.820312 10.878906 Z M 27.820312 0.0898438 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export default Temp1_3;
