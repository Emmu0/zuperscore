import React from "react";
// react hook form
import { Controller, useFieldArray } from "react-hook-form";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import SearchFilter from "@components/filters/SelectSearchFilter";
import Button from "@components/buttons";
import DateTimePicker from "@components/ui/DateTimePicker";
import ReactHookTimeInput from "@components/forms/ReactHookTimeInput";

interface ISectionForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
  control: any;
  reset: any;
  userDetail: any;
  getValues: any;
  setDisplayPage: any;
  disabled?: boolean;
}

const ProfilePrepNavigationGuidelines: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  reset,
  errors,
  control,
  userDetail,
  getValues,
  setDisplayPage,
  disabled = false,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prep_navigation",
  });
  const time = [
    { key: "excess-time", title: "Excess time" },
    { key: "less-time", title: "Less time" },
  ];
  const reason_options = [
    { key: "exams", title: "Exams" },
    { key: "vacations", title: "Vacations" },
    { key: "others", title: "Others" },
  ];

  const onRemove = (index: number) => {
    remove(index);
    const newValues = getValues("prep_navigation");
    newValues.map((items: any, idx: any) => {
      setValue(`prep_navigation[${idx}].start_date`, items.start_date);
      setValue(`prep_navigation[${idx}].end_date`, items.end_date);
      setValue(`prep_navigation[${idx}].time`, items.time);
      setValue(`prep_navigation[${idx}].weekly_hours`, items.weekly_hours);
      setValue(`prep_navigation[${idx}].reason`, items.reason);
    });
  };
  React.useEffect(() => {
    setDisplayPage(null);
  }, []);
  return (
    <div className="border border-gray-200">
      {fields && fields.length > 0 ? (
        <div className="relative divide-y">
          {fields.map((item: any, index: any) => (
            <div key={index} className="p-3 px-4">
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={`prep_navigation[${index}].reason`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <div className="w-full">
                        <div className="text-sm text-dark-100 mb-1">Reason</div>
                        <div>
                          <SearchFilter
                            placeHolder="Select reason"
                            options={reason_options}
                            search={false}
                            selectedOptions={value ? [value] : null}
                            handleOption={(selectedValue: any) => {
                              onChange(selectedValue[0]);
                            }}
                            multiple={false}
                            position="left"
                            key={index}
                            disabled={disabled}
                          />
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-dark-100 mb-1">Start Date</label>
                  <DateTimePicker
                    name={`prep_navigation[${index}].start_date`}
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`prep_navigation[${index}].start_date`)}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-dark-100 mb-1">End Date</label>
                  <DateTimePicker
                    name={`prep_navigation[${index}].end_date`}
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`prep_navigation[${index}].end_date`)}
                    disabled={disabled}
                  />
                </div>

                <div className="flex-shrink-0">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={`prep_navigation[${index}].time`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <div className="w-full">
                        <div className="text-sm text-dark-100 mb-1">Time</div>
                        <div>
                          <SearchFilter
                            placeHolder="Select time taken"
                            options={time}
                            search={false}
                            selectedOptions={value ? [value] : null}
                            handleOption={(selectedValue: any) => {
                              onChange(selectedValue[0]);
                            }}
                            disabled={disabled}
                            multiple={false}
                            position="left"
                            key={index}
                          />
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="w-full">
                  <ReactHookTimeInput
                    label="Weekly hours"
                    name={`prep_navigation[${index}].weekly_hour`}
                    minHours={0}
                    maxHours={20}
                    minuteInterval={15}
                    setValue={setValue}
                    value={getValues(`prep_navigation[${index}].weekly_hour`)}
                    disabled={disabled}
                  />
                </div>
                <div className="flex-shrink-0 mt-auto mb-1">
                  <Button
                    variant="outline-primary"
                    size="xs"
                    onClick={() => onRemove(index)}
                    disabled={disabled}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">No prep navigation are available.</div>
      )}
      <div className="border-t border-gray-200 px-3 py-2">
        <Button
          variant="outline-primary"
          size="xs"
          onClick={() => append({ id: uuidV4() })}
          disabled={disabled}
        >
          Add Prep Navigation
        </Button>
      </div>
    </div>
  );
};
export default ProfilePrepNavigationGuidelines;
