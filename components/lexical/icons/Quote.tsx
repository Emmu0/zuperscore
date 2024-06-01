import { Props } from "./types";

const QuoteIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 5.71418H2.14285L0.714274 8.57131H2.85713L4.28571 5.71418V1.42847H0V5.71418Z"
        fill={fill}
      />
      <path
        d="M5.71436 1.42847V5.71418H7.85722L6.42863 8.57131H8.57149L10.0001 5.71418V1.42847H5.71436Z"
        fill={fill}
      />
    </svg>
  );
};

export default QuoteIcon;
