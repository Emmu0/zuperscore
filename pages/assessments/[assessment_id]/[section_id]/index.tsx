import React, { useState } from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR, { mutate } from "swr";
// seo
import Container from "@components/Container";
// components
import Button from "@components/buttons";
import AdminHeader from "@components/admin/AdminHeader";
import QuestionBlockRoot from "@components/admin/assessments/questions/BlockRoot";
import EmptyState from "@components/admin/assessments/questions/EmptyState";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// layout
import AdminLayout from "@layouts/AdminLayout";
// api routes
import { SECTION_WITH_ID_ENDPOINT, SECTION_WITH_QUESTIONS_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { SectionQuestionBridge } from "@lib/services/assessment.service";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Assessment Questions",
};

const AdminAssessmentQuestions: NextPage = () => {
  const router = useRouter();
  const { section_id, assessment_id } = router.query as {
    section_id: any;
    assessment_id: any;
  };

  const { data: section, error: sectionError } = useSWR(
    section_id ? [SECTION_WITH_ID_ENDPOINT(section_id), section_id] : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: sectionQuestions, error: sectionQuestionsError } = useSWR(
    section && section_id
      ? [SECTION_WITH_QUESTIONS_ENDPOINT(Number(section_id)), section_id]
      : null,
    APIFetcher,
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  console.log("sectionQuestions", sectionQuestions);

  const [tab, setTab] = useState("Questions");

  // question sequence bridge
  const blockBridgeSeqUpdate = async (data: any) => {
    const payload = {
      id: data?.id,
      sequence: data?.sequence && parseInt(data?.sequence) >= 0 ? parseInt(data?.sequence) : 0,
    };

    return SectionQuestionBridge.update(payload)
      .then((response) => {
        mutate(
          [SECTION_WITH_QUESTIONS_ENDPOINT(Number(section_id)), section_id],
          async (elements: any) => {
            let asyncPayload = { ...elements };
            let index = asyncPayload?.questions.findIndex(
              (mutateData: any) => mutateData?.id === data?.id
            );
            asyncPayload = {
              ...asyncPayload,
              questions: asyncPayload?.questions.map((_ele: any, i: Number) =>
                i === index ? { ..._ele, sequence: payload?.sequence } : _ele
              ),
            };
            return asyncPayload;
          },
          false
        );
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <Link href={`/assessments/${assessment_id}`}>
          <a className="text-sm flex items-center space-x-3 mb-4">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to sections</p>
          </a>
        </Link>

        <AdminHeader
          title={`${section?.name || "..."}`}
          description={`${
            (section?.description &&
              typeof section?.description === "string" &&
              section?.description) ||
            "..."
          }`}
          // button={
          //   <Link href={`/admin/assessments/${assessment_id}/${section_id}/question-create`}>
          //     <a>
          //       <Button size="sm">Create Question</Button>
          //     </a>
          //   </Link>
          // }
        />

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
              pathname: "/assessments/[assessment_id]/[section_id]/submissions",
              query: { assessment_id: assessment_id, section_id: section?.id || 1 },
            }}
          >
            <a>
              <div
                className={`text-violet-100 cursor-pointer mr-8 ${
                  tab === "Submissions" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                }`}
              >
                Submission
              </div>
            </a>
          </Link>
          <Link
            href={{
              pathname: "/assessments/[assessment_id]/[section_id]/results",
              query: { assessment_id: assessment_id, section_id: section?.id || 1 },
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
              pathname: "/assessments/[assessment_id]/[section_id]/settings",
              query: { assessment_id: assessment_id, section_id: section?.id || 1 },
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

        <div className="mb-4">
          {sectionQuestions?.questions && !sectionQuestionsError ? (
            <>
              {sectionQuestions?.questions.length > 0 ? (
                <div className="space-y-2 mx-auto container px-5">
                  {sectionQuestions?.questions.map((question: any, index: number) => (
                    <div key={`tag-questions-${index}`} className="my-5 rounded">
                      <div className="w-full h-full border border-gray-300 rounded-sm ">
                        <QuestionBlockRoot
                          block_bridge={question}
                          blockBridgeSeqUpdate={blockBridgeSeqUpdate}
                          block={question?.question}
                          mutate_url={[
                            SECTION_WITH_QUESTIONS_ENDPOINT(Number(section_id)),
                            section_id,
                          ]}
                          from="assessments"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </>
          ) : (
            <div className="text-center w-full text-muted text-sm py-5">loading...</div>
          )}

          {/* <div className="container px-5 py-3">
            <Link href={`/admin/assessments/${assessment_id}/${section_id}/question-create`}>
              <a>
                <Button size="sm">Create Question</Button>
              </a>
            </Link>
          </div> */}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminAssessmentQuestions, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
