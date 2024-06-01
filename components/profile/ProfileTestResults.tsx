import React from "react";
// react hook form
import { Controller, useFieldArray } from "react-hook-form";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import SearchFilter from "@components/filters/SelectSearchFilter";
import Button from "@components/buttons";
import DateTimePicker from "@components/ui/DateTimePicker";
import ReactHookNumberInput from "@components/forms/ReactHookNumberInput";

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

const TestDetails: React.FC<ISectionForm> = ({
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
    name: "test_results",
  });

  const profileTestTypeOptions = [
    {
      key: "SAT",
      title: "SAT",
    },
    {
      key: "ACT",
      title: "ACT",
    },
    {
      key: "APs",
      title: "APs",
    },
  ];


  const onRemove = (index: number) => {
    remove(index);
    const newValues = getValues("test_results");
    newValues.map((items: any, idx: any) => {
      setValue(`test_results[${idx}].type`, items.type);
      setValue(`test_results[${idx}].type_of_test`, items.type_of_test);
      setValue(`test_results[${idx}].test_type`, items.test_type);
      setValue(`test_results[${idx}].kind`, items.kind);
      setValue(`test_results[${idx}].date`, items.date);
      setValue(`test_results[${idx}].attempts_no`, items.attempts_no);
    });
  };

  const getCurrentYearPlusThree = () => {
    var currentYear = new Date().getFullYear();
    var futureYear = currentYear + 3;
    var result = [];

    for (var i = currentYear - 3; i <= futureYear; i++) {
      result.push({ key: i.toString(), title: i.toString() });
    }
    return result;
  };
  const getAllMonths = () => {
    const months = [
      { key: "January", title: "January" },
      { key: "February", title: "February" },
      { key: "March", title: "March" },
      { key: "April", title: "April" },
      { key: "May", title: "May" },
      { key: "June", title: "June" },
      { key: "July", title: "July" },
      { key: "August", title: "August" },
      { key: "September", title: "September" },
      { key: "October", title: "October" },
      { key: "November", title: "November" },
      { key: "December", title: "December" },
    ];
    return months;
  };
  const typeOfTestOptions = [
    {
      key: "diagnostic",
      title: "Diagnostic",
    },
    {
      key: "actual",
      title: "Actual",
    },
    {
      key: "outside_diagnostic",
      title: "Outside Diagnostic",
    },
  ];
  React.useEffect(() => {
    setDisplayPage(null);
  }, []);
  return (
    <div className="border border-gray-200">
      {fields && fields.length > 0 ? (
        <div className="relative divide-y">
          {fields.map((item: any, index: any) => (
            <div key={index} className="p-3 px-4">
              {watch(`test_results[${index}].test_type`) && (
                <span className="bg-violet-100 px-3 py-1 rounded-xl text-yellow-100 font-medium text-xs">
                  {watch(`test_results[${index}].test_type`)}
                </span>
              )}
              <div className="flex items-center gap-4 mt-0.5">
                <div className="flex-shrink-1 w-full">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={`test_results[${index}].type_of_test`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <div className="w-full">
                        <div className="text-sm text-dark-100 mb-1">Type of test</div>
                        <div>
                          <SearchFilter
                            placeHolder="Select Type of test"
                            options={profileTestTypeOptions}
                            selectedOptions={value ? [value] : null}
                            handleOption={(selectedValue: any) => {
                              onChange(selectedValue[0]);
                            }}
                            search={false}
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
                <div className="flex-shrink-1 w-full">
                  <Controller
                    control={control}
                    name={`test_results[${index}].kind`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <div className="w-full">
                        <div className="text-sm text-dark-100 mb-1">kind</div>
                        <div>
                          <SearchFilter
                            placeHolder="Select kind"
                            options={typeOfTestOptions}
                            search={false}
                            selectedOptions={value ? [value] : null}
                            handleOption={(_value: any, data: any) => {
                              onChange(_value[0]);
                            }}
                            multiple={false}
                            position="left"
                            disabled={typeOfTestOptions.length > 0 ? disabled : true}
                          />
                        </div>
                      </div>
                    )}
                  />
                </div>
                {watch(`test_results[${index}].test_type`) === "Attempts" && (
                  <div className="flex-shrink-1 w-full">
                    <ReactHookInput
                      label="Attempts No."
                      type="number"
                      name={`test_results[${index}].attempts_no`}
                      register={register}
                      className="py-1 rounded"
                      disabled={disabled}
                    />
                  </div>
                )}

                <div className="flex-shrink-1 w-full">
                  <label className="text-sm text-dark-100 mb-1">Date</label>
                  <DateTimePicker
                    name={`test_results[${index}].date`}
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`test_results[${index}].date`)}
                    disabled={disabled}
                  />
                </div>
                <div className="flex-shrink-0 mt-auto mb-1">
                  <Button variant="outline-primary" size="xs" onClick={() => onRemove(index)} disabled={disabled}>
                    Remove
                  </Button>
                </div>
              </div>
              <div className="w-[89%] flex gap-4 mt-2">
                {/* {watch(`test_results[${index}].test_type`) != "Diagnostic" && (
                  <div className="flex-shrink-1 w-full">
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name={`test_results[${index}].month`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className="w-full">
                          <div className="text-sm text-dark-100 mb-1">Month</div>
                          <div>
                            <SearchFilter
                              placeHolder="Select Month"
                              options={getAllMonths()}
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
                )}
                {watch(`test_results[${index}].test_type`) != "Diagnostic" && (
                  <div className="flex-shrink-1 w-full">
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name={`test_results[${index}].year`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className="w-full">
                          <div className="text-sm text-dark-100 mb-1">Year</div>
                          <div>
                            <SearchFilter
                              placeHolder="Select Year"
                              options={getCurrentYearPlusThree()}
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
                )} */}
                <div className="w-full">
                  <ReactHookNumberInput
                    id={`test_results[${index}].score.english`}
                    label="English Score"
                    type="number"
                    name={`test_results[${index}].score.english`}
                    className="py-1 rounded"
                    setValue={setValue}
                    value={getValues(`test_results[${index}].score.english`)}
                    min={0}
                    max={800}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookNumberInput
                    label="Maths Score"
                    type="number"
                    name={`test_results[${index}].score.math`}
                    className="py-1 rounded"
                    setValue={setValue}
                    value={getValues(`test_results[${index}].score.math`)}
                    min={0}
                    max={800}
                    disabled={disabled}
                  />
                </div>
                {watch(`test_results[${index}].type_of_test`) == "ACT" && (
                  <>
                    <div className="w-full">
                      <ReactHookInput
                        label="Reading Score"
                        type="number"
                        name={`test_results[${index}].score.reading`}
                        register={register}
                        className="py-1 rounded"
                        disabled={disabled}
                      />
                    </div>
                    <div className="w-full">
                      <ReactHookInput
                        label="Science Score"
                        type="number"
                        name={`test_results[${index}].score.science`}
                        register={register}
                        className="py-1 rounded"
                        disabled={disabled}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">No tests are available.</div>
      )}
      <div className="flex border-t border-gray-200 ">
        <div className="px-3 py-2">
          <Button
            variant="outline-primary"
            size="xs"
            onClick={() => append({ id: uuidV4(), test_type: "Diagnostic" })}
            disabled={disabled}
          >
            Add Diagnostic
          </Button>
        </div>
        <div className="px-3 py-2">
          <Button
            variant="outline-primary"
            size="xs"
            onClick={() => append({ id: uuidV4(), test_type: "Attempts" })}
            disabled={disabled}
          >
            Add Attempts
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TestDetails;
