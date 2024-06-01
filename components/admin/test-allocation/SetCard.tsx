//react
import React from "react";
//next
import { useRouter } from "next/router";
//components
import Dropdown from "@components/utilities/Dropdown";
//hero icons
import { DotsVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
//api services
import { AssessmentSet } from "@lib/services/test.allocation.service";
//swr
import { mutate } from "swr";

const SetCard = ({ assessmentSetList, mutateUrl }: any) => {
  const router = useRouter();

  const assessmentOptions = (data: any) => {
    return [
      {
        icon: <PencilIcon height="14px" width="14px" fill="#8b8b8b" />,

        label: "Edit Set",
        on_click: () => {
          router.push(`/admin/practice-sheets/${data?.id}`);
        },
      },
      {
        icon: <TrashIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Delete Set",
        on_click: () => {
          handleSetDelete(data?.id);
        },
      },
    ];
  };

  const handleSetDelete = async (set_id: any) => {
    return AssessmentSet.delete(set_id)
      .then((res) => {
        mutate(mutateUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {assessmentSetList && assessmentSetList.length <= 0 ? (
        <div className="flex h-full w-full items-center pt-5 justify-center text-gray-400">
          No Practice Sets Found, Please Create One.
        </div>
      ) : (
        assessmentSetList?.map((assessmentSet: any) => (
          <div className="bg-white max-w-[330px] mt-4" key={assessmentSet.id}>
            <div className="flex-col space-y-3 p-3">
              <div className="flex gap-5 justify-between">
                <div className="flex gap-4">
                  <div
                    className="font-bold text-xl cursor-pointer"
                    onClick={() => router.push(`practice-sheets/${assessmentSet?.id}`)}
                  >
                    {assessmentSet ? assessmentSet?.name : "Set"}
                  </div>
                  <div
                    className={`border h-[30px] text-xs font-medium px-1 pt-1.5 rounded-sm 
                  ${
                    assessmentSet?.status
                      ? "border-green-600 text-green-600"
                      : "border-yellow-600 text-yellow-600"
                  }`}
                  >
                    {assessmentSet?.status ? "ACTIVE" : "INACTIVE"}
                  </div>
                </div>
                <Dropdown
                  options={assessmentOptions(assessmentSet)}
                  button={<DotsVerticalIcon height="14px" width="14px" fill="#8B8B8B" />}
                />
              </div>
              <div className="text-sm text-dark-0"></div>
              <div className="border border-[#D3D3D3]"></div>
              <div className="flex justify-between">
                <div className="italic text-sm text-[#5A5A5A]">
                  {assessmentSet?.count ?? 0} Assessments
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default SetCard;
