import React from "react";

const Temp4_5: React.FC<{ fillColor?: string; opacity: string }> = ({
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
        <clipPath id="3e0db2fbdf">
          <path
            d="M 71 105 L 222 105 L 222 141.5 L 71 141.5 Z M 71 105 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="e78dc09bbd">
          <path
            d="M 56.855469 334.683594 L 132.714844 81.523438 L 257.503906 118.914062 L 181.644531 372.078125 Z M 56.855469 334.683594 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="f97db9743b">
          <path
            d="M 56.855469 334.683594 L 132.714844 81.523438 L 257.503906 118.914062 L 181.644531 372.078125 Z M 56.855469 334.683594 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#3e0db2fbdf)">
        <g clipPath="url(#e78dc09bbd)">
          <g clipPath="url(#f97db9743b)">
            <path
              fill={fillColor}
              d="M 71.382812 311.09375 C 69.792969 291.910156 77.4375 272.839844 88.914062 257.382812 C 93.488281 251.222656 98.660156 245.53125 103.257812 239.390625 C 107.851562 233.246094 111.910156 226.546875 113.855469 219.128906 C 115.832031 211.589844 115.542969 203.652344 114.820312 195.898438 C 114.097656 188.140625 112.949219 180.382812 113.246094 172.597656 C 113.597656 163.425781 116.027344 154.242188 120.949219 146.492188 C 125.871094 138.742188 133.371094 132.515625 142.144531 129.820312 C 150.414062 127.28125 159.453125 127.886719 167.570312 124.898438 C 176.445312 121.628906 183.25 114.4375 191.449219 109.722656 C 195.546875 107.367188 200.105469 105.609375 204.832031 105.480469 C 207.195312 105.414062 209.582031 105.761719 211.792969 106.605469 C 214 107.449219 216.03125 108.792969 217.585938 110.574219 C 219.289062 112.519531 220.390625 114.949219 220.960938 117.472656 C 221.53125 119.992188 221.582031 122.613281 221.339844 125.1875 C 220.859375 130.339844 219.234375 135.308594 218.316406 140.398438 C 215.671875 155.03125 218.914062 169.992188 220.214844 184.808594 C 221.789062 202.753906 220.28125 221.617188 211.378906 237.277344 C 208.183594 242.898438 204.117188 247.964844 200.363281 253.226562 C 196.609375 258.488281 193.109375 264.054688 191.265625 270.253906 C 188.234375 280.421875 189.894531 291.332031 191.695312 301.789062 C 192.6875 307.550781 193.71875 313.324219 194.023438 319.164062 C 194.328125 325 193.886719 330.945312 192.007812 336.480469 C 190.125 342.011719 186.714844 347.132812 181.894531 350.441406 C 179.484375 352.09375 176.742188 353.277344 173.867188 353.808594 C 170.992188 354.339844 167.984375 354.203125 165.195312 353.335938 C 162.449219 352.476562 159.957031 350.933594 157.707031 349.136719 C 155.457031 347.34375 153.425781 345.292969 151.355469 343.296875 C 149.285156 341.296875 147.15625 339.332031 144.761719 337.742188 C 142.363281 336.148438 139.667969 334.933594 136.8125 334.5625 C 134.210938 334.230469 131.554688 334.609375 129.050781 335.394531 C 126.546875 336.179688 124.183594 337.355469 121.898438 338.640625 C 117.324219 341.210938 112.910156 344.257812 107.835938 345.589844 C 103.21875 346.800781 98.25 346.5 93.738281 344.949219 C 89.226562 343.398438 85.167969 340.628906 81.902344 337.144531 C 75.378906 330.183594 72.167969 320.605469 71.382812 311.09375 Z M 71.382812 311.09375 "
              fillOpacity={opacity}
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Temp4_5;