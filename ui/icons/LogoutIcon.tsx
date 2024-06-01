import { Props } from "./types";

const LogoutIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 16"
      className={className}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1C0 1.55 0.45 2 1 2H13C13.55 2 14 1.55 14 1C14 0.45 13.55 0 13 0H1C0.45 0 0 0.45 0 1ZM2.41 10H4V15C4 15.55 4.45 16 5 16H9C9.55 16 10 15.55 10 15V10H11.59C12.48 10 12.93 8.92 12.3 8.29L7.71 3.7C7.32 3.31 6.69 3.31 6.3 3.7L1.71 8.29C1.08 8.92 1.52 10 2.41 10Z"
        fill={fill}
      />
    </svg>
  );
};

export default LogoutIcon;
