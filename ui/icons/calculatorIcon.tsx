import { Props } from "./types";

const CalculatorIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 96 960 960" width={width}>
      <path
        d="M314 828h50v-88h88v-50h-88v-88h-50v88h-88v50h88v88Zm215-35h201v-49H529v49Zm0-107h201v-50H529v50Zm37-163 61-61 61 61 36-36-61-61 61-61-36-36-61 61-61-61-36 36 61 61-61 61 36 36Zm-325-72h196v-50H241v50Zm-61 485q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"
        fill={fill}
      />
    </svg>
  );
};

export default CalculatorIcon;
