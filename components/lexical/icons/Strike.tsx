import { Props } from "./types";

const StrickIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25049 0V1.875H2.5005V1.25001H4.3755V3.75H5.62551V1.25001H7.50051V1.875H8.75051V0H1.25049Z"
        fill={fill}
      />
      <path
        d="M5.6255 6.25H4.3755V8.75001H3.12549V10H6.87549V8.75001H5.62548V6.25H5.6255Z"
        fill={fill}
      />
      <path d="M1.25049 4.375H8.75049V5.625H1.25049V4.375Z" fill={fill} />
    </svg>
  );
};

export default StrickIcon;
