import React from "react";
// react hook form
import { Controller } from "react-hook-form";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import SearchFilter from "@components/filters/SelectSearchFilter";

interface ISectionForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
  control: any;
  userDetail: any;
  reset: any;
  setDisplayPage: any;
  disabled?: boolean;
}

const ProfileReferenceForm: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  reset,
  errors,
  control,
  userDetail,
  setDisplayPage,
  disabled = false,
}) => {
  const profileSourceTypeOptions = [
    {
      key: "counselor",
      title: "Counselor",
    },
    {
      key: "another_student",
      title: "Another Student",
    },
    {
      key: "internet",
      title: "Internet",
    },
    {
      key: "others",
      title: "Others",
    },
  ];
    React.useEffect(() => {
    setDisplayPage(null)
  },[])

  return (
    <div className="grid grid-cols-2 gap-4 border border-gray-200 py-3 px-4">
      <div className="w-full">
        <Controller
          control={control}
          name="source_type"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className="w-full">
              <div className="text-sm text-dark-100 mb-1">Source Type</div>
              <div>
                <SearchFilter
                  placeHolder="Select Source Type"
                  options={profileSourceTypeOptions}
                  search={false}
                  selectedOptions={value ? [value] : null}
                  handleOption={(_value: any, data: any) => {
                    onChange(_value[0]);
                  }}
                  multiple={false}
                  position="left"
                  disabled={profileSourceTypeOptions.length > 0 ? disabled : true}
                />
              </div>
              {errors?.source_type && (
                <div className="text-sm text-red-500 mt-2">Source type is required</div>
              )}
            </div>
          )}
        />
      </div>

      <div className="w-full">
        <ReactHookInput label="Source Name" type="text" name="source_name" register={register} disabled={disabled} />
      </div>

      {watch(`source_type`) == "counselor" && (
        <div className="w-full">
          <ReactHookInput
            label="Company Name (Fill only if referred by a counselor)"
            type="text"
            name="company_name"
            register={register}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileReferenceForm;
