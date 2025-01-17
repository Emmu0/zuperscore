import { Props } from "./types";

const BoldIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.30347 4.84998C7.99277 4.36784 8.48204 3.58928 8.48204 2.85713C8.48204 1.24644 7.23564 0 5.62492 0H1.16064V10H6.18922C7.68564 10 8.83923 8.7857 8.83923 7.29287C8.8392 6.20715 8.22135 5.28214 7.30347 4.84998ZM3.3035 1.7857H5.44636C6.03922 1.7857 6.51778 2.26426 6.51778 2.85713C6.51778 3.45 6.03922 3.92856 5.44636 3.92856H3.3035V1.7857ZM5.80348 8.21426H3.3035V6.07141H5.80351C6.39638 6.07141 6.87494 6.54997 6.87494 7.14284C6.87494 7.73571 6.39634 8.21426 5.80348 8.21426Z"
        fill={fill}
      />
    </svg>
  );
};

export default BoldIcon;
