import React from "react";
// next imports
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
// components
import QuestionEdit from "@components/admin/questions/Edit";
// api routes
import { QUESTION_WITH_ID_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Assessment Question Edit",
};

const QuestionEditView = () => {
  const router = useRouter();
  const { q_id } = router.query;

  const { data: question, error: questionError } = useSWR(
    q_id ? [QUESTION_WITH_ID_ENDPOINT(Number(q_id)), q_id] : null,
    APIFetcher
  );

  return (
    <Container meta={seoMetaInformation}>
      <DefaultLayout>
        <div>
          {q_id ? (
            <>
              {question && !questionError ? (
                <QuestionEdit data={question} handleCurrentBlock={(data: any) => {}} />
              ) : (
                <div className="text-center py-5 text-gray-500">Loading...</div>
              )}
            </>
          ) : (
            <div className="text-center py-5 text-gray-500">Please enter a valid question_id</div>
          )}
        </div>
      </DefaultLayout>
    </Container>
  );
};

export default authWrapper(QuestionEditView, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
