import React from "react";

interface IAssessmentButton {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "warning";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

const AssessmentButton: React.FC<IAssessmentButton> = ({
  children,
  type = "button",
  variant = "primary",
  size,
  className,
  onClick,
  disabled = false,
}) => {
  return (
    <>
      <button
        type={type}
        className={`px-4 py-1.5 ${
          disabled
            ? `bg-gray-200`
            : variant === "primary"
            ? `bg-blue-500 hover:bg-blue-600 text-white`
            : variant === "secondary"
            ? `bg-gray-300 hover:bg-gray-400`
            : ` bg-yellow-400 hover:bg-yellow-500`
        } border border-black rounded-full font-medium ${
          size === "xs"
            ? "text-xs"
            : size === "sm"
            ? "text-sm"
            : size === "lg"
            ? "text-lg"
            : size === "md" && "text-base"
        } font-normal ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default AssessmentButton;
