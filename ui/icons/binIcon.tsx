import { Props } from "./types";

const BinIcon = ({ width = "100%", height = "100%", className, fill = "#8F939B" }: Props) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.50016 15.4167C1.50016 16.425 2.32516 17.25 3.3335 17.25H10.6668C11.6752 17.25 12.5002 16.425 12.5002 15.4167V4.41667H1.50016V15.4167ZM3.3335 6.25H10.6668V15.4167H3.3335V6.25ZM10.2085 1.66667L9.29183 0.75H4.7085L3.79183 1.66667H0.583496V3.5H13.4168V1.66667H10.2085Z"
        fill={fill}
      />
    </svg>
  );
};

export default BinIcon;
