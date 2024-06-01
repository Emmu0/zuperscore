import React from "react";

interface IButton {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "primary-outline"
    | "primary-text"
    | "secondary"
    | "secondary-outline"
    | "secondary-text"
    | "danger"
    | "danger-outline"
    | "danger-text"
    | "success"
    | "success-outline"
    | "success-text"
    | null;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size,
  className,
  onClick,
  disabled,
  loading,
}: IButton) => {
  return (
    <button
      type={type}
      className={`text-white rounded outline-none p-2 px-4 transition duration-200 ease-in-out 
      ${
        variant == "primary"
          ? disabled
            ? "bg-opacity-50 bg-violet-100"
            : "bg-violet-100 hover:bg-violet-0"
          : variant == "primary-outline"
          ? disabled
            ? "border border-violet-100 text-violet-100 opacity-50"
            : "border border-violet-100 text-violet-100 hover:bg-green-100 hover:text-white"
          : variant == "primary-text"
          ? disabled
            ? "text-violet-100 hover:border-violet-100 opacity-60 hover:text-white"
            : "text-violet-100 hover:bg-violet-100 hover:text-green-100"
          : variant === "secondary"
          ? disabled
            ? "bg-gray-200 opacity-50  text-gray-500"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          : variant == "secondary-outline"
          ? disabled
            ? "border border-gray-300 text-gray-300"
            : "border border-gray-500 text-gray-500 hover:bg-gray-600 hover:text-white"
          : variant == "secondary-text"
          ? disabled
            ? "text-gray-300 hover:bg-gray-300 hover:text-white"
            : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          : variant == "danger"
          ? disabled
            ? "bg-red-300"
            : "bg-red-600 hover:bg-red-500"
          : variant == "danger-outline"
          ? disabled
            ? "border border-red-300 text-red-300"
            : "border border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
          : variant == "danger-text"
          ? disabled
            ? "text-red-300 hover:bg-red-300 hover:text-white"
            : "text-red-500 hover:bg-red-100 hover:text-red-700"
          : variant == "success"
          ? disabled
            ? "bg-green-300"
            : "bg-green-500 hover:bg-green-600"
          : variant == "success-outline"
          ? disabled
            ? "border border-green-300 text-green-300"
            : "border border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
          : variant == "success-text"
          ? disabled
            ? "text-green-300 hover:bg-green-300 hover:text-white"
            : "text-green-500 hover:bg-[#C8E6C9] hover:text-green-700"
          : disabled
          ? "bg-opacity-50 bg-violet-100 "
          : "bg-violet-100 hover:bg-violet-800"
      } 
      ${
        size === "xs"
          ? "text-xs"
          : size === "sm"
          ? "text-sm"
          : size === "lg"
          ? "text-lg"
          : size === "md" && "text-base"
      } flex gap-2 items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <div>Processing...</div> : <div>{children}</div>}
    </button>
  );
};

export default Button;
