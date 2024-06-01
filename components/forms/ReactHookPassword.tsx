import React from "react";
//icons
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

const ReactHookPassword = ({
  id,
  name,
  placeholder,
  beforeInput,
  label,
  type = "password",
  autoComplete = "off",
  disabled = false,
  required = false,
  register,
  validations,
  error,
}: any) => {
  const [showPassword, setShowPassword] = React.useState(type);

  const handlePassword = (e: any) => {
    if (showPassword === "text") setShowPassword("password");
    else setShowPassword("text");
  };
  return (
    <>
      {label && (
        <div className="text-sm text-dark-100 mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </div>
      )}

      <div
        className={`flex items-center border rounded overflow-hidden w-full ${
          error?.message ? "bg-red-100 border-red-500" : "border-[#E2E2E2]"
        }`}
      >
        {beforeInput && (
          <div className="h-full py-auto my-auto px-3 text-[#8B8B8B]">{beforeInput}</div>
        )}
        <input
          id={id}
          type={showPassword}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, validations)}
          autoComplete={autoComplete}
          required={required}
          className={`border-0  py-2 focus:outline-none px-2 my-auto w-full ${
            error?.message ? "bg-red-100" : "bg-white"
          }`}
        />
        <div
          className={`flex flex-shrink-0 cursor-pointer h-full items-center justify-center px-3 ${
            error?.message ? "bg-red-100" : "bg-white"
          }`}
          onClick={handlePassword}
        >
          {showPassword === "text" ? (
            <EyeIcon width="16" fill="#BDBDBD" />
          ) : (
            <EyeOffIcon width="16" fill="#BDBDBD" />
          )}
        </div>
      </div>
      {error?.message && <div className="text-sm text-red-500">{error?.message}</div>}
    </>
  );
};

export default ReactHookPassword;
