import React from "react";

const Temp5_2: React.FC<{
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
        <clipPath id="82100bb1c4">
          <path
            d="M 120.347656 132.785156 L 240.414062 132.785156 L 240.414062 141.484375 L 120.347656 141.484375 Z M 120.347656 132.785156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="81a418f9b5">
          <path
            d="M 115.9375 137.132812 L 124.757812 137.132812 L 124.757812 141.5 L 115.9375 141.5 Z M 115.9375 137.132812 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="82f2744944">
          <path
            d="M 120.347656 137.132812 C 121.515625 137.132812 122.636719 137.597656 123.464844 138.425781 C 124.292969 139.25 124.757812 140.371094 124.757812 141.542969 L 124.757812 142.386719 C 124.757812 143.558594 124.292969 144.679688 123.464844 145.503906 C 122.636719 146.332031 121.515625 146.796875 120.347656 146.796875 C 119.179688 146.796875 118.054688 146.332031 117.230469 145.503906 C 116.402344 144.679688 115.9375 143.558594 115.9375 142.386719 L 115.9375 141.542969 C 115.9375 140.371094 116.402344 139.25 117.230469 138.425781 C 118.054688 137.597656 119.179688 137.132812 120.347656 137.132812 Z M 120.347656 137.132812 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="4f70ca6c04">
          <path
            d="M 122.425781 134.867188 L 130.375 134.867188 L 130.375 141.5 L 122.425781 141.5 Z M 122.425781 134.867188 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="178ef33c4c">
          <path
            d="M 93 113 L 151 113 L 151 141.5 L 93 141.5 Z M 93 113 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="f0db732b70">
          <path
            d="M 94 111 L 149 111 L 149 141.5 L 94 141.5 Z M 94 111 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#82100bb1c4)">
        <path
          fill={fillColor}
          d="M 120.347656 132.785156 L 240.605469 132.785156 L 240.605469 141.484375 L 120.347656 141.484375 Z M 120.347656 132.785156 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#81a418f9b5)">
        <g clipPath="url(#82f2744944)">
          <path
            fill={fillColor}
            d="M 115.9375 137.132812 L 124.757812 137.132812 L 124.757812 146.8125 L 115.9375 146.8125 Z M 115.9375 137.132812 "
            fillOpacity={opacity}
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#4f70ca6c04)">
        <path
          fill={fillColor}
          d="M 122.425781 134.867188 L 130.375 134.867188 L 130.375 143.558594 L 122.425781 143.558594 Z M 122.425781 134.867188 "
          fillOpacity={opacity}
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#178ef33c4c)">
        <path
          strokeLinecap="butt"
          transform="matrix(0.665141, -0.34367, 0.34367, 0.665141, 109.633362, 141.121921)"
          fill="none"
          strokeLinejoin="miter"
          d="M -0.00102788 2.000857 L 34.878578 1.999048 "
          stroke={fillColor2}
          strokeWidth="4"
          strokeOpacity="1"
          strokeMiterlimit="4"
        />
      </g>
      <g clipPath="url(#f0db732b70)">
        <path
          strokeLinecap="butt"
          transform="matrix(0.661375, -0.350863, 0.350863, 0.661375, 110.320407, 137.971458)"
          fill="none"
          strokeLinejoin="miter"
          d="M 0.00231521 1.999355 L 30.318938 1.999732 "
          stroke={fillColor2}
          strokeWidth="4"
          strokeOpacity="1"
          strokeMiterlimit="4"
        />
      </g>
    </svg>
  );
};

export default Temp5_2;
