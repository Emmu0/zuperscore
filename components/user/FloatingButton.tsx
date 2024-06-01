import React from "react";
import NeedHelp from "@ui/icons/needHelp";
import Image from "next/image";
const FloatingButton = () => {
  return (
    <>
      <button
        className="fixed z-90 bottom-10 right-8 w-30 p-3 h-10 flex items-center rounded-full
                 bg-maroon text-slate-50"
      >
        {/* <div className="relative w-[200px] h-[200px]">
                    <Image
                        src={""}
                        className="w-full h-full object-cover rounded-full"
                        layout="fill"
                        alt=""
                    />
                </div> */}
        <NeedHelp />
        Need Help?
      </button>
    </>
  );
};

export default FloatingButton;
