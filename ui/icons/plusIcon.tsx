import { Props } from "./types";

const PlusIcon = ({ width = "100%", height = "100%", className, fill = "#8F939B" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
