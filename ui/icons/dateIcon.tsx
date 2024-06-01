import { Props } from "./types";

const DateIcon = ({ width = "100%", height = "100%", className, fill = "#8F939B" }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.33331 9.29992C5.16665 9.29992 5.02776 9.2417 4.91665 9.12525C4.80554 9.00836 4.74998 8.86659 4.74998 8.69992C4.74998 8.54436 4.80554 8.40836 4.91665 8.29192C5.02776 8.17503 5.16665 8.11659 5.33331 8.11659C5.49998 8.11659 5.63887 8.17503 5.74998 8.29192C5.86109 8.40836 5.91665 8.54436 5.91665 8.69992C5.91665 8.86659 5.86109 9.00836 5.74998 9.12525C5.63887 9.2417 5.49998 9.29992 5.33331 9.29992ZM7.99998 9.29992C7.83331 9.29992 7.69442 9.2417 7.58331 9.12525C7.4722 9.00836 7.41665 8.86659 7.41665 8.69992C7.41665 8.54436 7.4722 8.40836 7.58331 8.29192C7.69442 8.17503 7.83331 8.11659 7.99998 8.11659C8.16665 8.11659 8.30553 8.17503 8.41665 8.29192C8.52776 8.40836 8.58331 8.54436 8.58331 8.69992C8.58331 8.86659 8.52776 9.00836 8.41665 9.12525C8.30553 9.2417 8.16665 9.29992 7.99998 9.29992ZM10.6666 9.29992C10.5 9.29992 10.3611 9.2417 10.25 9.12525C10.1389 9.00836 10.0833 8.86659 10.0833 8.69992C10.0833 8.54436 10.1389 8.40836 10.25 8.29192C10.3611 8.17503 10.5 8.11659 10.6666 8.11659C10.8333 8.11659 10.9722 8.17503 11.0833 8.29192C11.1944 8.40836 11.25 8.54436 11.25 8.69992C11.25 8.86659 11.1944 9.00836 11.0833 9.12525C10.9722 9.2417 10.8333 9.29992 10.6666 9.29992ZM3.53331 14.3333C3.19998 14.3333 2.91665 14.2166 2.68331 13.9833C2.44998 13.7499 2.33331 13.4666 2.33331 13.1333V4.19992C2.33331 3.86659 2.44998 3.58325 2.68331 3.34992C2.91665 3.11659 3.19998 2.99992 3.53331 2.99992H4.46665V1.58325H5.48331V2.99992H10.5333V1.58325H11.5333V2.99992H12.4666C12.8 2.99992 13.0833 3.11659 13.3166 3.34992C13.55 3.58325 13.6666 3.86659 13.6666 4.19992V13.1333C13.6666 13.4666 13.55 13.7499 13.3166 13.9833C13.0833 14.2166 12.8 14.3333 12.4666 14.3333H3.53331ZM3.53331 13.3333H12.4666C12.5111 13.3333 12.5555 13.311 12.6 13.2666C12.6444 13.2221 12.6666 13.1777 12.6666 13.1333V6.86659H3.33331V13.1333C3.33331 13.1777 3.35554 13.2221 3.39998 13.2666C3.44442 13.311 3.48887 13.3333 3.53331 13.3333ZM3.33331 5.86659H12.6666V4.19992C12.6666 4.15547 12.6444 4.11103 12.6 4.06659C12.5555 4.02214 12.5111 3.99992 12.4666 3.99992H3.53331C3.48887 3.99992 3.44442 4.02214 3.39998 4.06659C3.35554 4.11103 3.33331 4.15547 3.33331 4.19992V5.86659ZM3.33331 5.86659V4.19992C3.33331 4.14436 3.33331 4.09725 3.33331 4.05859C3.33331 4.01947 3.33331 3.99992 3.33331 3.99992C3.33331 3.99992 3.33331 4.01947 3.33331 4.05859C3.33331 4.09725 3.33331 4.14436 3.33331 4.19992V5.86659Z"
        fill={fill}
      />
    </svg>
  );
};

export default DateIcon;
