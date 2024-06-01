import React, { useState } from "react";

const ReactHookNumberInput = ({
  id,
  name,
  placeholder,
  beforeInput,
  afterInput,
  label,
  value,
  setValue,
  type,
  autoComplete = "off",
  disabled = false,
  required = false,
  register,
  validations,
  error,
  min = null,
  className,
  max = null
}: any) => {
  const [number, setNumber] = useState('');

  React.useEffect(() => {
    if (value) {
      setNumber(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (min !== null && max !== null) {
      if (inputValue === '' || (Number(inputValue) >= min && Number(inputValue) <= max)) {
        setNumber(inputValue)
        setValue(name,inputValue);
      }
    } else {
      setNumber(inputValue)
      setValue(name,inputValue);
    }
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
        className={`flex border rounded-sm overflow-hidden w-full ${
          error?.message ? "bg-red-100 border-red-500" : "border-[#E2E2E2]"
        }`}
      >
        {beforeInput && (
          <div className="h-full py-auto my-auto px-3 text-[#8B8B8B]">{beforeInput}</div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          className={`border-0 py-2 focus:outline-none px-2 my-auto w-full ${
            error?.message ? "bg-red-100" : "bg-white"
          } ${disabled && `bg-gray-100`} ${className && className}`}
          value={number}
          onChange={handleChange}
        />
        {afterInput && (
          <div className="h-full py-auto my-auto px-3 text-[#8B8B8B]">{afterInput}</div>
        )}
      </div>
      {error?.message && <div className="text-sm text-red-500">{error?.message}</div>}
    </>
  );
};

export default ReactHookNumberInput;
