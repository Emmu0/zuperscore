const TextButton = ({ children, type, variant, size, className, onClick, disabled }: any) => {
  return (
    <button
      type={type ? type : "button"}
      className={`rounded ${
        variant === "secondary"
          ? disabled
            ? "text-red-300"
            : "text-red-500 hover:text-red-600"
          : disabled
          ? "text-green-0 opacity-50"
          : "text-green-0 hover:text-green-100"
      } ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TextButton;
