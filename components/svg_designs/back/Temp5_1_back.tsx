import React from "react";

const Temp5_1_back: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="df8261d335">
          <path
            d="M 0.0898438 26.65625 L 6.828125 26.65625 L 6.828125 105.265625 L 0.0898438 105.265625 Z M 0.0898438 26.65625 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="523fecd0c0">
          <path
            d="M 0.0898438 32.433594 L 6.828125 32.433594 L 6.828125 110.996094 L 0.0898438 110.996094 Z M 0.0898438 32.433594 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#df8261d335)">
        <path
          fill={fillColor}
          d="M 6.960938 31.195312 L 6.960938 105.265625 L 0.0898438 100.675781 L 0.0898438 26.605469 Z M 6.960938 31.195312 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#523fecd0c0)">
        <path
          fill={fillColor}
          d="M 6.960938 106.457031 L 6.960938 32.386719 L 0.0898438 36.976562 L 0.0898438 111.046875 Z M 6.960938 106.457031 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export default Temp5_1_back;
