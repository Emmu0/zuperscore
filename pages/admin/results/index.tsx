import React, { useEffect, useState } from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// headless ui
import { Menu } from "@headlessui/react";
// swr
import useSWR from "swr";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
//components
import Button from "@components/buttons";
import AdminHeader from "@components/admin/AdminHeader";
import ResultsByStudents from "@components/admin/assessments/results/ResultsByStudents";
// ui icons imports
import { DateIcon, DropdownIcon, HorizontalDotIcon } from "@ui/icons";
// api routes
import { ASSESSMENT_WITH_ID_ENDPOINT, SECTION_WITH_ID_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Assessment Results",
};

const resultByQuestionData = [
  {
    id: 1,
    question: "Solve is 2x + 3y = z?",
  },
  {
    id: 2,
    question: "Examples for bayes theorem",
  },
];

const ResultsByQuestions = () => {
  return (
    <div className="">
      <div className="my-4 w-full">
        <table className="w-full border border-collapse">
          <thead className="border bg-yellow-100 h-10 text-[#6B6B6B] font-normal">
            <tr className="border">
              <th className="tg-0lax border text-left p-4 h-[60px] w-[57px]">#</th>
              <th className="tg-0lax border text-left p-4 h-[60px]">QUESTION</th>
              <th className="tg-0lax border text-left p-4 h-[60px]">ANSWERED</th>
              <th className="tg-0lax border text-left p-4 h-[60px]">CORRECT</th>
              <th className="tg-0lax border text-left p-4 h-[60px] ">PARTIALLY CORRECT</th>
              <th className="tg-0lax border text-left p-4 h-[60px] ">INCORRECT</th>
              <th className="tg-0lax border text-left p-4 h-[60px] ">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {resultByQuestionData?.map((result, index) => {
              return (
                <>
                  <tr key={`result-${index}`}>
                    <td className="tg-0lax border p-4">
                      {" "}
                      <div>{result?.id}</div>
                    </td>
                    <td className="tg-0lax border p-4 ">
                      <div className="ml-4">{result?.question}</div>
                    </td>

                    <td className="tg-0lax border p-4"></td>
                    <td className="tg-0lax border p-4"></td>
                    <td className="tg-0lax border p-4"></td>
                    <td className="tg-0lax border p-4"></td>
                    <td className="tg-0lax border p-4"></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminAssessmentResults: NextPage = () => {
  const [tab, setTab] = useState("Results");
  const [resultTab, setResultTab] = useState("questions");
  const router = useRouter();
  useEffect(() => {
    router.query.view = resultTab;
    router.push(router);
  }, [resultTab]);

  const section_id = parseInt(router.query.section_id as string);
  const assessment_id = parseInt(router.query.assessment_id as string);
  const { data: assessment, error: assessmentError } = useSWR(
    ASSESSMENT_WITH_ID_ENDPOINT(assessment_id),
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  const { data: section, error: sectionError } = useSWR(
    SECTION_WITH_ID_ENDPOINT(section_id),
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader
          title={assessment?.name || "Assessment Name"}
          description={assessment?.description?.assessment || "Assessment Description"}
          button={
            <div className=" ">
              <Button className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium mr-8">
                + New Question
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2 border border-border-light bg-light-300"
              >
                <HorizontalDotIcon className="" />
              </Button>
            </div>
          }
        />

        <div className="flex justify-start items-center pt-2">
          <div className={"bg-[#FE903433] py-1 px-4 rounded-[40px] mr-1 text-[#434343]"}>
            Medium
          </div>
          <div className={"bg-[#7059FF1A] py-1 px-4 rounded-[40px] mr-1 text-[#434343]"}>
            Mathematics
          </div>
        </div>
        <div>
          <div className={`flex justify-start items-center  border-b border-border-light mt-4`}>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/[section_id]",
                query: {
                  assessment_id: assessment_id || 1,
                  section_id: section?.id || 1,
                },
              }}
            >
              <a>
                <div
                  className={`mr-8 text-violet-100 cursor-pointer ${
                    tab === "Questions" || tab == "Empty"
                      ? "border-b-4 border-violet-100 pb-3"
                      : "pb-4"
                  }`}
                >
                  Questions
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/submissions",
                query: { assessment_id: assessment_id },
              }}
            >
              <a>
                <div
                  className={`text-violet-100 cursor-pointer mr-8 ${
                    tab === "Submissions" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                  }`}
                >
                  Submissions
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/results",
                query: { assessment_id: assessment_id },
              }}
            >
              <a>
                <div
                  className={`text-violet-100 cursor-pointer mr-8 ${
                    tab === "Results" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                  }`}
                >
                  Results
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/settings",
                query: { assessment_id: assessment_id },
              }}
            >
              <a>
                <div
                  className={`text-violet-100 cursor-pointer mr-8 ${
                    tab === "Settings" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                  }`}
                >
                  Settings
                </div>
              </a>
            </Link>
          </div>
        </div>

        <div className="">
          <div className=" mt-4 flex justify-between items-center">
            <div className={`relative`}>
              <Menu>
                <Menu.Button>
                  <div className=" text-2xl font-semibold flex justify-start items-center">
                    Results by{" "}
                    <span className="text-violet-0 underline px-2">
                      {resultTab === "students" ? "Students" : "Questions"}
                    </span>
                    <DropdownIcon className="mt-2" />
                  </div>
                </Menu.Button>
                <Menu.Items
                  className={
                    "border border-border-light shadow-lg absolute right-0 flex flex-col justify-start items-start  px-2 py-2 bg-light-0"
                  }
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && " text-violet-100"
                        } px-4 py-2 cursor-pointer flex justify-start items-center`}
                        onClick={() => setResultTab("students")}
                      >
                        Students
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "text-violet-100 "
                        } px-4 py-2 cursor-pointer flex justify-start items-center`}
                        onClick={() => setResultTab("questions")}
                      >
                        Questions
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div className="text-dark-0 ">
              Filter by{" "}
              <Button
                variant="secondary"
                className="px-4 py-2 bg-[#FBFBFD] border border-border-light"
              >
                Baseline Score
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2 bg-[#FBFBFD] border border-border-light ml-4"
              >
                <div className="flex justify-start items-center">
                  <DateIcon className="mx-1" />
                  Date Range
                </div>
              </Button>
            </div>
          </div>
          {resultTab === "students" && <ResultsByStudents />}
          {resultTab === "questions" && <ResultsByQuestions />}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminAssessmentResults, { authRequired: true });
