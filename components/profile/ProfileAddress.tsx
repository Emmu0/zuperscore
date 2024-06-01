import React from "react";
// react hook form
import { Controller } from "react-hook-form";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import SearchFilter from "@components/filters/SelectSearchFilter";
//other packages
import { Country, State, City } from "country-state-city";
import ReactHookTextarea from "@components/forms/ReactHookTextarea";

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

const AddressForm: React.FC<ISectionForm> = ({
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
    const country = countries.find((c: any) => c.name === watch("country"));
    if (!country) return;
    setCountryId(country.isoCode);
  }, [countries, setCountryId, userDetail, watch]);

  React.useEffect(() => {
    setDisplayPage(null);
    if (!countryId) return;
    const states = State.getStatesOfCountry(countryId);
    const state = states.find((s: any) => s.name === watch("state"));
    setStateId(state?.isoCode ?? "");
  }, [countryId, userDetail, watch]);

  return (
    <div className="border border-gray-200 py-3 px-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="w-full">
          <ReactHookTextarea
            label="Address"
            type="text"
            name="address"
            rows="2"
            register={register}
            validations={validations.address}
            error={errors.address}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-2">
        <div>
          <Controller
            control={control}
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
                  disabled={updatedCountries.length > 0 ? disabled : true}
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
                    disabled={updatedStates.length > 0 || watch("state") ? disabled : true}
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
                  disabled={updatedCity.length > 0 || watch("city") ? disabled : true}
                />
                {errors?.city && <div className="text-sm text-red-500 mt-2">City is required</div>}
              </div>
            )}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="Zipcode"
            type="number"
            name="pincode"
            register={register}
            validations={validations.pincode}
            error={errors.pincode}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
export default AddressForm;
