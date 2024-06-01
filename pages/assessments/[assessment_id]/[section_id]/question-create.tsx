import React from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import QuestionCreate from "@components/admin/questions/Create";
// api services
import { Question, Option } from "@lib/services/assessment.service";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Question Create",
};

const SubjectQuestion: NextPage = () => {
  const router = useRouter();
  const { assessment_id, section_id } = router.query;

  const [question, setQuestion] = React.useState<any>({
    type: "MCQ",
    title: "",
    passage: {
      passage: null,
      passage_html: null,
      passage_text: null,
    },
    explanation: {
      explanation: null,
      explanation_html: null,
      explanation_text: null,
    },
    data: {
      content: null,
      content_html: null,
      content_text: null,
      multiple: false,
      answers: [],
    },
    options: [],
    approvers_difficulty: "0",
    statistical_difficulty: "0",
    used_in: {
      class_assignment: false,
      home_assignment: false,
      practice_test: false,
      sectional_test: false,
      mock_test: false,
    },
    decision: "0",
    sourced_from: "ZUPERSCORE",
    remarks: "", // text-field
    irt_a: 0,
    irt_b: 0,
    irt_c: 0,
    blume_taxonomy: {
      memory: false,
      comprehension: false,
      application: false,
      analysis: false,
      synthesis: false,
      judgment: false,
    },
  });

  const [buttonLoader, setButtonLoader] = React.useState(false);
  // question create
  const handleQuestionCreate = (formData: any) => {
    const questionPayload = {
      type: formData?.type,
      title: formData?.title || "question",
      passage: {
        passage: formData?.passage,
        passage_html: formData?.passage_html,
        passage_text: formData?.passage_text,
      },
      data: {
        content: formData?.content,
        content_html: formData?.content_html,
        content_text: formData?.content_text,
        multiple: formData?.multiple,
        answers: formData?.answers,
      },
      explanation: {
        explanation: formData?.explanation,
        explanation_html: formData?.explanation_html,
        explanation_text: formData?.explanation_text,
      },
      approvers_difficulty: formData?.approvers_difficulty,
      statistical_difficulty: formData?.statistical_difficulty,
      used_in: formData?.used_in,
      decision: formData?.decision,
      sourced_from: formData?.sourced_from,
      remarks: formData?.remarks,
      irt_a: formData?.irt_a,
      irt_b: formData?.irt_b,
      irt_c: formData?.irt_c,
      blume_taxonomy: formData?.blume_taxonomy,
      section: section_id,
    };

    setButtonLoader(true);

    Question.create(questionPayload)
      .then((response) => {
        questionOptionCreateSubmit(response?.question, formData?.options);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  // options create
  const questionOptionCreateSubmit = (questionResponse: any, questionOptions: any) => {
    if (questionOptions && questionOptions.length > 0) {
      let optionPayload: any = [];
      questionOptions.map((option: any) => {
        optionPayload = [...optionPayload, { ...option, question: questionResponse?.id }];
      });

      Option.asyncCreateRequest(optionPayload)
        .then((response) => {
          router.push(`/assessments/${assessment_id}/${section_id}`);
          setButtonLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(false);
        });
    } else {
      router.push(`/assessments/${assessment_id}/${section_id}`);
      setButtonLoader(false);
    }
  };

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <Link href={`/assessments/${assessment_id}/${section_id}`}>
          <a className="text-sm flex items-center space-x-3 mb-4 p-5">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to questions</p>
          </a>
        </Link>
        <QuestionCreate
          data={question}
          buttonLoader={buttonLoader}
          handleQuestionCreate={handleQuestionCreate}
        />
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(SubjectQuestion, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
