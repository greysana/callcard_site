import React from "react";

const Temp5_1: React.FC<{
  fillColor?: string;
  fillColor2?: string;
  opacity: string;
}> = ({ fillColor, fillColor2, opacity }) => {
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
        <clipPath id="70dd07abff">
          <path
            d="M 0.0859375 132.785156 L 120.347656 132.785156 L 120.347656 141.484375 L 0.0859375 141.484375 Z M 0.0859375 132.785156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="8cd61f2613">
          <path
            d="M 108.492188 132.785156 L 126.628906 132.785156 L 126.628906 141.484375 L 108.492188 141.484375 Z M 108.492188 132.785156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="aae6e6ee02">
          <path
            d="M 92 115 L 147 115 L 147 141.5 L 92 141.5 Z M 92 115 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="5657d4adcb">
          <path
            d="M 48 66 L 205 66 L 205 141.5 L 48 141.5 Z M 48 66 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#70dd07abff)">
        <path
          fill={fillColor}
          d="M 0.0859375 132.785156 L 120.34375 132.785156 L 120.34375 141.484375 L 0.0859375 141.484375 Z M 0.0859375 132.785156 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#8cd61f2613)">
        <path
          fill={fillColor}
          d="M 108.492188 132.785156 L 126.636719 132.785156 L 126.636719 141.484375 L 108.492188 141.484375 Z M 108.492188 132.785156 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#aae6e6ee02)">
        <path
          strokeLinecap="butt"
          transform="matrix(0.661375, -0.350863, 0.350863, 0.661375, 108.490119, 142.120355)"
          fill="none"
          strokeLinejoin="miter"
          d="M 0.000545859 1.997722 L 30.321778 2.000544 "
          stroke={fillColor2}
          strokeWidth="4"
          strokeOpacity="1"
          strokeMiterlimit="4"
        />
      </g>
      <g clipPath="url(#5657d4adcb)">
        <path
          strokeLinecap="butt"
          transform="matrix(0.661375, -0.350863, 0.350863, 0.661375, 113.796818, 139.474857)"
          fill="none"
          strokeLinejoin="miter"
          d="M 0.00220938 8.000824 L 30.318832 8.001202 "
          stroke={fillColor2}
          strokeWidth="16"
          strokeOpacity="1"
          strokeMiterlimit="4"
        />
      </g>
    </svg>
  );
};

export default Temp5_1;
