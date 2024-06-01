import { Props } from "./types";

const AlineLeftIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1259_2821)">
        <path d="M2.97949 2.97925H10.1223V4.40782H2.97949V2.97925Z" fill={fill} />
        <path d="M0.0244141 5.93408H10.0244V7.36267H0.0244141V5.93408Z" fill={fill} />
        <path d="M2.97949 8.88916H10.1223V10.3177H2.97949V8.88916Z" fill={fill} />
        <path d="M0.0244141 0.0244141H10.0244V1.453H0.0244141V0.0244141Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_1259_2821">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AlineLeftIcon;