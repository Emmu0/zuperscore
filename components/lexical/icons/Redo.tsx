import { Props } from "./types";

const Redo = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6 38q-4.75 0-8.175-3.2Q8 31.6 8 26.9t3.425-7.9q3.425-3.2 8.175-3.2h14.7l-5.7-5.7L30.7 8l9.3 9.3-9.3 9.3-2.1-2.1 5.7-5.7H19.55q-3.5 0-6.025 2.325Q11 23.45 11 26.9t2.525 5.775Q16.05 35 19.55 35H34v3Z"
        fill={fill}
      />
    </svg>
  );
};

export default Redo;