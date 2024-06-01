import React from "react";
// next imports
import Image from "next/image";
import Link from "next/link";

const AssessmentCard = ({ assessment }: any) => {
  const startFullScreenMode = () => {
    document.documentElement.requestFullscreen();
  };
  return (
    <div className="px-8 flex justify-between items-center mx-4 border-b">
      <div className=" flex justify-between items-center w-full">
        <div className="flex justify-start items-center">
          <div className=" pr-8 py-2">
            <Image src="/images/default.jpg" alt="assessment" height={100} width={100} />
          </div>
          <div>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]",
                query: { assessment_id: assessment.id },
              }}
            >
              <a onClick={startFullScreenMode}>
                <div className="text-xl font-medium text-dark-200 py-1 cursor-pointer">
                  {assessment.name}
                </div>
              </a>
            </Link>

            <div className="text-md text-dark-0 w-80 truncate">{assessment.description}</div>
          </div>
        </div>
        <div className={`${assessment.is_taken ? "" : "hidden"} `}>
          <button className={`bg-violet-0/20 text-violet-100 px-4 py-2 border border-violet-100`}>
            Download Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
