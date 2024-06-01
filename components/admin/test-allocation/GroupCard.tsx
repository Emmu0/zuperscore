//react
import React from "react";
//next imports
import { useRouter } from "next/router";
//components
import Dropdown from "@components/utilities/Dropdown";
//hero icons
import { PencilIcon, TrashIcon, DotsVerticalIcon } from "@heroicons/react/solid";
//api services
import { Group } from "@lib/services/test.allocation.service";
//swr
import { mutate } from "swr";

const GroupCard = ({ studentGroupList, mutateUrl }: any) => {
  const router = useRouter();
  const assessmentOptions = (data: any) => {
    return [
      {
        icon: <PencilIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Edit Group",
        on_click: () => {
          router.push(`/admin/student-groups/${data.id}`);
        },
      },
      {
        icon: <TrashIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Delete Group",
        on_click: () => {
          handleGroupDelete(data?.id);
        },
      },
    ];
  };

  const handleGroupDelete = async (group_id: any) => {
    return Group.delete(group_id)
      .then((res) => {
        mutate(mutateUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {studentGroupList && studentGroupList.length <= 0 ? (
        <div className="flex h-full w-full items-center pt-5 justify-center text-gray-400">
          No Student Groups Found, Please Create One.
        </div>
      ) : (
        studentGroupList.map((studentGroup: any, index: any) => (
          <div key={index} className="bg-white max-w-[330px] mt-4">
            <div className="flex-col space-y-3 p-3">
              <div className="flex gap-5 justify-between">
                <div className="flex gap-4">
                  <div
                    className="font-bold text-xl cursor-pointer"
                    onClick={() => router.push(`student-groups/${studentGroup?.id}`)}
                  >
                    {studentGroup ? studentGroup?.name : "Group"}
                  </div>

                  <div
                    className={`border h-[30px] text-xs font-medium px-1 pt-1.5 rounded-sm 
                  ${
                    studentGroup?.status
                      ? "border-green-600 text-green-600"
                      : "border-yellow-600 text-yellow-600"
                  }`}
                  >
                    {studentGroup?.status ? "ACTIVE" : "INACTIVE"}
                  </div>
                </div>
                <Dropdown
                  options={assessmentOptions(studentGroup)}
                  button={<DotsVerticalIcon height="14px" width="14px" fill="#8B8B8B" />}
                />
              </div>

              <div className="border border-[#D3D3D3]"></div>
              <div className="flex justify-between">
                <div className="italic text-sm text-[#5A5A5A]">
                  {new Date(studentGroup?.target_date).toLocaleDateString()}
                </div>
                <div className="italic text-sm text-[#5A5A5A]">
                  {" "}
                  {studentGroup?.count ?? 0} Students
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default GroupCard;
