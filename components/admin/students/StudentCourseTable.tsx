import React from "react";
// next imports
import Link from "next/link";
// ui icons imports
import { DropdownIcon, FileIcon, VerticalDotIcon } from "@ui/icons";

const StudentCourseTable = () => {
  const [showFolder, setShowFolder] = React.useState(false);
  return (
    <div>
      <div className="mt-2 h-[43px]  bg-yellow-100 text-violet-100">
        <div className="flex justify-start items-center">
          <div className="flex justify-start items-center w-3/6 px-4 py-2 border">
            <input type="checkbox" className="accent-violet-100" />
            <div
              className="flex justify-start items-center"
              onClick={() => setShowFolder(!showFolder)}
            >
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <div className="text-violet-100 text-[18px] font-semibold">M1A</div>
            </div>
          </div>
          <div className="px-4 py-2 h-[43px] border w-1/6"></div>
          <div className="px-4 py-2 h-[43px] border w-1/6"></div>
          <div className="px-4 py-2 h-[43px] border w-1/6"></div>
          <div className="px-4 py-2 h-[43px] border w-1/6"></div>

          <div className="w-[57px] h-[43px] px-4 py-2 border flex justify-center items-center">
            <VerticalDotIcon />
          </div>
        </div>
      </div>
      <div className={`${showFolder === true ? "" : "hidden"}`}>
        <div className="flex justify-start items-center">
          <div className="flex justify-start items-center w-3/6 px-4 py-2 border">
            <input type="checkbox" className="accent-violet-100" />
            <div
              className="flex justify-start items-center ml-8"
              //   onClick={() => setShowFolder(!showFolder)}
            >
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <Link
                href={{
                  pathname: "/admin/students/[student_id]/upcoming-test",
                  query: { student_id: "1" },
                }}
              >
                <a>
                  <div className="text-violet-100 text-[18px] font-normal cursor-pointer">
                    Algebra
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center">✅</div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center">Difficult(5)</div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center">Excellent</div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center"></div>

          <div className="w-[57px] h-[43px] px-4 py-2 border flex justify-center items-center">
            <VerticalDotIcon />
          </div>
        </div>
        <div className="flex justify-start items-center ">
          <div className="flex justify-start items-center w-3/6 px-4 py-2 border">
            <input type="checkbox" className="accent-violet-100" />
            <div className="flex justify-start items-center ml-8">
              <DropdownIcon className="mx-4" fill={"violet-100"} />
              <FileIcon className="mx-4" />
              <Link
                href={{
                  pathname: "/admin/students/[student_id]/upcoming-test",
                  query: { student_id: "1" },
                }}
              >
                <a>
                  <div className="text-violet-100 text-[18px] font-normal cursor-pointer">
                    Algebra
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center">✅</div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center">Difficult(5)</div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center">Excellent</div>
          <div className="px-4 py-2 h-[43px] border w-1/6 text-center"></div>

          <div className="w-[57px] h-[43px] px-4 py-2 border flex justify-center items-center">
            <VerticalDotIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseTable;
