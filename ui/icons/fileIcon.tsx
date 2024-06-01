import { Props } from "./types";

const FileIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none" className={className}>
<path d="M14 1.5H8L6.9425 0.4425C6.6575 0.1575 6.275 0 5.8775 0H2C1.175 0 0.5075 0.675 0.5075 1.5L0.5 10.5C0.5 11.325 1.175 12 2 12H14C14.825 12 15.5 11.325 15.5 10.5V3C15.5 2.175 14.825 1.5 14 1.5ZM13.25 10.5H2.75C2.3375 10.5 2 10.1625 2 9.75V3.75C2 3.3375 2.3375 3 2.75 3H13.25C13.6625 3 14 3.3375 14 3.75V9.75C14 10.1625 13.6625 10.5 13.25 10.5Z" fill="#721154"/>
</svg> 
    

  );
};

export default FileIcon;

 