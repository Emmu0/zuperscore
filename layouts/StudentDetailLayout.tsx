import React from "react";
// next imports
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const StudentDetailLayout = (props: any) => {
  return (
    <>
      <div className="  flex justify-start items-center">
        <div className="flex justify-start items-center">
          <div>
            <img src="zuperscore.png" className="h-[60px] w-[60px] rounded-[50%]" />
          </div>

          <div className="ml-8">
            <div className="text-2xl font-semibold">Bhavesh Raja</div>
            <div className="text-dark-0">bhaveshraj@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center border-b border-border-light mt-8">
        <Link
          href={{
            pathname: "/admin/students/[student_id]/upcoming-test",
            query: { student_id: "1" },
          }}
        >
          <a>
            <div
              className={`mr-8 text-violet-100 cursor-pointer ${
                props.tab === "Upcoming Tests" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
              }`}
            >
              Upcoming Tests
            </div>
          </a>
        </Link>
        <Link
          href={{
            pathname: "/admin/students/[student_id]/past-test",
            query: { student_id: "1" },
          }}
        >
          <a>
            <div
              className={`text-violet-100 cursor-pointer mr-8 ${
                props.tab === "Past Tests" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
              }`}
            >
              Past Tests
            </div>
          </a>
        </Link>
      </div>
      {props.children}
    </>
  );
};

export default StudentDetailLayout;
