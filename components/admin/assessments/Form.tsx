import React, { useEffect, useState } from "react";
// react hook form
import { Controller } from "react-hook-form";
// swr
import useSWR from "swr";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { ASSESSMENT_TAGS, TAG_DOMAIN_WITH_SUBJECT_ENDPOINT, TAG_SUBJECT_WITH_EXAM_ENDPOINT, TAG_TOPIC_WITH_DOMAIN_ENDPOINT } from "@constants/api-routes";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import ReactHookTextarea from "@components/forms/ReactHookTextarea";
import Select from "@components/ui/Select";
import Editor from "@components/lexical/Editor";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";
import MultiSelect from "@components/ui/Select/MultiSelect";
// headless-ui imports
import { Switch } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";

interface IAssessmentForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
  control: any;
}

const kindOptions = [
  { key: "MOCK", title: "Mock" },
  { key: "SECTIONAL", title: "Sectional" },
  { key: "MICRO", title: "Micro" },
  { key: "PRACTICE_SHEET", title: "Practice Sheet" },
  { key: "DIAGNOSTIC", title: "Diagnostic" },
];

const AssessmentForm: React.FC<IAssessmentForm> = ({
  register,
  setValue,
  watch,
  validations,
  errors,
  control,
}) => {
  const [filterOptions, setFilterOptions] = useState<any>({
    subjectFilter: null,
    domainFilter: null,
    topicFilter: null,
  });
  // subject swr
  const { data: subjectList, error: subjectListError } = useSWR(
    (watch("kind") === "MICRO") || (watch("kind") === "SECTIONAL") || (watch("kind") === "PRACTICE_SHEET") ? [TAG_SUBJECT_WITH_EXAM_ENDPOINT(1), `tag-subject-${1}`] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  // domain swr
  const { data: domainList, error: domainListError } = useSWR(
    watch("subject") && (watch("kind") === "PRACTICE_SHEET")
      ? [TAG_DOMAIN_WITH_SUBJECT_ENDPOINT(watch("subject")), `tag-subject-${watch("subject")}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // topic swr
  const { data: topicList, error: topicListError } = useSWR(
    watch("domain")
      ? [TAG_TOPIC_WITH_DOMAIN_ENDPOINT(watch("domain")), `tag-subject-${watch("domain")}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // assessment tags swr
  const { data: assessmentTags, error: assessmentTagsListError } = useSWR(
    ASSESSMENT_TAGS,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const assessmentTagsList = assessmentTags && assessmentTags.length > 0
    ? assessmentTags.map((item: any) => {
      return { key: item.id, title: item.name };
    })
    : [];

  useEffect(() => {
    if (subjectList || domainList || topicList) {
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          subjectFilter:
            subjectList && subjectList.length > 0
              ? subjectList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
          domainFilter:
            domainList && domainList.length > 0
              ? domainList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
          topicFilter:
            topicList && topicList.length > 0
              ? topicList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
        };
      });
    }
  }, [subjectList, domainList, topicList]);

  const renderFilterOptions = (filterType: string) => {
    let options = [{ key: null, title: "None" }];

    if (filterOptions && filterOptions?.[filterType] && filterOptions?.[filterType].length > 0)
      options = [...options, ...filterOptions?.[filterType]];

    return options;
  };

  const removeGroup = (groupId: number) => {
    setValue(
      "assessment_tags",
      watch("assessment_tags").filter((id: any) => id !== groupId)
    );
  };
  useEffect(() => {
    if (watch("kind") === "MOCK" || watch("kind") === "DIAGNOSTIC") {
      setValue("subject", null); setValue("domain", null); setValue("topic", null);
    }
    else if (watch("kind") === "MICRO" || watch("kind") === "SECTIONAL") {
      setValue("domain", null); setValue("topic", null);
    }
  }, [watch("kind")])

  return (
    <div className="space-y-4">
      <div>
        <ReactHookInput
          label="Name"
          type="text"
          name="name"
          register={register}
          validations={validations.name}
          error={errors.name}
          required={true}
        />
      </div>

      <div>
        <ReactHookTextarea
          label="Description"
          type="text"
          name="description"
          rows="5"
          register={register}
          validations={validations.description}
          error={errors.description}
          required={true}
        />
      </div>

      <div>
        <div className="text-sm text-dark-100 mb-2">
          Kind
          <span className="text-red-600 ml-1">*</span>
        </div>

        <Controller
          control={control}
          rules={validations.kind}
          name="kind"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div>
              <Select
                placeHolder="Select assessment kind"
                options={kindOptions}
                selectedOptions={value ? [value] : null}
                handleOption={(_value: any, data: any) => {
                  onChange(_value[0]);
                }}
                multiple={false}
                error={errors?.kind?.message ? errors?.kind?.message : null}
              />
              {errors?.kind?.message && (
                <div className="text-sm text-red-500 mt-2">{errors?.kind?.message}</div>
              )}
            </div>
          )}
        />
      </div>

      <div>
        <div className="text-sm text-dark-100 mb-2">Instructions</div>
        <Editor
          id={`assessment-instructions`}
          data={
            watch && watch("instructions") && watch("instructions") !== null
              ? watch("instructions")
              : null
          }
          onChange={(data: any) => setValue("instructions", data)}
        />
      </div>
      <div className={`grid grid-cols-3 gap-4`}>
        {watch("kind") !== "MOCK" && watch("kind") !== "DIAGNOSTIC" ?
          <>
            <div className="w-full">
              <ReactHookSelect
                name="subject"
                placeHolder="Select Subject"
                label="Select Subject"
                control={control}
                disabled={renderFilterOptions("subjectFilter").length > 1 ? false : true}
                searchFilteredOptions={renderFilterOptions("subjectFilter")}
              />
            </div>
            {watch("kind") !== "SECTIONAL" && watch("kind") !== "MICRO" ?
              <>
                <div className="w-full">
                  <ReactHookSelect
                    name="domain"
                    placeHolder="Select Domain"
                    label="Domain"
                    control={control}
                    disabled={renderFilterOptions("domainFilter").length > 1 ? false : true}
                    searchFilteredOptions={renderFilterOptions("domainFilter")}
                    watch={watch}
                  />
                </div>
                <div className="w-full">
                  <ReactHookSelect
                    name="topic"
                    placeHolder="Select Topic"
                    label="Topic"
                    control={control}
                    errors={errors}
                    disabled={renderFilterOptions("topicFilter").length > 1 ? false : true}
                    searchFilteredOptions={renderFilterOptions("topicFilter")}
                    watch={watch}
                  />
                </div>
              </> : null}
          </> : null}
      </div>
      <div className={`grid grid-cols-2 gap-4`}>
        <div className="w-full" >
          <div className="text-sm text-dark-100 mb-1">Extended</div>
          <div className="relative">
            <Switch
              checked={watch("is_extended")}
              onChange={() => setValue("is_extended", !watch("is_extended"))}
              style={{
                backgroundColor: watch("is_extended") ? "#721154" : "#8B8B8B",
              }}
              className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${watch("is_extended") ? "translate-x-4" : "translate-x-0"
                  } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div >
        <div className="w-full" >
          <div className="text-sm text-dark-100 mb-1">Tutor Test</div>
          <div className="relative">
            <Switch
              checked={watch("is_tutor_test")}
              onChange={() => setValue("is_tutor_test", !watch("is_tutor_test"))}
              style={{
                backgroundColor: watch("is_tutor_test") ? "#721154" : "#8B8B8B",
              }}
              className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${watch("is_tutor_test") ? "translate-x-4" : "translate-x-0"
                  } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div >
      </div>
      {assessmentTagsList && assessmentTagsList.length > 0 ?
        <div >
          <Controller
            control={control}
            name="assessment_tags"
            rules={{ required: "This field is required." }}
            render={({ field: { onChange, value, ref } }) => (
              <div>
                <div className="text-sm text-dark-100 mb-1">Tags</div>
                <div className="flex flex-wrap gap-4 py-2">
                  {watch("assessment_tags")?.map((group: any, index: number) => (
                    <div
                      key={index}
                      className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                    >
                      <div className="pl-2 pr-1">
                        {assessmentTagsList.find((user: any) => user.key === group)?.title}
                      </div>
                      <div
                        className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                        onClick={() => removeGroup(group)}
                      >
                        <XIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
                <MultiSelect
                  placeHolder="Select tag"
                  options={assessmentTagsList}
                  selectedOptions={value || null}
                  handleOption={(_value: any, data: any) => {
                    onChange(_value);
                  }}
                  multiple={true}
                />
              </div>
            )}
          />
        </div>
        : null}
    </div>
  );
};

export default AssessmentForm;
