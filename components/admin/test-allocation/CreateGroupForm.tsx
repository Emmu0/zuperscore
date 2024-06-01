//components
import ReactHookInput from "@components/forms/ReactHookInput";
import GroupUserSearch from "./GroupUserSearch";
import DateTimePicker from "@components/ui/DateTimePicker";
//headless ui
import { Switch } from "@headlessui/react";
//hero icons
import { XIcon } from "@heroicons/react/solid";
//react
import React from "react";
//react hook form
import { Controller } from "react-hook-form";
//swr
import useSWR from "swr";
//api routes
import { USER_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/api-routes";
//api services
import { APIFetcher } from "@lib/services";

const CreateGroupForm = ({
  register,
  control,
  watch,
  errors,
  setValue,
  groupData,
  getValues,
}: any) => {
  let selectedStudent = watch("students");
  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<any>(groupData?.users || []);

  const { data: users, error: usersError } = useSWR(
    debouncedQuery.length >= 3
      ? `${USER_ENDPOINT}?search=${debouncedQuery}`
      : `${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  const usersData = users?.results?.map((user: any) => ({
    key: user.id,
    title: `${user.first_name} ${user.last_name}`,
  }));
  const registerValidationOptions = {
    group_name: { required: "Group Name is required" },
    target_date: { required: "Target Date is required" },
    students: {
      required: "Please Select Atleast 1 Student",
      message: "Please Select 1 Student",
    },
  };

  const handleRemoveStudent = (studentId: number) => {
    setValue(
      "students",
      selectedStudent.filter((id: any) => id !== studentId)
    );
    const users = [...selectedUsers].filter((user: any) => user.id !== studentId);
    setSelectedUsers(users);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <div className="flex gap-7">
        <div className="w-1/3">
          <ReactHookInput
            name="group_name"
            label="Group Name"
            register={register}
            placeholder="Enter Group Name"
            validations={registerValidationOptions.group_name}
            error={errors.group_name}
            required={true}
            className="border-3 border-gray-500"
          />
        </div>
        <div className="w-1/3">
          <label className="text-sm text-dark-100 mb-1">Target Date</label>
          <DateTimePicker
            name="target_date"
            setValue={setValue}
            timePicker={false}
            value={getValues("target_date")}
          />
        </div>
        <div className="flex-col w-1/3">
          <div className="text-base text-dark-100 mb-3">Status</div>
          <div className="text-sm text-dark-0 mt-2">Set the status of the group</div>
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
        <div className="text-base text-dark-100 mb-3">Select Students</div>
        {selectedUsers && selectedUsers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedUsers?.map((user: any) => (
              <div
                key={user.id}
                className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
              >
                <div className="pl-2 pr-1">{user.name}</div>
                <div
                  className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                  onClick={() => handleRemoveStudent(user.id)}
                >
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex justify-start items-center">
          <Controller
            control={control}
            name="students"
            render={({ field: { onChange, value, ref } }) => (
              <div className="w-[326px]">
                <GroupUserSearch
                  placeHolder="Select users"
                  options={usersData}
                  selectedOptions={value || null}
                  handleOption={(_value: any, data: any, title: string) => {
                    onChange(_value, title);

                    APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                      .then((res) => {
                        const users = [...selectedUsers];
                        users.push({
                          id: res.id,
                          name: `${res.first_name} ${res.last_name}`,
                        });
                        setSelectedUsers(users);
                      })
                      .catch((e) => console.log("error", e));
                  }}
                  multiple={true}
                  query={query}
                  setQuery={setQuery}
                  error={errors?.students?.message ? errors?.students?.message : null}
                />
                {errors?.students?.message && (
                  <div className="text-sm text-red-500 mt-2">{errors?.students?.message}</div>
                )}
              </div>
            )}
            rules={registerValidationOptions.students}
          />
        </div>
      </div>
    </>
  );
};

export default CreateGroupForm;
