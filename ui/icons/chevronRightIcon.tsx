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
      viewBox="0 0 5 8"
      className={className}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.430879 0.914159C0.203379 1.14166 0.203379 1.50916 0.430879 1.73666L2.69421 3.99999L0.430879 6.26333C0.203379 6.49083 0.203379 6.85833 0.430879 7.08583C0.658379 7.31333 1.02588 7.31333 1.25338 7.08583L3.93088 4.40833C4.15838 4.18083 4.15838 3.81333 3.93088 3.58583L1.25338 0.908326C1.03171 0.686659 0.658379 0.686659 0.430879 0.914159Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronRightIcon;
