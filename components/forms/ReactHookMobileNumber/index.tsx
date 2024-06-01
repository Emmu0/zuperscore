import React from "react";
// components
import CountryCodeDropdown from "./CountryCodeDropdown";

interface IInput {
  label?: string;
  id: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: "on" | "off";
  watch: any;
  setValue: any;
  register: any;
  errors: any;
}

const ReactHookMobileNumberInput: React.FC<IInput> = ({
  label,
  id,
  placeholder,
  name,
  disabled = false,
  required = false,
  watch,
  setValue,
  register,
  errors,
}) => {
  return (
    <div>
      {label && (
        <div className="text-sm text-dark-100 mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </div>
      )}

      <div
        className={`flex border rounded w-full ${
          Object.keys(errors).length > 0 ? "bg-red-100 border-red-500" : "border-[#E2E2E2]"
        }`}
      >
        <CountryCodeDropdown watch={watch} setValue={setValue} />
        <input
          id={id}
          type={"number"}
          placeholder={placeholder}
          required={required}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
          }}
          onWheel={(e) => e.currentTarget.blur()}
          disabled={disabled}
          {...register(name, {
            required: "This field is required.",
            maxLength: { value: 10, message: "Please enter a valid 10 digit mobile number" },
            minLength: { value: 10, message: "Please enter a valid 10 digit mobile number" },
          })}
          value={watch(name)}
          className={`border-0 rounded py-2 focus:outline-none px-2 my-auto w-full ${
            Object.keys(errors).length > 0 ? "bg-red-100" : "bg-white"
          }`}
        />
      </div>
      {name && errors?.[name]?.message && (
        <div className="text-sm text-red-500 pt-2">{errors?.[name]?.message}</div>
      )}
    </div>
  );
};

export default ReactHookMobileNumberInput;
