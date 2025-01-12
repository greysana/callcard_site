import React from "react";

const Temp2_1: React.FC<{ fillColor?: string; opacity: string }> = ({
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
      <path
        strokeLinecap="butt"
        transform="matrix(0, -0.74868, 0.74868, 0, 126.666502, 107.242987)"
        fill="none"
        strokeLinejoin="miter"
        d="M 0.00106824 0.497624 L 61.077348 0.497624 "
        stroke={fillColor}
        strokeWidth="1"
        strokeOpacity={opacity}
        strokeMiterlimit="4"
      />
    </svg>
  );
};

export default Temp2_1;
