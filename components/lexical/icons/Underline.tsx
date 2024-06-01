import { Props } from "./types";

const UnderlineIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00033 7.77779C6.84199 7.77779 8.33366 6.28612 8.33366 4.44445V0H6.94478V4.44445C6.94478 5.51945 6.07533 6.38891 5.00033 6.38891C3.92533 6.38891 3.05587 5.51945 3.05587 4.44445V0H1.66699V4.44445C1.66699 6.28612 3.15866 7.77779 5.00033 7.77779Z"
        fill={fill}
      />
      <path d="M8.88912 8.88892H1.11133V10H8.88912V8.88892Z" fill={fill} />
    </svg>
  );
};

export default UnderlineIcon;
