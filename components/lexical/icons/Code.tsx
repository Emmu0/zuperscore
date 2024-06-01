import { Props } from "./types";

const CodeIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1259_2806)">
        <path
          d="M9.8977 4.74278L7.58519 2.29276C7.44306 2.14202 7.20581 2.13515 7.05507 2.27739C6.90456 2.41952 6.89757 2.65689 7.03981 2.80751L9.10945 5.00003L7.03981 7.1928C6.89757 7.34342 6.90456 7.58067 7.05507 7.72292C7.12757 7.7913 7.22019 7.82517 7.31245 7.82517C7.41208 7.82517 7.51157 7.78567 7.58521 7.70778L9.89772 5.25765C10.0341 5.11304 10.0341 4.88727 9.8977 4.74278Z"
          fill={fill}
        />
        <path
          d="M2.96028 7.1927L0.890777 5.00006L2.96028 2.80743C3.10241 2.6568 3.09554 2.41942 2.94491 2.27731C2.7944 2.13518 2.5569 2.14205 2.41479 2.29268L0.102276 4.74269C-0.034092 4.88718 -0.034092 5.11306 0.102276 5.25758L2.41491 7.70771C2.48866 7.78583 2.58803 7.82521 2.68766 7.82521C2.77991 7.82521 2.87255 7.7912 2.94491 7.72283C3.09567 7.5807 3.10241 7.34333 2.96028 7.1927Z"
          fill={fill}
        />
        <path
          d="M5.60644 1.02919C5.40181 0.998191 5.21031 1.13868 5.17906 1.34331L4.07905 8.54335C4.0478 8.7481 4.18843 8.93949 4.39318 8.97074C4.41243 8.97361 4.43142 8.97499 4.4503 8.97499C4.63243 8.97499 4.79218 8.84212 4.82056 8.65661L5.92056 1.45657C5.95181 1.25181 5.81119 1.06044 5.60644 1.02919Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1259_2806">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CodeIcon;
