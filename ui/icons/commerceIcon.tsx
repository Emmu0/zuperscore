import { Props } from "./types";

const CommerceIcon = ({ width = "100%", height = "100%", className, fill = "black" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.2692 5.65415L12.9692 7.19415L10.8333 5.05832V3.77498L12.9692 1.63915L16.2692 3.17915C16.6175 3.34415 17.0208 3.18832 17.1858 2.84915C17.3508 2.50082 17.195 2.09748 16.8558 1.93248L13.2625 0.254983C12.9142 0.0899827 12.5017 0.163316 12.2267 0.438316L10.6317 2.03332C10.4667 1.81332 10.21 1.66665 9.91667 1.66665C9.4125 1.66665 9 2.07915 9 2.58332V3.49998H6.085C5.7 2.43665 4.69167 1.66665 3.5 1.66665C1.97833 1.66665 0.75 2.89498 0.75 4.41665C0.75 5.42498 1.3 6.29582 2.10667 6.78165L4.49 14.5H3.5C2.49167 14.5 1.66667 15.325 1.66667 16.3333V17.25H13.5833V16.3333C13.5833 15.325 12.7583 14.5 11.75 14.5H10.265L5.70917 6.03915C5.865 5.81915 5.99333 5.58998 6.085 5.33332H9V6.24998C9 6.75415 9.4125 7.16665 9.91667 7.16665C10.21 7.16665 10.4667 7.01998 10.6317 6.79998L12.2267 8.39498C12.5017 8.66998 12.9142 8.74332 13.2625 8.57832L16.8558 6.90082C17.2042 6.73582 17.3508 6.33248 17.1858 5.98415C17.0208 5.64498 16.6175 5.48915 16.2692 5.65415ZM3.5 5.33332C2.99583 5.33332 2.58333 4.92082 2.58333 4.41665C2.58333 3.91248 2.99583 3.49998 3.5 3.49998C4.00417 3.49998 4.41667 3.91248 4.41667 4.41665C4.41667 4.92082 4.00417 5.33332 3.5 5.33332ZM8.18417 14.5H6.40583L4.15083 7.16665H4.2425L8.18417 14.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default CommerceIcon;