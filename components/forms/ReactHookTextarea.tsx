import React from "react";

const ReactHookTextarea = ({
  id,
  name,
  placeholder,
  label,
  type = "text",
  autoComplete = "off",
  rows,
  disabled = false,
  required = false,
  register,
  validations,
  error,
}: any) => {
  return (
    <div>
      {label && (
        <div className="text-sm text-dark-100 mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </div>
      )}
      <textarea
        id={id}
        type={type}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validations)}
        autoComplete={autoComplete}
        required={required}
        className={`border py-2 focus:outline-none px-2 my-auto w-full ${
          error?.message ? "bg-red-100 border-red-500" : "border-[#E2E2E2]"
        }`}
      />
      {error?.message && <div className="text-sm text-red-500">{error?.message}</div>}
    </div>
  );
};

export default ReactHookTextarea;
