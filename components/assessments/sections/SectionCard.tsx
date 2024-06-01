import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SectionCard = ({ section }: any) => {
  const router = useRouter();
  return (
    <div className="px-8 flex justify-between items-center mx-4 border-b ">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center">
          <div className=" pr-8 py-2">
            <Image src="/images/default.jpg" alt="assessment" height={100} width={100} />
          </div>
          <div>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/[section_id]",
                query: { assessment_id: router.query.assessment_id, section_id: section?.id },
              }}
            >
              <a>
                <div className="text-xl font-medium text-dark-200 py-1 cursor-pointer">
                  {section?.name}
                </div>
              </a>
            </Link>

            <div className="text-md text-dark-0 w-80 truncate">
              {section?.description?.assessment}
            </div>
          </div>
        </div>
        <div>
          <Link
            href={{
              pathname: "/assessments/[assessment_id]/[section_id]",
              query: { assessment_id: router.query.assessment_id, section_id: section?.id },
            }}
          >
            <a>
              <button className="px-4 py-2 bg-violet-0/20 text-violet-100 border border-violet-100">
                Start this section{" "}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
