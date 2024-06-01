import { Props } from "./types";

const SubScriptIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1259_2821)">
        <path
          d="M9.05487 8.58033C9.65545 8.07985 10 7.34437 10 6.5625C10 5.70098 9.29901 5.00001 8.43751 5.00001C7.576 5.00001 6.87501 5.701 6.87501 6.5625V6.87501H8.12502V6.5625C8.12502 6.39009 8.26509 6.25 8.43753 6.25C8.60996 6.25 8.75003 6.39007 8.75003 6.5625C8.75003 6.97235 8.56937 7.3578 8.25474 7.62024L6.92871 8.72509L4.20818 4.37226L6.94079 0H5.46672L3.4711 3.19297L1.47548 0H0.00141096L2.73407 4.37226L0 8.74676H1.47407L3.4711 5.55151L5.46813 8.74676H6.90268L6.87499 8.76985V10H9.99998V8.75001H8.8513L9.05487 8.58033Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1259_2821">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SubScriptIcon;
