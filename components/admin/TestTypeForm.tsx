//react imports
import React from "react";
//components
import PracticeTestTypeForm from "./PracticeTestTypeForm";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";
import MultiSelect from "@components/ui/Select/MultiSelect";
import DateTimePicker from "@components/ui/DateTimePicker";
// swr
import useSWR from "swr";
// services
import { APIFetcher } from "@lib/services";
// api routes
import { ASSESSMENT_ENDPOINT } from "@constants/api-routes";
// common
import { bindZero } from "@constants/common";
// react hook form
import { Controller } from "react-hook-form";
// icons
import { XIcon } from "@heroicons/react/solid";

const assessmentTypeOptions = [
  {
    key: "MOCK",
    title: "Mock",
  },
  {
    key: "MICRO",
    title: "Micro",
  },
  {
    key: "PRACTICE_SHEET",
    title: "Practice",
  },
  {
    key: "SECTIONAL",
    title: "Sectional",
  },
];
const TestTypeForm = ({
  register,
  control,
  watch,
  setValue,
  errors,
  errorMessage,
  practiceSetAssessments,
  setPracticeSetAssessments,
  practiceSetPayload,
  setPracticeSetPayload,
}: any) => {

  // assessment type swr
  const { data: assessments, error: assessmentsError } = useSWR(
    [
      watch("kind") && watch("kind") !== "Practice"
        ? `${ASSESSMENT_ENDPOINT}?kind=${watch("kind")?.toUpperCase()}`
        : null,
      `ASSESSMENT_FILTER_${watch("kind")}`,
    ],
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  const registerValidationOptions = {
    kind: { required: "Test Type is required", message: "Test Type is required" },
    assessment_id: {
      required: "Please Select Atleast 1 Assessment",
      message: "Please Select 1 Assessment",
    },
  };
  let selectedAssessments = watch("assessment_id");
  const assessmentList = assessments?.assessments;
  const assessmentData = assessmentList?.map((assessment: any) => ({
    key: assessment.id,
    title: assessment.name,
  }));
  const renderAssessment = (assessments: any) => {
    let options: any = [];
    if (assessments && assessments.assessments && assessments.assessments.length > 0) {
      options = [
        ...options,
        ...assessments.assessments.map((data: any) => ({
          key: data.id,
          title: data.name,
        })),
      ];
    }
    return options;
  };

  const renderScheduleMinTime = (date: any) => {
    let dateTimeLocalValue: any = new Date();
    dateTimeLocalValue = `${dateTimeLocalValue.getFullYear()}-${bindZero(
      dateTimeLocalValue.getMonth() + 1
    )}-${dateTimeLocalValue.getDate()}T${bindZero(dateTimeLocalValue.getHours())}:${bindZero(
      dateTimeLocalValue.getMinutes()
    )}`;
    return dateTimeLocalValue;
  };

  const handleRemoveAssessment = (assessmentId: number) => {
    setValue(
      "assessment_id",
      selectedAssessments.filter((id: any) => id !== assessmentId)
    );
  };

  React.useEffect(() => {
    setValue("assessment_id", []);
  }, [watch("kind")]);

  return (
    <div className="flex-col space-y-3 bg-white">
      <div className="text-sm text-dark-100 px-5 pt-5">Selection of test type</div>
      <div className="flex gap-2 px-5">
        {assessmentTypeOptions.map((kind) => (
          <div key={kind.key} className="border flex justify-between items-center p-2 w-1/4">
            <span>{kind.title}</span>
            <input
              type="radio"
              name="kind"
              {...register("kind")}
              value={kind.key}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
      {watch("kind") === "PRACTICE_SHEET" ? (
        <div className="pt-5">
          <PracticeTestTypeForm
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
            practiceSetAssessments={practiceSetPayload}
            setPracticeSetAssessments={(set_payload: any) => setPracticeSetPayload(set_payload)}
          />
        </div>
      ) : (
        <div className="flex gap-5 py-5 px-5">
          <div className="flex-col gap-2 w-1/4">
            {/* <ReactHookSelect
              name="assessment_id"
              placeHolder="Select Assessment"
              label="Select Assessment"
              required={true}
              control={control}
              position="left"
              searchFilteredOptions={renderAssessment(assessments)}
              disabled={
                renderAssessment(assessments) && renderAssessment(assessments).length > 1
                  ? false
                  : true
              }
            /> */}
            <Controller
              control={control}
              name="assessment_id"
              render={({ field: { onChange, value, ref } }) => (
                <div>
                  <div className="text-sm text-dark-100 mb-1">Assessments</div>
                  <MultiSelect
                    placeHolder="Select Assessments"
                    options={renderAssessment(assessments)}
                    selectedOptions={value || null}
                    handleOption={(_value: any, data: any) => {
                      onChange(_value);
                    }}
                    multiple={true}
                    error={errors?.assessment_id?.message ? errors?.assessment_id?.message : null}
                    disabled={
                      renderAssessment(assessments) && renderAssessment(assessments).length > 1
                        ? false
                        : true
                    }
                  />
                  {errors?.assessment_id?.message && (
                    <div className="text-sm text-red-500 mt-2">
                      {errors?.assessment_id?.message}
                    </div>
                  )}
                </div>
              )}
              rules={registerValidationOptions.assessment_id}
            />
            <div className="flex gap-4 pt-5">
              {selectedAssessments?.map((assessmentId: any, index: number) => (
                <div
                  key={assessmentId}
                  className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <div className="px-2 ">
                    {
                      assessmentData?.find((assessment: any) => assessment.key === assessmentId)
                        ?.title
                    }
                  </div>
                  <div
                    className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                    onClick={() => {
                      handleRemoveAssessment(assessmentId);
                    }}
                  >
                    <XIcon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-col gap-2 w-[200px]">
            <label className="text-sm text-dark-100 mb-1">Schedule Date</label>
            <DateTimePicker
              name="schedule_at"
              setValue={setValue}
              timePicker={true}
              minDate={renderScheduleMinTime(new Date())}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestTypeForm;
