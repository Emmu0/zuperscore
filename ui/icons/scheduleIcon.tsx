import { Props } from "./types";

const ScheduleIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.41667 9.08337H6.25V10.9167H4.41667V9.08337ZM17.25 4.50004V17.3334C17.25 18.3417 16.425 19.1667 15.4167 19.1667H2.58333C1.56583 19.1667 0.75 18.3417 0.75 17.3334L0.759167 4.50004C0.759167 3.49171 1.56583 2.66671 2.58333 2.66671H3.5V0.833374H5.33333V2.66671H12.6667V0.833374H14.5V2.66671H15.4167C16.425 2.66671 17.25 3.49171 17.25 4.50004ZM2.58333 6.33337H15.4167V4.50004H2.58333V6.33337ZM15.4167 17.3334V8.16671H2.58333V17.3334H15.4167ZM11.75 10.9167H13.5833V9.08337H11.75V10.9167ZM8.08333 10.9167H9.91667V9.08337H8.08333V10.9167Z"
        fill={fill}
      />
    </svg>
  );
};

export default ScheduleIcon;
