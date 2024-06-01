import React from "react";
// // react hook form
import { Controller } from "react-hook-form";
// components
import Button from "@components/buttons";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";
import SearchDropDown from "@components/ui/SearchDropDown/SearchDropDown";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const StrengthAnalyticsFilter = ({
  users,
  subjects,
  errors,
  control,
  generateFilters,
  clearFilters,
  mutateUrl,
}: any) => {
  let assessmentOptions = [
    { key: null, title: "None" },
    { key: "last_five", title: "Last five mock tests" },
    { key: "all", title: "All mock tests" },
  ];

  const outputOptions = [
    { key: null, title: "None" },
    { key: "topic", title: "Topic" },
    { key: "difficulty", title: "Difficulty" },
    { key: "time_taken", title: "Time Taken" },
  ];

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

  const renderSubjectFilterOptions = () => {
    let returnOptions: any = [{ key: null, title: "None" }];

    let tagsFilter: any = subjects && subjects.length > 0 ? subjects : null;

    if (tagsFilter && tagsFilter.length > 0) {
      let tags = tagsFilter.map((_item: any) => {
        return { key: _item?.id, title: _item?.name };
      });
      returnOptions = [...returnOptions, ...tags];
    }

    return returnOptions;
  };
  const getRole = () => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user && userToken?.user?.role) {
      let role = userToken?.user?.role;
      return role;
    }
  };
  return (
    <div className="border border-gray-200 rounded-sm p-3 w-full space-y-3">
      <div
        className={`grid gap-3 ${
          getRole() !== "user" && getRole() !== "typist" ? `grid-cols-4` : `grid-cols-3`
        }`}
      >
        {getRole() !== "user" && getRole() !== "typist" && (
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
        )}

        <div>
          <ReactHookSelect
            name="strategy"
            placeHolder="Select Assessment"
            label="Mocks"
            control={control}
            errors={errors}
            searchFilteredOptions={assessmentOptions}
          />
        </div>

        {subjects && subjects.length > 0 && (
          <div>
            <ReactHookSelect
              name="subject"
              placeHolder="Select Subject"
              label="Subject"
              control={control}
              errors={errors}
              searchFilteredOptions={renderSubjectFilterOptions()}
            />
          </div>
        )}

        <div>
          <ReactHookSelect
            name="output"
            placeHolder="Select output"
            label="Output"
            control={control}
            errors={errors}
            searchFilteredOptions={outputOptions}
          />
        </div>

        <div className="col-span-3 flex gap-3 items-center">
          <Button variant="primary" size={"xs"} onClick={generateFilters}>
            Generate Analytics
          </Button>
          <Button variant="secondary" size={"xs"} onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StrengthAnalyticsFilter;
