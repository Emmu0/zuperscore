import React from "react";
// components
import Button from "@components/buttons";
import Select from "@components/ui/Select";
import FolderSearch from "./FolderSearch";

interface IDynamicSectionForm {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  fields: any;
  handleSwitchingRoute: any;
  subjectsList: any;
}

let operatorOptions = [{ key: "between", title: "Between" }];

const DynamicSectionForm: React.FC<IDynamicSectionForm> = ({
  register,
  errors,
  watch,
  setValue,
  fields,
  handleSwitchingRoute,
  subjectsList,
}) => {
  const [currentSwitch, setCurrentSwitch] = React.useState<any>(null);
  const handleCurrentSwitch = (data: any) => {
    if (currentSwitch?.type == "field") {
      let updatedSwitches = watch("switching_route").map((_item: any, _idx: any) => {
        if (currentSwitch?.index == _idx)
          return {
            ..._item,
            folder_id: data?.id,
            folder_detail: { id: data?.id, title: data?.title, kind: data?.kind },
          };
        else return { ..._item };
      });
      setValue("switching_route", updatedSwitches);
    } else {
      setValue("default_folder_id", data?.id);
      setValue("default_folder_detail", { id: data?.id, title: data?.title, kind: data?.kind });
    }
    setTimeout(() => {
      setCurrentSwitch(null);
    }, 500);
  };
  return (
    <>
      <div className="space-y-4">
        {fields &&
          fields.length > 0 &&
          fields.map((_routeField: any, index: any) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex items-center gap-1 whitespace-nowrap mt-1">
                If <div className="font-medium">Score</div> is
              </div>
              <div className="w-full">
                <input
                  type="text"
                  // value={_routeField?.min}
                  onChange={(e) => handleSwitchingRoute("edit", index, "min", e.target.value)}
                  className={`w-full rounded border  px-3 py-1.5 outline-none ${
                    errors?.switching_route?.[index]?.min
                      ? "bg-red-100 border-red-500"
                      : "bg-white border-[#E2E2E2]"
                  }`}
                  placeholder="Minimum score"
                  {...register(`switching_route.${index}.min`, {
                    required: "This field is required",
                    validate: (value: any) => {
                      if (
                        index > 0 &&
                        parseInt(value) <= parseInt(watch(`switching_route.${index - 1}.max`))
                      ) {
                        return "Minimum score should be greater than previous maximum score";
                      }
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />

                {errors?.switching_route?.[index]?.min && (
                  <div className="text-red-500 text-xs">
                    {errors?.switching_route?.[index]?.min?.message}
                  </div>
                )}
              </div>
              <div className="w-full flex items-center gap-3">
                <div className="w-full">
                  <Select
                    placeHolder="Select operator"
                    options={operatorOptions}
                    selectedOptions={_routeField?.operator != null ? [_routeField?.operator] : null}
                    handleOption={(_value: any, data: any) => {
                      handleSwitchingRoute("edit", index, "operator", _value[0]);
                    }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  onChange={(e) => handleSwitchingRoute("edit", index, "max", e.target.value)}
                  className={`w-full rounded border px-3 py-1.5 outline-none ${
                    errors?.switching_route?.[index]?.max
                      ? "bg-red-100 border-red-500"
                      : "bg-white border-[#E2E2E2]"
                  }`}
                  placeholder="Maximum score"
                  {...register(`switching_route.${index}.max`, {
                    required: "This field is required",
                    validate: (value: any) => {
                      if (
                        index >= 0 &&
                        parseInt(value) < parseInt(watch(`switching_route.${index}.min`))
                      ) {
                        return "Maximum score should be greater than or equal to current minimum score";
                      }
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />

                {errors?.switching_route?.[index]?.max && (
                  <div className="text-red-500 text-xs">
                    {errors?.switching_route?.[index]?.max?.message}
                  </div>
                )}
              </div>
              <div className="mt-1 flex-shrink-0">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setCurrentSwitch({ type: "field", index: index })}
                >
                  {_routeField?.folder_id
                    ? `(${_routeField?.folder_id}) - Change Folder`
                    : "Select Folder"}
                </Button>
              </div>
              <div className="mt-1 flex-shrink-0">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleSwitchingRoute("delete", index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

        <div className="flex items-center gap-3">
          <div className="whitespace-nowrap">
            <div className="text-sm font-medium">Default subject topic</div>
            <div className="w-full text-xs text-dark-100">(If any score validation misses)</div>
          </div>
          <div className="w-full">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setCurrentSwitch({ type: "default_folder_id" })}
            >
              {watch("default_folder_id")
                ? `(${watch("default_folder_id")}) - Change Folder`
                : "Select Folder"}
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <Button size="sm" variant="secondary" onClick={() => handleSwitchingRoute("create")}>
            Add New validation
          </Button>
        </div>
      </div>

      {currentSwitch && (
        <FolderSearch
          subjectsList={subjectsList}
          currentSwitch={currentSwitch}
          handleCurrentSwitch={handleCurrentSwitch}
        />
      )}
    </>
  );
};

export default DynamicSectionForm;
