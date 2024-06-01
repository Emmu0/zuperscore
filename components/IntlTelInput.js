import React from "react";
// intl-tel-input
import "intl-tel-input/build/css/intlTelInput.css";
import ReactIntlTelInput from "react-intl-tel-input-v2";

const IntlInput = (props) => {
  const inputProps = {
    placeholder: "Enter Mobile Number",
  };

  const intlTelOpts = {
    preferredCountries: ["us", "in"],
    // onlyCountries: ["us", "in", "al", "ad", "at", "by", "be", "ba", "bg", "hr"]
  };

  const onReady = (instance, IntlTelInput) => {
    // console.log(instance, IntlTelInput);
  };

  const [intlNumber, setIntlNumber] = React.useState("");
  const handleIntNumber = (value) => {
    setIntlNumber(value);
    if (value.dialCode === intlNumber.dialCode) {
      props.onChange(`${value.dialCode}${value.phone}`);
    } else {
      const payload = {
        iso2: value.iso2,
        dialCode: value.dialCode,
        phone: "",
      };
      setIntlNumber(payload);
      props.onChange(`${payload.dialCode}${payload.phone}`);
    }
  };

  React.useEffect(() => {
    if (props.value) {
      let input = props.value.toString();
      const payload = {
        iso2: "",
        dialCode: input.slice(0, 2) ? input.slice(0, 2) : "",
        phone: input.slice(2, input.length) ? input.slice(2, input.length) : "",
      };
      setIntlNumber(payload);
    } else {
      const payload = {
        iso2: "in",
        dialCode: "91",
        phone: "",
      };
      setIntlNumber(payload);
    }
  }, []);

  return (
    <div>
      {intlNumber && (
        <ReactIntlTelInput
          inputProps={inputProps}
          intlTelOpts={intlTelOpts}
          value={intlNumber}
          onChange={handleIntNumber}
          onReady={onReady}
          className={`w-full h-full rounded-sm outline-none border border-[#E2E2E2]`}
          required={props.required}
        />
      )}
    </div>
  );
};

export default IntlInput;
