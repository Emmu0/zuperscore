import React from "react";
// date picker
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
// icon
import InputIcon from "react-multi-date-picker/components/input_icon";
// css
import "react-multi-date-picker/styles/colors/purple.css";

const DateTimePicker = ({ name, setValue, timePicker, minDate, maxDate, value, disabled }: any) => {
  const [dates, setDates] = React.useState<any>(value ? new Date(value) : "");
  const dateTimeFormat = "DD/MM/YYYY hh:mm a";
  const dateFormat = "DD/MM/YYYY";
  const YYYY_MM_DD = "YYYY-MM-DD";
  const dateHandler = (date: any) => {
    setDates(timePicker ? new Date(date) : date?.set({ format: YYYY_MM_DD }));
    setValue(name, timePicker ? new Date(date) : date?.format(YYYY_MM_DD));
  };

  const inputClassName = "w-full border border-solid p-2 rounded focus:outline-none";
  
  if (disabled) {
    return (
      <div className="w-full">
        <input
          type="text"
          value={value}
          className={`${inputClassName} bg-gray-100`}
          readOnly
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <DatePicker
        render={
          <InputIcon
            placeholder={timePicker ? "dd-mm-yyyy --:-- --" : "dd-mm-yyyy"}
            className={inputClassName}
          />
        }
        value={dates}
        onChange={dateHandler}
        minDate={minDate}
        maxDate={maxDate}
        format={timePicker ? dateTimeFormat : dateFormat}
        plugins={[<TimePicker key={1} hideSeconds disabled={!timePicker} />]}
      />
    </div>
  );
};

export default DateTimePicker;
