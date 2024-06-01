//react
import React, { useState } from "react";
//react hook form
import { Controller } from "react-hook-form";
//components
import MultiSelect from "@components/ui/Select/MultiSelect";
//hero icons
import { XIcon } from "@heroicons/react/solid";
//swr
import useSWR from "swr";
//api services
import { APIFetcher } from "@lib/services";
//api routes
import { STUDENT_GROUPS, STUDENT_GROUPS_WITH_ID } from "@constants/api-routes";

const StudentGroupForm = ({
  register,
  control,
  watch,
  setValue,
  errors,
  groupUsers,
  setGroupUsers,
}: any) => {
  const [groupId, setGroupId] = useState(null);

  const registerValidationOptions = {
    groups: { required: "Group is required", message: "Group is required" },
  };

  const selectedGroups = watch("groups");

  const { data: studentGroupList, error: studentGroupListError } = useSWR(
    STUDENT_GROUPS,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const studentGroupData = studentGroupList?.map((studentGroup: any) => ({
    key: studentGroup.id,
    title: studentGroup.name,
  }));

  const { data: groupData, error: groupDataError } = useSWR(
    groupId ? STUDENT_GROUPS_WITH_ID(groupId) : null,
    groupId ? APIFetcher : null,
    {
      refreshInterval: 0,
    }
  );

  const userId: any = [];

  groupData?.users.forEach((user: any) => {
    if (!userId.includes(user.id)) {
      userId.push(user.id);
    }
  });

  React.useEffect(() => {
    let grpPayload = [...groupUsers];
    if (groupData && !grpPayload.some((group) => group.group_id == groupData.id)) {
      grpPayload.push({
        group_id: groupData?.id,
        users: userId,
      });
      setGroupUsers(grpPayload);
    }
  }, [groupData]);

  const RemoveGroupPayload = (id: any) => {
    let grpPayload = [...groupUsers].filter((grp: any) => grp?.group_id !== id);
    setGroupId(grpPayload[grpPayload.length - 1]?.group_id);
    setGroupUsers(grpPayload);
  };

  const toggleUsers = (group_id: number, user_id: number) => {
    const group = [...groupUsers].find((item) => item.group_id === group_id);
    if (group) {
      const index = group.users.indexOf(user_id);
      if (index > -1) {
        group.users.splice(index, 1);
      } else {
        group.users.push(user_id);
      }
    }

    const payload = [...groupUsers];
    const grpIdx = payload.findIndex((load: any) => load.group_id == group_id);
    if (grpIdx! > -1) {
      payload.splice(grpIdx, 1);
      payload.push(group);
    }

    setGroupUsers(payload);
  };

  const removeGroup = (groupId: number) => {
    RemoveGroupPayload(groupId);
    setValue(
      "groups",
      selectedGroups.filter((id: any) => id !== groupId)
    );
  };

  const showGroup = (groupId: any) => {
    setGroupId(groupId);
  };

  const assessmentSearchBar = groupData && groupData?.users && groupData?.users?.length > 0;

  return (
    <div className="flex-col gap-3 bg-white space-y-5">
      <div className="w-1/4 p-5">
        <Controller
          control={control}
          name="groups"
          rules={registerValidationOptions.groups}
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <div className="text-sm text-dark-100 mb-1">Groups</div>
              <MultiSelect
                placeHolder="Select group"
                options={studentGroupData}
                selectedOptions={value || null}
                handleOption={(_value: any, data: any) => {
                  onChange(_value);
                  setGroupId(_value[_value.length - 1]);
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
          {selectedGroups?.length} Groups selected of {studentGroupList?.length}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 px-5 cursor-pointer">
        {selectedGroups?.map((groupId: any, index: number) => (
          <div
            key={groupId}
            className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
          >
            <div className="pl-2 pr-1 w-28" onClick={() => showGroup(groupId)}>
              {studentGroupData.find((user: any) => user.key === groupId)?.title}
            </div>
            <div
              className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
              onClick={() => {
                removeGroup(groupId);
              }}
            >
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      {assessmentSearchBar ? (
        <>
          <div className="flex justify-between w-full bg-[#FBFBFD] items-center py-3 px-5">
            <div className="flex-col space-y-1">
              <div className="text-xl font-medium">{groupData?.name}</div>
              <div className="font-normal text-[#08070899] w-80">
                {
                  groupUsers[groupUsers.findIndex((gu: any) => gu.group_id === groupData.id)]?.users
                    .length
                }{" "}
                Students Selected
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
          {groupData && groupData?.users && groupData?.users?.length > 0 && (
            <div className="flex-col space-y-5 px-5 pb-5">
              {groupData?.users?.map((user: any) => (
                <div key={user.id} className="flex items-center gap-4">
                  <input
                    id={`option-${groupData.id}-${user.id}`}
                    type="checkbox"
                    value={user.id}
                    {...register(`${groupData.id}-${user.id}`)}
                    checked={watch(`${groupData.id}-${user.id}`)}
                    defaultChecked={watch(`${groupData.id}-${user.id}`) ? false : true}
                    disabled={
                      groupUsers[groupUsers.findIndex((grp: any) => grp.group_id == groupData.id)]
                        ?.users?.length == 1 &&
                      groupUsers[groupUsers.findIndex((grp: any) => grp.group_id == groupData.id)]
                        ?.users[0] == user?.id
                    }
                    onClick={() => toggleUsers(groupData.id, user.id)}
                  />
                  <label htmlFor={`option-${user.id}`}>{user.name}</label>
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default StudentGroupForm;
