import { Props } from "./types";

const NeedHelp = ({
    width = "30px",
    height = "100%",
    className,
    fill = "none",
}: Props) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 18"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            className={className}>
            <path d="M13.6 2.328C12.104 0.824 10.112 0 7.992 0C3.624 0 0.0640001 3.56 0.0640001 7.928C0.0640001 9.328 0.432 10.688 1.12 11.888L0 16L4.2 14.896C5.36 15.528 6.664 15.864 7.992 15.864C12.36 15.864 15.92 12.304 15.92 7.936C15.92 5.816 15.096 3.824 13.6 2.328ZM7.992 14.52C6.808 14.52 5.648 14.2 4.632 13.6L4.392 13.456L1.896 14.112L2.56 11.68L2.4 11.432C1.744 10.384 1.392 9.168 1.392 7.928C1.392 4.296 4.352 1.336 7.984 1.336C9.744 1.336 11.4 2.024 12.64 3.272C13.888 4.52 14.568 6.176 14.568 7.936C14.584 11.568 11.624 14.52 7.992 14.52Z" fill="white" />
        </svg>
    );
};

export default NeedHelp;
