import React from "react";

export interface IButton {
  type?: "button" | "submit";
  variant?:
    | "primary"
    | "outline-primary"
    | "secondary"
    | "outline-secondary"
    | "danger"
    | "outline-danger"
    | "success"
    | "outline-success"
    | "info"
    | "outline-info";
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: any;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ type, variant, size, onClick, className, children, disabled }: IButton) => {
  return (
    <button
      type={type}
      className={`p-1.5 px-4 rounded-sm font-normal ${
        variant === "info"
          ? `border border-blue-600 hover:border-blue-700 bg-blue-600 hover:bg-blue-700 text-white`
          : variant === "outline-info"
          ? `border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`
          : variant === "danger"
          ? `border border-red-600 hover:border-red-700 bg-red-600 hover:bg-red-700 text-white`
          : variant === "outline-danger"
          ? `border border-red-600 text-red-600 hover:bg-red-600 hover:text-white`
          : variant === "success"
          ? `border border-green-600 hover:border-green-700 bg-green-600 hover:bg-green-700 text-white`
          : variant === "outline-success"
          ? `border border-green-600 text-green-600 hover:bg-green-600 hover:text-white`
          : variant === "secondary"
          ? `border border-gray-300 hover:border-gray-400 bg-gray-300 hover:bg-gray-400 text-gray-800`
          : variant === "outline-secondary"
          ? `border border-gray-300 text-gray-500 hover:bg-gray-300 hover:text-gray-800`
          : variant === "outline-primary"
          ? `border border-violet-100 text-violet-100 hover:bg-violet-100 hover:text-white`
          : `border border-violet-100 hover:border-violet-100 bg-violet-100  hover:bg-violet-100 hover:bg-opacity-90 text-white`
      }  
      ${disabled ? `bg-opacity-50` : ``} 
      ${size === "xs" ? `text-xs` : size === "sm" ? `text-sm` : size === "lg" ? `text-lg` : ``} 
      ${className && className}`}
      onClick={() => {
        if (onClick) onClick();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
