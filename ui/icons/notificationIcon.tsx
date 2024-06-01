import { Props } from "./types";

const NotificationIcon = ({
  width = "100%",
  height = "100%",
  className,
  fill = "black",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.00005 20C9.10005 20 10.0001 19.1 10.0001 18H6.00005C6.00005 19.1 6.89005 20 8.00005 20ZM14.0001 14V9C14.0001 5.93 12.3601 3.36 9.50005 2.68V2C9.50005 1.17 8.83005 0.5 8.00005 0.5C7.17005 0.5 6.50005 1.17 6.50005 2V2.68C3.63005 3.36 2.00005 5.92 2.00005 9V14L0.710052 15.29C0.0800514 15.92 0.520051 17 1.41005 17H14.5801C15.4701 17 15.9201 15.92 15.2901 15.29L14.0001 14Z"
        fill={fill}
      />
    </svg>
  );
};

export default NotificationIcon;
