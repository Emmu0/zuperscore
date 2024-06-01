import React from "react";
// headless ui
import { Switch } from "@headlessui/react";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import ReactHookTextarea from "@components/forms/ReactHookTextarea";
import Editor from "@components/lexical/Editor";
import Select from "@components/ui/Select";

interface ISectionForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
}

const groupingOptions = [
  { key: "reading_and_writing", title: "Reading and Writing" },
  { key: "math", title: "Math" },
];

const SectionForm: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  errors,
}) => {
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

      <div>
        <div className="text-sm text-dark-100 mb-2">Group By</div>
        <Select
          placeHolder="Select section grouping"
          options={groupingOptions}
          selectedOptions={watch("group_by") ? [watch("group_by")] : null}
          handleOption={(_value: any, data: any) => {
            setValue("group_by", _value[0]);
          }}
          multiple={false}
        />
      </div>

      <div>
        <div className="text-sm text-dark-100 mb-2">Section Timers</div>
        <Switch
          checked={watch("is_timed")}
          onChange={() => setValue("is_timed", !watch("is_timed"))}
          style={{
            backgroundColor: watch("is_timed") ? "#721154" : "#8B8B8B",
          }}
          className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              watch("is_timed") ? "translate-x-4" : "translate-x-0"
            } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-full">
          <ReactHookInput
            label="Section time"
            type="number"
            name="time_limit"
            register={register}
            validations={validations.time_limit}
            error={errors.time_limit}
          />
        </div>
        <div className="w-full">
          <ReactHookInput
            label="Break time"
            type="number"
            name="break_time"
            register={register}
            validations={validations.break_time}
            error={errors.break_time}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
