import React from "react";
//next import
import dynamic from "next/dynamic";
// react hook form
import { Controller } from "react-hook-form";
// moment timezone
import moment from "moment-timezone";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import SearchFilter from "@components/filters/SelectSearchFilter";
import DateTimePicker from "@components/ui/DateTimePicker";
import ReactHookTextarea from "@components/forms/ReactHookTextarea";

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

const ProfileInformationForm: React.FC<ISectionForm> = ({
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
  const timezones = moment.tz.names().map((timezone: any) => ({
    key: timezone,
    title: timezone,
  }));

  React.useEffect(() => {
    setDisplayPage(null);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 border border-b-0 border-gray-200 py-3 px-4">
        <div className="w-full">
          <ReactHookInput
            label="First Name"
            type="text"
            name="first_name"
            register={register}
            validations={validations.first_name}
            error={errors.first_name}
            disabled={disabled}
          />
        </div>

        <div className="w-full">
          <ReactHookInput
            label="Last Name"
            type="text"
            name="last_name"
            register={register}
            validations={validations.last_name}
            error={errors.last_name}
            disabled={disabled}
          />
        </div>

        <div className="w-full">
          <ReactHookInput
            label="Email"
            type="email"
            name="email"
            disabled={true}
            register={register}
            validations={validations.email}
            error={errors.email}
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-dark-100 mb-1">DOB</label>
          <DateTimePicker
            name="dob"
            setValue={setValue}
            timePicker={false}
            value={userDetail?.dob}
            disabled={disabled}
          />
        </div>
      </div>
      {userDetail?.role != "user" && (
        <div className="grid grid-cols-1 gap-4 border-l border-r border-gray-200 px-4">
          <div className="w-full">
            <label className="text-sm text-dark-100 mb-1">About</label>
            <ReactHookTextarea
              type="text"
              name="about"
              rows="2"
              register={register}
              validations={validations.about}
              error={errors.about}
              disabled={disabled}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 border border-t-0 border-gray-200 py-3 px-4">
        <div className="w-full">
          <Controller
            control={control}
            name="user_timezone"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div className="w-full">
                <div className="text-sm text-dark-100 mb-1">Timezone</div>
                <div>
                  <SearchFilter
                    placeHolder="Select Timezone"
                    options={timezones}
                    selectedOptions={value ? [value] : null}
                    handleOption={(_value: any, data: any) => {
                      onChange(_value[0]);
                    }}
                    multiple={false}
                    position="left"
                    disabled={timezones.length > 0 ? disabled : true}
                  />
                </div>
                {errors?.timezone && (
                  <div className="text-sm text-red-500 mt-2">Timezone is required</div>
                )}
              </div>
            )}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="WhatsApp Number"
            type="number"
            name="whatsapp_number"
            register={register}
            validations={validations.whatsapp_number}
            error={errors.whatsapp_number}
            disabled={disabled}
          />
        </div>
        {/* <div className="w-full">
          <Controller
            control={control}
            name="whatsapp_number"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div className="w-full">
                <div className="text-sm text-dark-100 mb-1">WhatsApp Number</div>
                <IntlInput
                  value={value}
                  onChange={(value: any) => {
                    onChange(value);
                  }}
                />
              </div>
            )}
          />
        </div> */}
      </div>
    </>
  );
};

export default ProfileInformationForm;
