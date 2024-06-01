import { Props } from "./types";

const OListIcon = ({ width = "100%", height = "100%", fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7.63153H1.05264V7.8947H0.526308V8.42101H1.05264V8.68417H0V9.21048H1.57895V7.10522H0V7.63153Z"
        fill={fill}
      />
      <path d="M0.526308 2.89481H1.05264V0.789551H0V1.31586H0.526308V2.89481Z" fill={fill} />
      <path
        d="M0 4.47382H0.947369L0 5.57908V6.05277H1.57895V5.52646H0.631579L1.57895 4.42119V3.94751H0V4.47382Z"
        fill={fill}
      />
      <path d="M9.99978 7.63159H2.63135V8.68423H9.99978V7.63159Z" fill={fill} />
      <path d="M9.99978 1.31592H2.63135V2.36856H9.99978V1.31592Z" fill={fill} />
      <path d="M9.99978 4.47363H2.63135V5.52628H9.99978V4.47363Z" fill={fill} />
    </svg>
  );
};

export default OListIcon;
