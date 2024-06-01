import React from "react";
// components
import QuestionForm from "./forms";
import Modal from "@components/ui/Modal";

interface IQuestionCreate {
  data?: any;
  buttonLoader?: any;
  handleQuestionCreate?: any;
}

const QuestionCreate: React.FC<IQuestionCreate> = ({
  data,
  buttonLoader,
  handleQuestionCreate,
}) => {
  const [formData, setFormData] = React.useState<any>(null);
  const handleFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  React.useEffect(() => {
    if (data) {
      setFormData((prevData: any) => {
        return {
          ...prevData,
          type: data?.type,
          title: data?.title,
          passage: data?.passage?.passage || null,
          passage_html: data?.passage?.passage_html || null,
          passage_text: data?.passage?.passage_text || null,
          explanation: data?.explanation?.explanation || null,
          explanation_html: data?.explanation?.explanation_html || null,
          explanation_text: data?.explanation?.explanation_text || null,
          content: data?.data?.content || null,
          content_html: data?.data?.content_html || null,
          content_text: data?.data?.content_text || null,
          multiple: data?.data?.multiple || false,
          options: data?.options || [],
          answers: data?.data?.answers || [],
          approvers_difficulty: data?.approvers_difficulty || "1",
          statistical_difficulty: data?.statistical_difficulty || "0",
          used_in: data?.used_in || null,
          decision: data?.decision || "0",
          sourced_from: data?.sourced_from || "ZUPERSCORE",
          remarks: data?.remarks || "", // text-field
          irt_a: data?.irt_a || 0,
          irt_b: data?.irt_b || 0,
          irt_c: data?.irt_c || 0,
          blume_taxonomy: data?.blume_taxonomy || null,
          weight: data?.weight || 1,
          exam: data?.exam || null,
          subject: data?.subject || null,
          domain: data?.domain || null,
          topic: data?.topic || null,
          sub_topic: data?.sub_topic || null,
        };
      });
    }
  }, [data]);

  const [showConfirmation, setShowConfirmation] = React.useState<any>(false);
  // question create
  const questionCreateSubmit = () => {

    if (handleQuestionCreate) {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="p-5">
      <div className="container">
        {formData && (
          <>
            <QuestionForm
              data={formData}
              handleData={handleFormData}
              setData={setFormData}
              buttonLoader={buttonLoader}
              onBlockUpdate={questionCreateSubmit}
            />
            <Modal
              size={`sm`}
              title={`Create Question`}
              modal={showConfirmation}
              setModal={() => {
                setShowConfirmation(false);
              }}
              onClose={() => {}}
              onSubmit={() => handleQuestionCreate(formData)}
            >
              <div>Are you sure you want to proceed?</div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionCreate;
