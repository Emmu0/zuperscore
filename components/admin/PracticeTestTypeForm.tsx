import React, { useState } from "react";
// hero icon
import { SearchIcon, XIcon } from "@heroicons/react/solid";
// components
import MultiSelect from "@components/ui/Select/MultiSelect";
import DateTimePicker from "@components/ui/DateTimePicker";
//react hook form
import { Controller } from "react-hook-form";
// swr
import useSWR from "swr";
// api routes
import { PRACTICE_SETS, PRACTICE_SETS_WITH_ID } from "@constants/api-routes";
// services
import { APIFetcher } from "@lib/services";
// common
import { bindZero } from "@constants/common";

const PracticeTestTypeForm = ({
  register,
  control,
  watch,
  setValue,
  errors,
  practiceSetAssessments,
  setPracticeSetAssessments,
}: any) => {
  const registerValidationOptions = {
    practice_set: { required: "Assessment Set is required", message: "Assessment Set is required" },
  };

  const selectedSet = watch("practice_set");

  const { data: assessmentSetList, error: AssessmentSetListError } = useSWR(
    PRACTICE_SETS,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  const assessmentSetData = assessmentSetList?.map((assessmentSet: any) => ({
    key: assessmentSet.id,
    title: assessmentSet.name,
  }));

  const [setId, setSetId] = useState(practiceSetAssessments.practice_set_id || null);

  const { data: setData, error: setDataError } = useSWR(
    setId ? PRACTICE_SETS_WITH_ID(setId) : null,
    setId ? APIFetcher : null,
    {
      refreshInterval: 0,
    }
  );

  const removeSetPayload = (id: any) => {
    let setPayload = [...practiceSetAssessments].filter((set: any) => set?.practice_set_id !== id);
    setSetId(setPayload[setPayload.length - 1]?.practice_set_id);
    setPracticeSetAssessments(setPayload);
  };

  const removeSet = (setId: number) => {
    removeSetPayload(setId);
    setValue(
      "practice_set",
      selectedSet.filter((id: any) => id !== setId)
    );
  };

  const toggleAssessment = (set_id: number, assessment_id: number) => {
    const set = [...practiceSetAssessments].find((item) => item.practice_set_id === set_id);
    if (set) {
      const index = set.assessments.indexOf(assessment_id);
      if (index > -1) {
        set.assessments.splice(index, 1);
      } else {
        set.assessments.push(assessment_id);
      }
    }

    const payload = [...practiceSetAssessments];
    const grpIdx = payload.findIndex((set: any) => set.practice_set_id == set_id);
    if (grpIdx! > -1) {
      payload.splice(grpIdx, 1);
      payload.push(set);
    }

    setPracticeSetAssessments(payload);
  };

  const assessmentId: any = [];

  setData?.assessments.forEach((assessment: any) => {
    if (!assessmentId.includes(assessment.id)) {
      assessmentId.push(assessment.id);
    }
  });

  React.useEffect(() => {
    let setPayload = [...practiceSetAssessments];
    if (setData && !setPayload.some((set) => set?.practice_set_id == setData?.id)) {
      setPayload.push({
        practice_set_id: setData?.id,
        assessments: assessmentId,
      });
      setPracticeSetAssessments(setPayload);
    }
  }, [setData]);

  const showGroup = (setId: any) => {
    setSetId(setId);
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

  const assessmentSearchBar = setData && setData?.assessments && setData?.assessments?.length > 0;

  return (
    <div className="flex-col w-full space-y-5">
      <div className="flex gap-3">
        <div className="flex-col px-5 bg-white justify-start items-center w-1/3 mb-5 border-red-500">
          <Controller
            control={control}
            name="practice_set"
            rules={registerValidationOptions.practice_set}
            render={({ field: { onChange, value, ref } }) => (
              <div>
                <div className="text-sm text-dark-100 mb-1">Assessment Set</div>
                <MultiSelect
                  placeHolder="Select Set"
                  options={assessmentSetData}
                  selectedOptions={value || null}
                  handleOption={(_value: any, data: any) => {
                    onChange(_value);
                    setSetId(_value[_value.length - 1]);
                  }}
                  multiple={true}
                  error={errors?.groups?.message ? errors?.groups?.message : null}
                />
                {errors?.groups?.message && (
                  <div className="text-sm text-red-500 mt-2">{errors?.groups?.message}</div>
                )}
              </div>
            )}
          />
          <div className="text-sm text-dark-0 mt-2">
            {selectedSet?.length} Sets selected of {assessmentSetData?.length}
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
      <div className="flex flex-wrap gap-2 px-5 cursor-pointer">
        {selectedSet?.map((set: any, index: number) => (
          <div
            key={index}
            className="bg-[#FDEDF4] border-[#CC96AE] border-2 flex gap-3 text-sm rounded-sm items-center bg-opacity-70"
          >
            <div className="px-2 py-1" onClick={() => showGroup(set)}>
              {assessmentSetData.find((user: any) => user.key === set)?.title}
            </div>
            <div
              className="flex justify-center pr-2 items-center cursor-pointer"
              onClick={() => {
                removeSet(set);
              }}
            >
              <XIcon className="h-4 w-4 flex" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      {assessmentSearchBar ? (
        <>
          <div className="flex justify-between w-full bg-[#FBFBFD] items-center py-3 px-5">
            <div className="flex-col space-y-1">
              <div className="text-xl font-medium">{setData?.name}</div>
              <div className="font-normal text-[#08070899] w-80">
                {
                  practiceSetAssessments[
                    practiceSetAssessments.findIndex(
                      (set: any) => set.practice_set_id === setData.id
                    )
                  ]?.assessments.length
                }{" "}
                Assessments Selected
              </div>
            </div>
            {/* <div className="flex w-[350px] items-center justify-start rounded-sm border bg-white px-2 h-8 text-gray-500 mb-2">
              <SearchIcon className="flex-shrink-0 h-3 w-3" />
              <input
                placeholder="Search for the assessment"
                className="w-full bg-transparent py-1 px-2 text-sm focus:outline-none"
              />
            </div> */}
          </div>
          {setData && setData?.assessments && setData?.assessments?.length > 0 && (
            <div className="flex-col space-y-5 px-5 pb-5">
              {setData?.assessments?.map((assessment: any) => (
                <div key={assessment.id} className="flex items-center gap-4">
                  <input
                    id={`option-${assessment.id}`}
                    type="checkbox"
                    value={assessment.id}
                    {...register(`users.${assessment.id}`)}
                    checked={watch(`users.${assessment.id}`)}
                    defaultChecked={watch(`users.${assessment.id}`) ? false : true}
                    disabled={
                      practiceSetAssessments[
                        practiceSetAssessments.findIndex(
                          (set: any) => set.practice_set_id == setData.id
                        )
                      ]?.assessments?.length == 1 &&
                      practiceSetAssessments[
                        practiceSetAssessments.findIndex(
                          (set: any) => set.practice_set_id == setData.id
                        )
                      ]?.assessments[0] == assessment?.id
                    }
                    onClick={() => toggleAssessment(setData.id, assessment.id)}
                  />
                  <label htmlFor={`option-${assessment.id}`}>{assessment.name}</label>
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default PracticeTestTypeForm;
