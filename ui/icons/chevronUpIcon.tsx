import { Props } from "./types";

const ChevronUpIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.258295 3.24167L2.41663 1.08333C2.74163 0.758334 3.26663 0.758334 3.59163 1.08333L5.74996 3.24167C6.27496 3.76667 5.89996 4.66667 5.1583 4.66667H0.841628C0.0999614 4.66667 -0.266705 3.76667 0.258295 3.24167Z"
        fill="black"
      />
    </svg>
  );
};

export default ChevronUpIcon;
