import React from "react";
//next import
import dynamic from "next/dynamic";
// react hook form
import { Controller } from "react-hook-form";

// components
import ReactHookInput from "@components/forms/ReactHookInput";
import SearchFilter from "@components/filters/SelectSearchFilter";

//other packages
import { Country, State, City } from "country-state-city";
import moment from "moment-timezone";

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
}

const ProfileForm: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  reset,
  errors,
  control,
  userDetail,
}) => {
  const countries: any = Country.getAllCountries();
  const updatedCountries = countries.map((country: any) => ({
    key: country.name,
    title: country.name,
    data: country.isoCode,
  }));

  const [countryId, setCountryId] = React.useState("");
  const [updatedStates, setUpdatedStates] = React.useState([]);

  const [stateId, setStateId] = React.useState("");
  const [updatedCity, setUpdatedCity] = React.useState([]);

  const timezones = moment.tz.names().map((timezone: any) => ({
    key: timezone,
    title: timezone,
  }));

  React.useEffect(() => {
    if (countryId && !stateId) {
      let states: any = State.getStatesOfCountry(countryId).map((state: any) => ({
        key: state.name,
        title: state.name,
        data: state.isoCode,
      }));
      setUpdatedStates(states);
    }
    if (countryId && stateId) {
      let city: any = City.getCitiesOfState(countryId, stateId).map((city: any) => ({
        key: city.name,
        title: city.name,
      }));
      setUpdatedCity(city);
    }
  }, [countryId, stateId, reset, userDetail, setValue]);

  React.useEffect(() => {
    if (!countries || !userDetail) return;
    const country = countries.find((c: any) => c.name === userDetail.country);
    if (!country) return;
    setCountryId(country.isoCode);
  }, [countries, setCountryId, userDetail]);

  React.useEffect(() => {
    if (!countryId) return;
    const states = State.getStatesOfCountry(countryId);
    const state = states.find((s: any) => s.name === userDetail.state);
    setStateId(state?.isoCode ?? "");
  }, [countryId, userDetail]);
  return (
    <div className="space-y-4">
      <div className="border border-gray-200 bg-white">
        <div className="p-3 px-4 relative flex items-center gap-3">
          <div className="text-lg w-full">Personal Information</div>
        </div>
        <div className="border-t border-gray-200 p-3 px-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <ReactHookInput
                label="First Name"
                type="text"
                name="first_name"
                register={register}
                validations={validations.first_name}
                error={errors.first_name}
                required={true}
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
                required={true}
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Email"
                type="email"
                name="email"
                disabled
                register={register}
                validations={validations.email}
                error={errors.email}
                required={true}
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="DOB"
                type="date"
                name="dob"
                register={register}
                validations={validations.dob}
                error={errors.dob}
                required={true}
              />
            </div>
            <div className="w-full">
              <Controller
                control={control}
                rules={{ required: true }}
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
                          setStateId(_value[0]);
                        }}
                        multiple={false}
                        position="left"
                        disabled={timezones.length > 0 ? false : true}
                      />
                    </div>
                    {errors?.timezone && (
                      <div className="text-sm text-red-500 mt-2">Timezone is required</div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* address */}
      <div className="space-y-4">
        <div className="border border-gray-200 bg-white">
          <div className="p-3 px-4 relative flex items-center gap-3">
            <div className="text-lg w-full">Address</div>
          </div>
          <div className="border-t border-gray-200 p-3 px-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <ReactHookInput
                  label="Address"
                  type="text"
                  name="address"
                  register={register}
                  validations={validations.address}
                  error={errors.address}
                  required={true}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="country"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className="w-full">
                      <div className="text-sm text-dark-100 mb-1">Country</div>
                      <SearchFilter
                        placeHolder="Select Country"
                        options={updatedCountries}
                        selectedOptions={value ? [value] : null}
                        handleOption={(_value: any, data: any) => {
                          onChange(_value[0]);
                          setCountryId(data);
                          setValue("state", "");
                          setValue("city", "");
                        }}
                        multiple={false}
                        disabled={updatedCountries.length > 0 ? false : true}
                      />
                      {errors?.country && (
                        <div className="text-sm text-red-500 mt-2">Country is required</div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="state"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className="w-full">
                      <div className="text-sm text-dark-100 mb-1">State</div>
                      <div>
                        <SearchFilter
                          placeHolder="Select State"
                          options={updatedStates}
                          selectedOptions={value ? [value] : null}
                          handleOption={(_value: any, data: any) => {
                            onChange(_value[0]);
                            setStateId(data);
                            setValue("city", "");
                          }}
                          multiple={false}
                          disabled={updatedStates.length > 0 || watch("state") ? false : true}
                        />
                      </div>
                      {errors?.state && (
                        <div className="text-sm text-red-500 mt-2">State is required</div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className="w-full">
                      <div className="text-sm text-dark-100 mb-1">City</div>
                      <SearchFilter
                        placeHolder="Select City"
                        options={updatedCity}
                        selectedOptions={value ? [value] : null}
                        handleOption={(_value: any, data: any) => {
                          onChange(_value[0]);
                        }}
                        multiple={false}
                        disabled={updatedCity.length > 0 || watch("city") ? false : true}
                      />
                      {errors?.city && (
                        <div className="text-sm text-red-500 mt-2">City is required</div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="w-full">
                <ReactHookInput
                  label="Pincode"
                  type="number"
                  name="pincode"
                  register={register}
                  validations={validations.pincode}
                  error={errors.pincode}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent details */}
      <div className="space-y-4">
        <div className="border border-gray-200 bg-white">
          <div className="p-3 px-4 relative flex items-center gap-3">
            <div className="text-lg w-full">Parent Details</div>
          </div>
          <div className="border-t border-gray-200 p-3 px-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <ReactHookInput
                  label="Parent 1 Name"
                  type="text"
                  name="parent_1_name"
                  register={register}
                  validations={validations.parent_1_name}
                  error={errors.parent_1_name}
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
                />
              </div>
              <div className="w-full">
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
                        required={true}
                      />
                      {errors?.parent_1_mobile && (
                        <div className="text-sm text-red-500 mt-2">Parent 1 Mobile is required</div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
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
                        required={true}
                      />
                      {errors?.parent_2_mobile && (
                        <div className="text-sm text-red-500 mt-2">Parent 2 Mobile is required</div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* school details */}
      <div className="space-y-4">
        <div className="border border-gray-200 bg-white">
          <div className="p-3 px-4 relative flex items-center gap-3">
            <div className="text-lg w-full">School Details</div>
          </div>
          <div className="border-t border-gray-200 p-3 px-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <ReactHookInput
                  label="Name"
                  type="text"
                  name="school"
                  register={register}
                  validations={validations.school}
                  error={errors.school}
                  required={true}
                />
              </div>
              <div className="w-full">
                <ReactHookInput
                  label="Address"
                  type="text"
                  name="school_address"
                  register={register}
                  validations={validations.school_address}
                  error={errors.school_address}
                  required={true}
                />
              </div>
              <div className="w-full">
                <ReactHookInput
                  label="City"
                  type="text"
                  name="school_city"
                  register={register}
                  validations={validations.school_city}
                  error={errors.school_city}
                  required={true}
                />
              </div>
              <div className="w-full">
                <ReactHookInput
                  label="Year of Passing"
                  type="number"
                  name="year_of_passing"
                  register={register}
                  validations={validations.year_of_passing}
                  error={errors.year_of_passing}
                  required={true}
                />
              </div>
              <div className="w-full">
                <ReactHookInput
                  label="Type"
                  type="text"
                  name="school_type"
                  register={register}
                  validations={validations.school_type}
                  error={errors.school_type}
                  required={true}
                />
              </div>
              <div className="w-full">
                <ReactHookInput
                  label="Board"
                  type="text"
                  name="school_board"
                  register={register}
                  validations={validations.school_board}
                  error={errors.school_board}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
