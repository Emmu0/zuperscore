import { Props } from "./types";

const ChevronRightIcon = ({
  width = "100%",
  height = "100%",
  className,
  fill = "black",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 8"
      className={className}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.29542 7.79453C5.56819 7.52176 5.56819 7.08112 5.29542 6.80834L2.58163 4.09456L5.29542 1.38078C5.56819 1.108 5.56819 0.66736 5.29542 0.394583C5.02264 0.121807 4.582 0.121807 4.30922 0.394583L1.09885 3.60496C0.826069 3.87774 0.826069 4.31838 1.09885 4.59115L4.30922 7.80153C4.57501 8.06731 5.02264 8.06731 5.29542 7.79453Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronRightIcon;
