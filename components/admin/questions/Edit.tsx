import React from "react";
// components
import QuestionForm from "./forms";
// api services
import { Question, Option } from "@lib/services/assessment.service";

interface IQuestionEdit {
  data?: any;
  handleCurrentBlock?: any;
}

const QuestionEdit: React.FC<IQuestionEdit> = ({ data, handleCurrentBlock }) => {
  const [formData, setFormData] = React.useState<any>(null);
  const handleFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  React.useEffect(() => {
    if (data) {
      setFormData((prevData: any) => {
        return {
          ...prevData,
          id: data?.id,
          type: data?.type,
          title: data?.title,
          content: data?.data?.content || null,
          content_html: data?.data?.content_html || null,
          content_text: data?.data?.content_text || null,
          explanation: data?.explanation?.explanation || null,
          explanation_html: data?.explanation?.explanation_html || null,
          explanation_text: data?.explanation?.explanation_text || null,
          passage: data?.passage?.passage || null,
          passage_html: data?.passage?.passage_html || null,
          passage_text: data?.passage?.passage_text || null,
          multiple: data?.data?.multiple || false,
          options: data?.options,
          answers: data?.data?.answers,
          approvers_difficulty: data?.approvers_difficulty || "1",
          statistical_difficulty: data?.statistical_difficulty || "0",
          used_in: data?.used_in || {
            class_assignment: false,
            home_assignment: false,
            practice_test: false,
            sectional_test: false,
            mock_test: false,
          },
          decision: data?.decision || "0",
          sourced_from: data?.sourced_from || "ZUPERSCORE",
          remarks: data?.remarks || "", // text-field
          irt_a: data?.irt_a || 0,
          irt_b: data?.irt_b || 0,
          irt_c: data?.irt_c || 0,
          weight: data?.weight || 1,
          blume_taxonomy: data?.blume_taxonomy || {
            memory: false,
            comprehension: false,
            application: false,
            analysis: false,
            synthesis: false,
            judgment: false,
          },
          exam: data?.exam || null,
          subject: data?.subject || null,
          domain: data?.domain || null,
          topic: data?.topic || null,
          sub_topic: data?.sub_topic || null,
        };
      });
    }
  }, [data]);

  const [questionLoader, setQuestionLoader] = React.useState(false);

  // question create
  const questionEditSubmit = () => {
    const questionPayload = {
      id: formData?.id,
      type: formData?.type,
      title: formData?.title || "question",
      passage: {
        passage: formData?.passage,
        passage_html: formData?.passage_html,
        passage_text: formData?.passage_text,
      },
      explanation: {
        explanation: formData?.explanation,
        explanation_html: formData?.explanation_html,
        explanation_text: formData?.explanation_text,
      },
      data: {
        content: formData?.content,
        content_html: formData?.content_html,
        content_text: formData?.content_text,
        multiple: formData?.multiple,
        answers: formData?.answers,
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
      weight: formData?.weight,
      blume_taxonomy: formData?.blume_taxonomy,
      exam: formData?.exam,
      subject: formData?.subject,
      domain: formData?.domain,
      topic: formData?.topic,
      sub_topic: formData?.sub_topic,
    };

    // TODO:question validation and option validation
    setQuestionLoader(true);
    Question.update(questionPayload)
      .then((response) => {
        questionOptionCreateSubmit(response, formData?.options);
      })
      .catch((error) => {
        console.log(error);
        setQuestionLoader(false);
      });
  };

  // options create
  const questionOptionCreateSubmit = async (questionResponse: any, questionOptions: any) => {
    if (questionOptions && questionOptions.length > 0) {
      let optionCreatePayload: any = [];
      let optionEditPayload: any = [];
      let optionDeletePayload: any = [];

      questionOptions.map((option: any) => {
        if (!option?.id)
          optionCreatePayload = [
            ...optionCreatePayload,
            { ...option, question: questionResponse?.id },
          ];
      });

      questionOptions.map((option: any) => {
        if (option?.id)
          optionEditPayload = [...optionEditPayload, { ...option, question: questionResponse?.id }];
      });

      if (formData?.deleted_blocks && formData?.deleted_blocks.length > 0) {
        optionDeletePayload = formData?.deleted_blocks;
      }

      // creating new Options
      if (optionCreatePayload && optionCreatePayload.length > 0)
        await Option.asyncCreateRequest(optionCreatePayload);

      // editing existing options
      if (optionEditPayload && optionEditPayload.length > 0)
        await Option.asyncEditRequest(optionEditPayload);

      // deleting existing options
      if (optionDeletePayload && optionDeletePayload.length > 0)
        await Option.asyncDeleteRequest(optionDeletePayload);

      if (handleCurrentBlock) handleCurrentBlock("clear");
      setQuestionLoader(false);
    } else {
      if (handleCurrentBlock) handleCurrentBlock("clear");
      setQuestionLoader(false);
    }
  };

  return (
    <div className="p-5">
      <div className="container mx-auto">
        {formData && (
          <QuestionForm
            type="edit"
            data={formData}
            handleData={handleFormData}
            setData={setFormData}
            buttonLoader={questionLoader}
            onBlockUpdate={questionEditSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionEdit;
