import { openSync } from "fs";
import React from "react";

const Temp1_2: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="9ecb9c8e42">
          <path
            d="M 25.703125 53.25 L 222.609375 53.25 L 222.609375 54 L 25.703125 54 Z M 25.703125 53.25 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#9ecb9c8e42)">
        <path
          fill={fillColor}
          d="M 25.703125 53.289062 L 222.898438 53.289062 L 222.898438 54.195312 L 25.703125 54.195312 Z M 25.703125 53.289062 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <path
        strokeLinecap="butt"
        transform="matrix(0.748679, 0.000713545, -0.000713545, 0.748679, 25.819244, 52.900835)"
        fill="none"
        strokeLinejoin="miter"
        d="M 0.00237877 0.99856 L 131.55175 0.998404 "
        stroke={fillColor}
        strokeWidth="2"
        strokeOpacity={opacity}
        strokeMiterlimit="4"
      />
    </svg>
  );
};

export default Temp1_2;
