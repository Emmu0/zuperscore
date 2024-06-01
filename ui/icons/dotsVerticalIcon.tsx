import { Props } from "./types";

const DotsVerticalIcon = ({
  width = "100%",
  height = "100%",
  className,
  fill = "black",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 4 10"
      className={className}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.00016 2.66665C2.64183 2.66665 3.16683 2.14165 3.16683 1.49998C3.16683 0.858313 2.64183 0.333313 2.00016 0.333313C1.3585 0.333313 0.833496 0.858313 0.833496 1.49998C0.833496 2.14165 1.3585 2.66665 2.00016 2.66665ZM2.00016 3.83331C1.3585 3.83331 0.833496 4.35831 0.833496 4.99998C0.833496 5.64165 1.3585 6.16665 2.00016 6.16665C2.64183 6.16665 3.16683 5.64165 3.16683 4.99998C3.16683 4.35831 2.64183 3.83331 2.00016 3.83331ZM2.00016 7.33331C1.3585 7.33331 0.833496 7.85831 0.833496 8.49998C0.833496 9.14165 1.3585 9.66665 2.00016 9.66665C2.64183 9.66665 3.16683 9.14165 3.16683 8.49998C3.16683 7.85831 2.64183 7.33331 2.00016 7.33331Z"
        fill={fill}
      />
    </svg>
  );
};

export default DotsVerticalIcon;