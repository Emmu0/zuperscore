import { Props } from "./types";

const DashboardIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.75 0.75V8.08333H8.08333V0.75H0.75ZM6.25 6.25H2.58333V2.58333H6.25V6.25ZM0.75 9.91667V17.25H8.08333V9.91667H0.75ZM6.25 15.4167H2.58333V11.75H6.25V15.4167ZM9.91667 0.75V8.08333H17.25V0.75H9.91667ZM15.4167 6.25H11.75V2.58333H15.4167V6.25ZM9.91667 9.91667V17.25H17.25V9.91667H9.91667ZM15.4167 15.4167H11.75V11.75H15.4167V15.4167Z"
        fill={fill}
      />
    </svg>
  );
};

export default DashboardIcon;
