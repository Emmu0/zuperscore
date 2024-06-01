import React from "react";
// next imports
import Image from "next/image";
// headless-ui imports
import { Menu } from "@headlessui/react";
// ui icons imports
import VerticalDotIcon from "@ui/icons/verticalDotIcon";
import { BinIcon } from "@ui/icons";
import PencilIcon from "@ui/icons/pencilIcon";

// api services imports
import { Assessment } from "@lib/services/assessment.service";


const AssessmentItem = ({
  studentDetail = false,
  marks = "Expired",
  upcoming = false,

  assessment,
}: any) => {
  const handleDeleteAssessment = async (id: any) => {
    return Assessment.delete(id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-8 flex justify-between items-center mx-4 border-b">
      <div className="">
        <div className="flex justify-start items-center">
          <div className=" pr-8 py-2">
            <Image src="/images/default.jpg" alt="assessment" height={100} width={100} />
          </div>
          <div>
            <div className="text-xl font-medium text-dark-200 py-1">{assessment?.name}</div>
            <p className="text-md text-dark-0 w-[200px] truncate">{assessment?.description}</p>
          </div>
        </div>
      </div>
      <div>
        <div className={`${studentDetail === true && upcoming === false ? "" : "hidden"}`}>
          <div
            className={`text-2xl  font-semibold ${
              marks === "Expired" ? "text-[#B20000]" : "text-[#45AF34]"
            }`}
          >
            {marks}
          </div>
        </div>
        <div className={`${studentDetail === true && upcoming == true ? "" : "hidden"}`}>
          <div className="flex flex-col justify-center items-end">
            <div className="text-2xl text-violet-100 font-semibold">3 July 2022</div>
            <div className="text-lg">10:00 AM</div>
          </div>
        </div>
        <div className={`relative ${studentDetail ? "hidden" : ""}`}>
          <Menu>
            <Menu.Button>
              <VerticalDotIcon />
            </Menu.Button>
            <Menu.Items
              className={
                "border border-border-light shadow-lg absolute flex flex-col justify-center items-center  px-2 py-2 bg-light-0"
              }
            >
              <Menu.Item>
                {({ active }) => (
                  <div className={`${active && " "} px-4 py-2 cursor-pointer`}>
                    <PencilIcon />
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${active && " "} px-4 py-2 cursor-pointer`}
                    onClick={() => handleDeleteAssessment(assessment?.id)}
                  >
                    <BinIcon />
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default AssessmentItem;
