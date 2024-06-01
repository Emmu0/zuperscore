import React from "react";
// react hook form
import { Controller } from "react-hook-form";
// next import
import { useRouter } from "next/router";
// headless ui
import { Switch } from "@headlessui/react";
// components
import Button from "@components/buttons";
import SearchDropDown from "@components/ui/SearchDropDown/SearchDropDown";
import QuestionsTagsFilter from "./TagsFilter";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";
import { useForm } from "react-hook-form";

interface ISearchFilterRoot {
  query: any;
  handleSearchQuery?: any;
  users?: any;
  student: boolean;
  mutateUrl?: string;
}

type Inputs = {
  assessment: string;
  difficulty: null | 1 | 2 | 3 | 4 | 5;
  time_taken: null | "0_30" | "30_60" | "60_10000" | "all";
  reason_for_error_error_type: null | string;
  analyzed: boolean;
  subject: null;
  domain: null;
  topic: null;
  sub_topic: null;
  user?: null;
};

let defaultFilterInputs: Inputs = {
  assessment: "last_five",
  time_taken: null,
  difficulty: null,
  reason_for_error_error_type: null,
  analyzed: false,
  subject: null,
  domain: null,
  topic: null,
  sub_topic: null,
  user: null,
};

const SearchFilterRoot: React.FC<ISearchFilterRoot> = ({
  query,
  handleSearchQuery,
  users,
  student,
  mutateUrl,
}) => {
  let assessmentOptions = [
    { key: "last_five", title: "Last five mock tests" },
    { key: "all", title: "All mock tests" },
  ];

  let difficultyOptions = [
    { key: null, title: "None", data: {} },
    { key: "1", title: "1" },
    { key: "2", title: "2" },
    { key: "3", title: "3" },
    { key: "4", title: "4" },
    { key: "5", title: "5" },
  ];

  let timeOptions = [
    { key: null, title: "None" },
    { key: "0_30", title: "0-30 Seconds" },
    { key: "30_60", title: "30-60 Seconds" },
    { key: "60", title: "More than 60 seconds" },
  ];

  let reasonErrorTypeReadingAndWritingOptions = [
    { key: null, title: "None" },
    { key: "clicking_error", title: "Clicking error" },
    { key: "not_read_all_options", title: "Did not read all options" },
    { key: "not_follow_correct_steps", title: "Did not follow the correct steps " },
    { key: "did_not_identify_question_type", title: "Didn't identify the question type " },
    { key: "could_not_choose_between_two_options", title: "Couldn't choose between two options " },
    { key: "did_not_notice_a_trap", title: "Didn't notice a trap " },
    {
      key: "not_read_all_keywords_of_the_question",
      title: "Did not read all keywords of the question",
    },
  ];

  let reasonErrorTypeMathOptions = [
    { key: null, title: "None" },
    { key: "conceptual_error", title: "Conceptual error " },
    { key: "calculation_error", title: "Calculation error " },
    { key: "reading_error", title: "Reading error" },
    { key: "graph_based_error", title: "Graph based error" },
  ];

  const renderErrorTypeFilter = () => {
    let returnOptions: any = [{ key: "all", title: "None" }];

    if (watch("subject"))
      if (watch("subject") == 2) returnOptions = reasonErrorTypeReadingAndWritingOptions;
      else returnOptions = reasonErrorTypeMathOptions;

    return returnOptions;
  };

  const router = useRouter();

  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultFilterInputs } });

  const handleSearch = (formData: any) => {
    // handling the Url
    let queryStringArray = [];
    !student && formData.user ? queryStringArray.push(`user=${formData?.user}`) : ``;
    formData?.assessment ? queryStringArray.push(`assessment=${formData?.assessment}`) : ``;
    formData?.time_taken ? queryStringArray.push(`time=${formData?.time_taken}`) : ``;
    formData?.analyzed ? queryStringArray.push(`analyzed=${formData?.analyzed}`) : ``;
    formData?.difficulty ? queryStringArray.push(`difficulty=${formData?.difficulty}`) : ``;
    formData?.analyzed && formData?.reason_for_error_error_type
      ? queryStringArray.push(`error_type=${formData?.reason_for_error_error_type}`)
      : ``;
    formData?.subject ? queryStringArray.push(`subject=${formData?.subject}`) : ``;
    formData?.domain ? queryStringArray.push(`domain=${formData?.domain}`) : ``;
    formData?.topic ? queryStringArray.push(`topic=${formData?.topic}`) : ``;
    formData?.sub_topic ? queryStringArray.push(`sub_topic=${formData?.sub_topic}`) : ``;

    if (
      !student
        ? formData?.user
        : true &&
          formData?.assessment &&
          formData?.subject &&
          queryStringArray &&
          queryStringArray.length > 0
    ) {
      let queryString: any = queryStringArray.toString();
      queryString = queryString.replace(/,/g, "&");
      handleSearchQuery({
        data: { ...formData },
        route: `?${queryString.length > 2 ? queryString : null}`,
        url: `&${queryString.length > 2 ? queryString : null}`,
      });
      student
        ? router.replace(
            `/user/mistake-analysis${queryString.length > 2 ? `?${queryString}` : ``}`,
            undefined,
            { shallow: true }
          )
        : router.replace(
            `/user-performance/mistake-analysis${queryString.length > 2 ? `?${queryString}` : ``}`,
            undefined,
            { shallow: true }
          );
    } else {
      handleAlert(
        "warning",
        "Empty Search Filter",
        "Please select any fields to continue searching."
      );
    }
  };
  const handleClear = () => {
    reset({ ...defaultFilterInputs });
    handleSearchQuery({
      data: { ...defaultFilterInputs },
      route: `?assessment=last_five`,
      url: `?assessment=last_five`,
    });
    student
      ? router.replace(`/user/mistake-analysis?assessment=last_five`, undefined, { shallow: true })
      : router.replace(`/user-performance/mistake-analysis`, undefined, { shallow: true });
  };

  const renderUserFilterOptions = () => {
    let returnOptions: any = [{ key: null, title: "None" }];

    let tagsFilter: any = users && users.length > 0 ? users : null;

    if (tagsFilter && tagsFilter.length > 0) {
      let tags = tagsFilter.map((_item: any) => {
        return {
          key: _item?.id,
          title: `${_item.email} (${_item?.first_name} ${_item?.last_name})`,
        };
      });
      returnOptions = [...returnOptions, ...tags];
    }

    return returnOptions;
  };

  return (
    <div className="border border-gray-200 rounded-sm p-3 w-full space-y-3">
      <div className="text-lg">Search filters for Review Mistakes</div>
      <div className="flex gap-4">
        {!student && (
          <div className="w-full">
            <Controller
              control={control}
              rules={{ required: true }}
              name="user"
              render={({ field: { value, onChange } }) => (
                <SearchDropDown
                  label="User"
                  required={true}
                  placeHolder="Select User"
                  options={renderUserFilterOptions()}
                  value={value}
                  name="user"
                  currentValue={value}
                  handleValue={(value: any) => {
                    onChange(value?.key);
                  }}
                  mutateUrl={mutateUrl}
                />
              )}
            />
          </div>
        )}
        {/* Assessment */}
        <div className="w-full">
          <ReactHookSelect
            name="assessment"
            placeHolder="Select Assessment"
            label="Select Assessment"
            required={true}
            control={control}
            errors={errors}
            searchFilteredOptions={assessmentOptions}
          />
        </div>
        <div className="w-full">
          <QuestionsTagsFilter control={control} errors={errors} subject={true} watch={watch} />
        </div>
      </div>

      <div className="flex gap-4">
        {/* Difficulty */}
        <div className="w-full">
          <ReactHookSelect
            name="difficulty"
            placeHolder="Select Difficulty"
            label="Select Difficulty"
            control={control}
            errors={errors}
            searchFilteredOptions={difficultyOptions}
          />
        </div>

        {/* Time Taken */}
        <div className="w-full">
          <ReactHookSelect
            name="time_taken"
            placeHolder="Select Time"
            label="Select Time"
            control={control}
            errors={errors}
            searchFilteredOptions={timeOptions}
          />
        </div>
      </div>

      <div className="w-full">
        <QuestionsTagsFilter control={control} errors={errors} watch={watch} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          {/* Analyzed Questions */}
          <div className="w-full">
            <div className="text-sm text-dark-100 mb-1">Include only analyzed questions</div>
            <div className="relative">
              <Switch
                checked={watch("analyzed")}
                onChange={() => setValue("analyzed", !watch("analyzed"))}
                style={{
                  backgroundColor: watch("analyzed") ? "#721154" : "#8B8B8B",
                }}
                className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    watch("analyzed") ? "translate-x-4" : "translate-x-0"
                  } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>

          {/* Reason for error type */}
          <div className="w-full">
            <ReactHookSelect
              name="reason_for_error_error_type"
              placeHolder="Select Error Type"
              label="Select Reason for error"
              control={control}
              errors={errors}
              searchFilteredOptions={renderErrorTypeFilter()}
              disabled={watch("subject") == null ? true : watch("analyzed") ? false : true}
            />
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex justify-end items-center gap-4">
        <div>
          <Button size={"xs"} onClick={handleSubmit(handleSearch)}>
            Search
          </Button>
        </div>
        <div>
          <Button variant="secondary" size={"xs"} onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterRoot;
