import { Props } from "./types";

const TestIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.9585 9.16669H3.12516V15.5834H4.9585V9.16669ZM10.4585 9.16669H8.62516V15.5834H10.4585V9.16669ZM18.2502 17.4167H0.833496V19.25H18.2502V17.4167ZM15.9585 9.16669H14.1252V15.5834H15.9585V9.16669ZM9.54183 2.98835L14.3177 5.50002H4.766L9.54183 2.98835ZM9.54183 0.916687L0.833496 5.50002V7.33335H18.2502V5.50002L9.54183 0.916687Z"
        fill={fill}
      />
    </svg>
  );
};

export default TestIcon;
