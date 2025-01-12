import React from "react";

const Temp1_1_back: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="b7446b68af">
          <path
            d="M 189 67 L 240.414062 67 L 240.414062 77 L 189 77 Z M 189 67 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="5b9480cd97">
          <path
            d="M 0.0859375 67 L 52 67 L 52 77 L 0.0859375 77 Z M 0.0859375 67 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#b7446b68af)">
        <path
          strokeLinecap="butt"
          transform="matrix(0.748656, 0.00593758, -0.00593758, 0.748656, 193.411138, 71.471801)"
          fill="none"
          strokeLinejoin="miter"
          d="M -0.00254779 0.50206 L 63.047901 0.497687 "
          stroke={fillColor}
          strokeWidth="1"
          strokeOpacity={1}
          strokeMiterlimit="4"
        />
      </g>
      <g clipPath="url(#5b9480cd97)">
        <path
          strokeLinecap="butt"
          transform="matrix(0.748656, 0.00593758, -0.00593758, 0.748656, 0.0930833, 71.846127)"
          fill="none"
          strokeLinejoin="miter"
          d="M -0.000379633 0.497726 L 63.044893 0.498612 "
          stroke={fillColor}
          strokeWidth="1"
          strokeOpacity={1}
          strokeMiterlimit="4"
        />
      </g>
    </svg>
  );
};

export default Temp1_1_back;
