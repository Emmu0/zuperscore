import VerticalDotIcon from "@ui/icons/verticalDotIcon";
import Image from "next/image";
import React from "react";

const resultByStudentData = [
  {
    id: 1,
    student: {
      image_src: "/images/default.jpg",
      name: "Bhavesh Raja",
    },
    marks: {
      obtained_marks: "1200",
      total_marks: "1600",
    },
  },
  {
    id: 2,
    student: {
      image_src: "/images/default.jpg",
      name: "Bhavesh Raja",
    },
    marks: {
      obtained_marks: "1300",
      total_marks: "1600",
    },
  },
];

const ResultsByStudents = () => {
  return (
    <div className="">
      <div className="my-4 w-full">
        <table className="w-full border border-collapse">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              {/* <th className="tg-0lax border text-left p-4 h-[60px] w-[57px]"></th> */}
              <th className="tg-0lax border text-left p-4 h-[60px]">Student</th>
              <th className="tg-0lax border text-left p-4 h-[60px]">Score</th>
              <th className="tg-0lax border text-left p-4 h-[60px]">Remarks</th>
              <th className="tg-0lax border text-left p-4 h-[60px] lg:w-[205px]"></th>
            </tr>
          </thead>
          <tbody>
            {resultByStudentData?.map((result, index) => {
              return (
                <tr key={`resultByStudent-${index}`}>
                  <td className="tg-0lax border p-4 ">
                    <div className="flex justify-start items-center">
                      <div className="h-[26px] w-[26px] rounded-[50%]">
                        <Image
                          src={result.student.image_src}
                          className="h-[26px] w-[26px] rounded-[50%]"
                          height={26}
                          width={26}
                          alt="profilepic"
                        />
                      </div>
                      <div className="font-semibold ml-4">{result.student.name}</div>
                    </div>
                  </td>
                  <td className="tg-0lax border p-4">
                    {" "}
                    <div>{`${result.marks.obtained_marks}/${result.marks.total_marks}`}</div>
                  </td>
                  <td className="tg-0lax border p-4"></td>

                  <td className="h-[60px] flex justify-center items-center border-t">
                    <VerticalDotIcon />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsByStudents;
