import { Props } from "./types";

const TextIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1259_2821)">
        <path
          d="M2.85677 6.42858H7.14249L7.83921 7.85716H9.41282L5.78631 0H4.21291L0.586426 7.85714H2.16004L2.85677 6.42858ZM4.99961 1.70445L6.52057 5H3.47867L4.99961 1.70445Z"
          fill={fill}
        />
        <path d="M0 8.57153H10V10.0001H0V8.57153Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_1259_2821">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TextIcon;
