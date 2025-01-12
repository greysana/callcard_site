import React from "react";

const Temp5_2_back: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="8051a539aa">
          <path
            d="M 233.726562 23.042969 L 240.414062 23.042969 L 240.414062 101.609375 L 233.726562 101.609375 Z M 233.726562 23.042969 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="1b579fdfeb">
          <path
            d="M 233.726562 28.820312 L 240.414062 28.820312 L 240.414062 107.433594 L 233.726562 107.433594 Z M 233.726562 28.820312 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#8051a539aa)">
        <path
          fill={fillColor}
          d="M 240.597656 97.066406 L 240.597656 22.996094 L 233.726562 27.585938 L 233.726562 101.65625 Z M 240.597656 97.066406 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#1b579fdfeb)">
        <path
          fill={fillColor}
          d="M 240.597656 33.359375 L 240.597656 107.433594 L 233.726562 102.839844 L 233.726562 28.769531 Z M 240.597656 33.359375 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export default Temp5_2_back;
