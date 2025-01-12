import React from "react";

const Temp4_2: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="a647023def">
          <path
            d="M 173 70 L 240.414062 70 L 240.414062 141.5 L 173 141.5 Z M 173 70 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="1b30fe962a">
          <path
            d="M 247.679688 145.160156 L 173.722656 150.023438 L 168.808594 75.316406 L 242.769531 70.453125 Z M 247.679688 145.160156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="29cba3f215">
          <path
            d="M 247.679688 145.160156 L 173.722656 150.023438 L 168.808594 75.316406 L 242.769531 70.453125 Z M 247.679688 145.160156 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a647023def)">
        <g clipPath="url(#1b30fe962a)">
          <g clipPath="url(#29cba3f215)">
            <path
              fill={fillColor}
              d="M 247.648438 145.007812 L 242.757812 70.238281 C 241.050781 70.710938 239.425781 71.296875 237.882812 72.003906 L 235.632812 73.152344 C 234.171875 73.976562 232.792969 74.917969 231.496094 75.980469 C 229.078125 77.851562 226.640625 80.695312 224.1875 84.515625 C 222.898438 86.503906 221.734375 89.257812 220.699219 92.769531 C 218.667969 103.320312 217.15625 109.910156 216.167969 112.53125 C 215.386719 114.613281 214.074219 116.738281 212.234375 118.902344 C 209.34375 121.960938 207.140625 123.78125 205.625 124.371094 C 204.023438 125.425781 198.652344 127.390625 189.511719 130.261719 C 186.488281 131.605469 183.292969 133.636719 179.925781 136.355469 C 178.140625 137.648438 176.035156 142.148438 173.613281 149.855469 Z M 247.648438 145.007812 "
              fillOpacity={opacity}
              fillRule="nonzero"
            />
            <path
              fill={"#eee"}
              d="M 173.640625 149.472656 C 179.429688 146.753906 185.117188 144.078125 188.125 138.0625 C 189.058594 136.203125 189.734375 134.023438 190.46875 131.65625 C 191.3125 128.941406 192.226562 125.992188 193.679688 123.09375 C 195.058594 120.332031 196.929688 117.613281 199.691406 115.15625 C 203.855469 111.457031 210.039062 108.371094 216.171875 105.3125 C 222.085938 102.359375 227.949219 99.429688 232.011719 95.980469 C 240.261719 88.976562 241.089844 79.8125 241.917969 70.519531 C 241.933594 70.375 242.0625 70.265625 242.210938 70.277344 C 242.359375 70.289062 242.46875 70.421875 242.453125 70.570312 C 241.628906 79.835938 240.800781 89.226562 232.359375 96.390625 C 228.238281 99.886719 222.304688 102.847656 216.410156 105.792969 C 210.257812 108.863281 204.148438 111.917969 200.046875 115.558594 C 197.347656 117.960938 195.515625 120.625 194.160156 123.332031 C 192.730469 126.1875 191.828125 129.09375 190.984375 131.816406 C 190.25 134.171875 189.5625 136.398438 188.605469 138.304688 C 185.5 144.511719 179.628906 147.253906 173.867188 149.957031 C 173.734375 150.019531 173.574219 149.960938 173.511719 149.828125 C 173.445312 149.695312 173.503906 149.535156 173.640625 149.472656 Z M 173.640625 149.472656 "
              fillOpacity={opacity}
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Temp4_2;