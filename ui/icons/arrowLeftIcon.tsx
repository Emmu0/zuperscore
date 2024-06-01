import { Props } from "./types";

const ArrowLeftIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 16"
      className={className}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.3332 6.58334H5.67568L9.75568 2.50334C10.3082 1.95084 10.3082 1.05834 9.75568 0.505836C9.20318 -0.0466638 8.31068 -0.0466638 7.75818 0.505836L1.25568 7.00834C0.703184 7.56084 0.703184 8.45334 1.25568 9.00584L7.75818 15.5083C8.31068 16.0608 9.20318 16.0608 9.75568 15.5083C10.3082 14.9558 10.3082 14.0633 9.75568 13.5108L5.67568 9.41667H24.3332C25.1124 9.41667 25.7498 8.77917 25.7498 8C25.7498 7.22084 25.1124 6.58334 24.3332 6.58334Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
