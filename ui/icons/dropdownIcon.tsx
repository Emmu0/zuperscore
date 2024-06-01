import { Props } from "./types";

const DropdownIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" fill={fill} xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M8.825 0.158325L5 3.97499L1.175 0.158325L0 1.33333L5 6.33333L10 1.33333L8.825 0.158325Z" fill={fill}/>
</svg>


  );
};

export default DropdownIcon;
