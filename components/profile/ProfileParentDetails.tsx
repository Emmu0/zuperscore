import React from "react";
//next import
import dynamic from "next/dynamic";
// react hook form
import { Controller } from "react-hook-form";
// components
import ReactHookInput from "@components/forms/ReactHookInput";

const IntlInput = dynamic(() => import("@components/IntlTelInput"), {
  ssr: false,
});

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

const ParentDetailsForm: React.FC<ISectionForm> = ({
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
  React.useEffect(() => {
    setDisplayPage(null)
  }, [])
  return (
    <div className="border border-gray-200 py-3 px-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <ReactHookInput
            label="Parent 1 Name"
            type="text"
            name="parent_1_name"
            register={register}
            validations={validations.parent_1_name}
            error={errors.parent_1_name}
            disabled={disabled}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="Parent 2 Name"
            type="text"
            name="parent_2_name"
            register={register}
            validations={validations.parent_2_name}
            error={errors.parent_2_name}
            disabled={disabled}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="Parent 1 email"
            type="email"
            name="parent_1_email"
            register={register}
            validations={validations.parent_1_email}
            error={errors.parent_1_email}
            disabled={disabled}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="Parent 2 Email"
            type="email"
            name="parent_2_email"
            register={register}
            validations={validations.parent_2_email}
            error={errors.parent_2_email}
            disabled={disabled}
          />
        </div>
        {/* <div className="w-full">
          <Controller
            control={control}
            rules={{ required: true }}
            name="parent_1_mobile"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div className="w-full">
                <div className="text-sm text-dark-100 mb-1">Parent 1 Mobile</div>
                <IntlInput
                  value={value}
                  onChange={(value: any) => {
                    onChange(value);
                  }}
                />
                {errors?.parent_1_mobile && (
                  <div className="text-sm text-red-500 mt-2">Parent 1 Mobile is required</div>
                )}
              </div>
            )}
          />
        </div> */}
        <div className="w-full">
          <ReactHookInput
            label="Parent 1 Mobile"
            type="number"
            name="parent_1_mobile"
            register={register}
            validations={validations.parent_1_mobile}
            error={errors.parent_1_mobile}
            disabled={disabled}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="Parent 2 Mobile"
            type="number"
            name="parent_2_mobile"
            register={register}
            validations={validations.parent_2_mobile}
            error={errors.parent_2_mobile}
            disabled={disabled}
          />
        </div>
        {/* <div>
          <Controller
            control={control}
            rules={{ required: true }}
            name="parent_2_mobile"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div className="w-full">
                <div className="text-sm text-dark-100 mb-1">Parent 2 Mobile</div>
                <IntlInput
                  value={value}
                  onChange={(value: any) => {
                    onChange(value);
                  }}
                />
                {errors?.parent_2_mobile && (
                  <div className="text-sm text-red-500 mt-2">Parent 2 Mobile is required</div>
                )}
              </div>
            )}
          />
        </div> */}
      </div>
    </div>
  );
};
export default ParentDetailsForm;
