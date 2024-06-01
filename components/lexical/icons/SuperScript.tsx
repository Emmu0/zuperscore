import { Props } from "./types";

const SuperScriptIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
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
          d="M9.05487 3.58032C9.65545 3.07984 10 2.34436 10 1.56249C10 0.700993 9.29901 0 8.43748 0C7.68187 0 7.05023 0.539438 6.90627 1.25324H5.46672L3.4711 4.44621L1.47548 1.25324H0.00141096L2.73407 5.6255L0 10H1.47407L3.4711 6.80474L5.46813 10H6.9422L4.20814 5.6255L6.8996 1.31912C6.88696 1.39897 6.87499 1.47914 6.87499 1.56249V1.875H8.125V1.56249C8.125 1.39008 8.26507 1.24999 8.43751 1.24999C8.60994 1.24999 8.75001 1.39006 8.75001 1.56249C8.75001 1.97234 8.56935 2.35779 8.25472 2.62023L6.87503 3.76982V4.99999L10 4.99937V3.74936L8.85194 3.74966L9.05487 3.58032Z"
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

export default SuperScriptIcon;
