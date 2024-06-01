//react
import React from "react";
//components
import ReactHookInput from "@components/forms/ReactHookInput";
import MultiSelect from "@components/ui/Select/MultiSelect";
//api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/api-routes";
//headless ui
import { Switch } from "@headlessui/react";
//hero icons
import { XIcon } from "@heroicons/react/solid";
//api services
import { APIFetcher } from "@lib/services";
//react hook form
import { Controller } from "react-hook-form";

const CreateSetForm = ({
  register,
  control,
  watch,
  errors,
  setValue,
  assessmentList,
  setData,
}: any) => {
  let selectedAssessment = watch("assessment");
  const [selectedSets, setSelectedSets] = React.useState<any>([]);

  const registerValidationOptions = {
    set_name: { required: "Set Name is required" },
    assessment: {
      required: "Please Select Atleast 1 Assessment",
      message: "Please Select 1 Assessment",
    },
  };
  const assessmentData = assessmentList?.assessments?.map((assessment: any) => ({
    key: assessment.id,
    title: assessment.name,
  }));

  const handleRemoveAssessment = (assessmentId: number) => {
    setValue(
      "assessment",
      selectedAssessment.filter((id: any) => id !== assessmentId)
    );
  };
  return (
    <>
      <div className="flex gap-7">
        <div className="w-1/3">
          {/* <div className="text-base text-dark-100 mb-3">Set Name</div> */}
          <ReactHookInput
            name="set_name"
            label="Set Name"
            placeholder="Enter Set Name"
            validations={registerValidationOptions.set_name}
            error={errors.set_name}
            register={register}
            className="border-3 border-gray-500"
          />
        </div>
        <div className="flex-col w-1/3">
          <div className="text-base text-dark-100 mb-3">Status</div>
          <div className="text-sm text-dark-0 mt-2">Set the status of the Set</div>
        </div>
        <div className="w-1/3 self-center">
          <Controller
            control={control}
            name="status"
            defaultValue={false}
            render={({ field }) => (
              <div>
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  className={`${
                    field.value ? "bg-[#721154]" : "bg-[#8B8B8B]"
                  } relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                >
                  <span
                    className={`${
                      field.value ? "translate-x-4" : "translate-x-0"
                    } inline-block w-3 h-3 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            )}
          />
        </div>
      </div>
      <div className="pt-4">
        <div className="text-base text-dark-100 mb-3">Select Assessment</div>
        {selectedAssessment && selectedAssessment.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedAssessment?.map((assessmentId: any) => (
              <div
                key={assessmentId}
                className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
              >
                <div className="pl-2 pr-1">
                  {assessmentData?.find((a: any) => a.key === assessmentId)?.title}
                </div>
                <div
                  className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                  onClick={() => handleRemoveAssessment(assessmentId)}
                >
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex justify-start items-center w-1/3">
          <Controller
            control={control}
            name="assessment"
            render={({ field: { onChange, value, ref } }) => (
              <div className="w-[326px]">
                <MultiSelect
                  placeHolder="Select assessments"
                  options={assessmentData}
                  selectedOptions={value || null}
                  handleOption={(_value: any, data: any) => {
                    onChange(_value);
                    APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                      .then((res) =>
                        setSelectedSets(
                          [...selectedSets].push({
                            id: res.id,
                            name: res.name,
                          })
                        )
                      )
                      .catch((e) => console.log("error", e));
                  }}
                  multiple={true}
                  error={errors?.assessment?.message ? errors?.assessment?.message : null}
                />
                {errors?.assessment?.message && (
                  <div className="text-sm text-red-500 mt-2">{errors?.assessment?.message}</div>
                )}
              </div>
            )}
            rules={registerValidationOptions.assessment}
          />
        </div>
      </div>
    </>
  );
};

export default CreateSetForm;
