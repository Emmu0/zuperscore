import { Props } from "./types";

const VerticalDotIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width="4"
      height="16"
      viewBox="0 0 4 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.900001 0 0 0.9 0 2C0 3.1 0.900001 4 2 4ZM2 6C0.900001 6 0 6.9 0 8C0 9.1 0.900001 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.900001 12 0 12.9 0 14C0 15.1 0.900001 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"
        fill={fill}
      />
    </svg>
  );
};

export default VerticalDotIcon;
