import { useState, useEffect } from "react";
// react hook form
import { Controller } from "react-hook-form";
// components
import { SearchDropdownFilter, ISelectSearchFilterOptions } from "./ComboSelectSearchFilter";
export const ReactHookSelect = ({
  name,
  label,
  disabled = false,
  required = false,
  register,
  placeHolder,
  control,
  currentValue,
  position="right",
  validations,
  errors,
  searchFilteredOptions,
}: any) => {

  const [search, setSearch] = useState<ISelectSearchFilterOptions | null>(null);
  const handleSearch = (value: ISelectSearchFilterOptions | null) => {
    setSearch((prevData: ISelectSearchFilterOptions | null) => value);
  };

  return (
    <div>
      {label && (
        <div className="text-sm text-dark-100 mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </div>
      )}
      <Controller
        control={control}
        rules={{ required: required }}
        name={name}
        render={({ field: { value, onChange } }) => (
          <SearchDropdownFilter
            options={searchFilteredOptions}
            value={search}
            name={name}
            currentValue={value}
            handleValue={(value: ISelectSearchFilterOptions | null) => {
              handleSearch(value);
              onChange(value?.key);
            }}
            placeHolder={placeHolder}
            position={position}
            disabled={disabled}
            loading={false}
          />
        )}
      />
      {errors && errors[name]?.message && (
        <div className="text-sm text-red-500">{errors && errors[name]?.message}</div>
      )}
    </div>
  );
};