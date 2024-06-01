import React from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR, { mutate } from "swr";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import QuestionBlockRoot from "@components/admin/assessments/questions/BlockRoot";
import Button from "@components/buttons";
//ui icons
import { ArrowLeftIcon } from "@ui/icons";
// api routes
import { SUBJECT_NODE_ENDPOINT, ASSESSMENT_QUESTION_WITH_SUBJECT_ID } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { SubjectNodeQuestionSequence } from "@lib/services/subjects.service";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Dashboard",
};

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const { subject_node_id, question_id } = router.query as any;
  console.log(router.query);
  const { data: subjectDetail, error: subjectDetailError } = useSWR(
    question_id ? [SUBJECT_NODE_ENDPOINT(Number(question_id)), question_id] : null,
    APIFetcher
  );

  const { data: subjectNodeQuestions, error: subjectNodeQuestionsError } = useSWR(
    question_id ? [ASSESSMENT_QUESTION_WITH_SUBJECT_ID(Number(question_id)), question_id] : null,
    APIFetcher
  );

  const blockBridgeSeqUpdate = async (data: any) => {
    const payload = {
      question: data?.question?.id,
      sequence: data?.sequence,
      node: parseInt(question_id),
    };

    return SubjectNodeQuestionSequence(payload)
      .then((response) => {
        mutate(
          [ASSESSMENT_QUESTION_WITH_SUBJECT_ID(Number(question_id)), question_id],
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData?.id === data?.id);
            return elements.map((_ele: any, i: Number) =>
              i === index ? { ..._ele, sequence: payload?.sequence } : _ele
            );
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
      <AdminLayout padding={false}>
        <Link href={`/subjects/${subject_node_id}`}>
          <a className="text-sm flex items-center space-x-3 mb-4 p-5 cursor-pointer">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to subject</p>
          </a>
        </Link>
        <div className="border-b border-gray-300 flex justify-between items-center container mx-auto px-5 py-6">
          <div className="text-xl font-medium">{subjectDetail?.title}</div>
          <div>
            <Link href={`/subjects/${subject_node_id}/questions/${question_id}/question`}>
              <a>
                <Button size="sm">Add New Question</Button>
              </a>
            </Link>
          </div>
        </div>

        {subjectNodeQuestions && !subjectNodeQuestionsError ? (
          <>
            {subjectNodeQuestions.length > 0 ? (
              <div className="space-y-2 mx-auto container px-5">
                {subjectNodeQuestions.map((question: any, index: number) => (
                  <div key={`tag-questions-${index}`} className="my-5 rounded">
                    <div className="w-full h-full border border-gray-300 rounded-sm ">
                      <QuestionBlockRoot
                        block_bridge={question}
                        blockBridgeSeqUpdate={blockBridgeSeqUpdate}
                        block={question?.question}
                        mutate_url={[
                          ASSESSMENT_QUESTION_WITH_SUBJECT_ID(Number(question_id)),
                          question_id,
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center w-full text-muted text-sm py-5">
                No Questions Found Under This Tag
              </div>
            )}
          </>
        ) : (
          <div className="text-center w-full text-muted text-sm py-5">loading...</div>
        )}

        <div className="container px-5 py-3">
          <Link href={`/subjects/${subject_node_id}/questions/${question_id}/question`}>
            <a>
              <Button size="sm">Add New Question</Button>
            </a>
          </Link>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminDashboard, { authRequired: true, role: ["admin", "typist"] });
