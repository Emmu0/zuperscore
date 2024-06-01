import Button from "@components/buttons";
import { BinIcon, DateIcon, PencilIcon, TimeIcon } from "@ui/icons";
import React from "react";
import { EditScheduleClassModal } from "./ScheduleEditClassModal";

const SessionCardDialog = ({ event }: any) => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  return (
    <>
      <div className="m-2 my-4">
        <p className="text-lg">{event.name}</p>
      </div>
      <div className="m-2 my-4">
        <p className=" flex justify-start items-center">
          <DateIcon className="mr-2" fill="black" /> 8 March 2022
        </p>
      </div>
      <div className="m-2">
        <p className=" flex justify-start items-center">
          <TimeIcon className="mr-2" /> 9:00 - 11:00
        </p>
      </div>
      <div className="flex justify-between items-center m-2 my-4">
        <div>
          <Button className="" size="sm">
            Join
          </Button>
        </div>
        <div className="flex justify-end items-center">
          <div onClick={() => setIsModal(true)} className="cursor-pointer">
            <PencilIcon className="mr-2" fill={"#CC96AE"} />
          </div>
          <div>
            <BinIcon className="ml-2" fill={"#CC96AE"} />
          </div>
        </div>
      </div>
      <EditScheduleClassModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
};

export default SessionCardDialog;
