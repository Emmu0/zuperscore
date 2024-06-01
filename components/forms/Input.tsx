import React from "react";
// types
import { IFormType } from "interfaces/FormInput";

const Input: React.FC<IFormType> = ({
  id,
  label,
  value,
  type,
  className,
  placeholder,
  name,
  register,
  disabled,
  validations,
  error,
  autoComplete,
  mode = "primary",
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-gray-500 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        {...(register && register(name, validations))}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full outline-none px-3 py-2 ${className ? className : ""} ${
          mode === "primary" ? "border rounded" : mode === "transparent" ? "" : ""
        } ${error && mode !== "transparent" && "border border-red-500 bg-red-100"} ${
          mode === "transparent" && error ? "border-b border-red-500" : ""
        }`}
      />
      {error?.message && <div className="text-red-500 text-sm">{error.message}</div>}
    </>
  );
};

export default Input;
