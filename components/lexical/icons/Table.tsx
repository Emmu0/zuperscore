import { Props } from "./types";

const TableIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.75 1.75V12.25H12.25V1.75H1.75ZM6.41667 11.0833H2.91667V7.58333H6.41667V11.0833ZM6.41667 6.41667H2.91667V2.91667H6.41667V6.41667ZM11.0833 11.0833H7.58333V7.58333H11.0833V11.0833ZM11.0833 6.41667H7.58333V2.91667H11.0833V6.41667Z"
        fill={fill}
      />
    </svg>
  );
};

export default TableIcon;
