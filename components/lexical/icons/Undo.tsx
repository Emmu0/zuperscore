import { Props } from "./types";

const UndoIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      // viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.4 38H14v-3h14.45q3.5 0 6.025-2.325Q37 30.35 37 26.9t-2.525-5.775Q31.95 18.8 28.45 18.8H13.7l5.7 5.7-2.1 2.1L8 17.3 17.3 8l2.1 2.1-5.7 5.7h14.7q4.75 0 8.175 3.2Q40 22.2 40 26.9t-3.425 7.9Q33.15 38 28.4 38Z"
        fill={fill}
      />
    </svg>
  );
};

export default UndoIcon;