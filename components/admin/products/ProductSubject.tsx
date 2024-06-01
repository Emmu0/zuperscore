import React from "react";
// compoenents
import AddFolderDialog from "./AddFolderDialog";
// ui icons
import { DropdownIcon, FileIcon, HorizontalDotIcon } from "@ui/icons";

const ProductSubject = ({}: any) => {
  const [showFolder, setShowFolder] = React.useState(false);
  const [isModal, setIsModal] = React.useState(false);
  return (
    <div>
      <div className="mt-4 flex justify-between items-center">
        <div className=" text-2xl font-semibold ">Mathematics</div>
        <div>
          <button
            className="px-4 py-2 border bg-light-200 border-violet-100 text-violet-100 text-md font-semibold"
            onClick={() => setIsModal(true)}
          >
            + Add Folder
          </button>
          <AddFolderDialog isModal={isModal} setIsModal={setIsModal} />
        </div>
      </div>
      <div className=" mt-4 flex flex-col justify-between items-center">
        <div className={"w-full flex justify-between items-center bg-yellow-200 h-[43px] p-2"}>
          <div
            className="flex justify-start items-center "
            onClick={() => setShowFolder(!showFolder)}
          >
            <DropdownIcon className="mx-4" fill={"#721154"} />
            <FileIcon className="mx-4" />
            <div className="text-violet-100 text-[18px] font-semibold">M1A</div>
          </div>
          <div className="flex justify-start items-center py-2">
            <HorizontalDotIcon className="mx-8" />
          </div>
        </div>
        <div className={`${showFolder ? "w-full text-[#00000099]" : "hidden"}`}>
          <div
            className={"w-full flex justify-between items-center bg-light-200 h-[43px] py-2 pl-8"}
          >
            <div className="flex justify-start items-center">
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <div className="text-violet-100 text-[18px] font-normal">M1A</div>
            </div>
            <div className="flex justify-start items-center py-2">
              <HorizontalDotIcon className="mx-8" />
            </div>
          </div>
          <div
            className={"w-full flex justify-between items-center bg-[#7211540D] h-[43px] py-2 pl-8"}
          >
            <div className="flex justify-start items-center">
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <div className="text-violet-100 text-[18px] font-normal">M1A</div>
            </div>

            <div className="flex justify-start items-center py-2">
              <HorizontalDotIcon className="mx-8" />
            </div>
          </div>
          <div
            className={"w-full flex justify-between items-center bg-light-200 h-[43px] py-2 pl-8"}
          >
            <div className="flex justify-start items-center">
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <div className="text-violet-100 text-[18px] font-normal">M1A</div>
            </div>
            <div className="flex justify-start items-center py-2">
              <HorizontalDotIcon className="mx-8" />
            </div>
          </div>
          <div
            className={"w-full flex justify-between items-center bg-[#7211540D] h-[43px] py-2 pl-8"}
          >
            <div className="flex justify-start items-center">
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <div className="text-violet-100 text-[18px] font-normal">M1A</div>
            </div>
            <div className="flex justify-start items-center py-2">
              <HorizontalDotIcon className="mx-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductSubject;
