import React from "react";
// components
import Button from "@components/buttons";
import Modal from "@components/ui/Modal";
// api services
import { AssessmentScaledScore } from "@lib/services/assessment.service";

interface IProps {
  result?: any;
  sections?: any;
  view?: any;
  mutateUrl?: any;
}

const ScaledScore: React.FC<IProps> = ({ result, sections, view, mutateUrl }) => {
  const [isModal, setModal] = React.useState<any>(false);
  const closeModal = () => {
    setModal(false);
  };

  const [scaledScore, setScaledScore] = React.useState<any>(null);

  React.useEffect(() => {
    if (
      result &&
      result?.user_assessment_session &&
      result?.user_assessment_session?.section_analysis_data
    ) {
      let questionPayload: any = {
        english: {},
        math: {},
      };

      let loopQuestions = [
        { key: "total_correct_qids", value: 1 },
        { key: "total_incorrect_qids", value: 0 },
        { key: "total_unanswered_qids", value: 0 },
      ];

      loopQuestions.map((_loopItem: any) => {
        result?.user_assessment_session?.[_loopItem?.key] &&
          result?.user_assessment_session?.[_loopItem?.key].map((_section: any) => {
            if (_section?.qid && _section?.qid.length > 0) {
              let sectionType: any =
                result?.user_assessment_session?.section_info_data[parseInt(_section?.section_id)]
                  ?.data?.group_by;
              let payloadType: any =
                sectionType && sectionType === "reading_and_writing" ? "english" : "math";
              _section?.qid.map((_question: any) => {
                questionPayload[payloadType] = {
                  ...questionPayload[payloadType],
                  ...{ [_question]: _loopItem?.value },
                };
              });
            }
          });
      });

      questionPayload = { ...questionPayload, assessment_id: result?.assessment?.id };

      AssessmentScaledScore(questionPayload)
        .then((res) => {
          setScaledScore(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [result]);

  return (
    <>
      <div className="flex items-center whitespace-nowrap">
        {/* <Button variant="secondary" onClick={() => setModal(true)} size="sm">
          View scaled Score
        </Button> */}
      </div>

      {/* Modal */}
      <Modal
        title={`Scaled Score`}
        modal={isModal}
        setModal={closeModal}
        onClose={() => { }}
        onSubmit={() => { }}
        bottomNavigation={false}
        size="lg"
      >
        <div className="space-y-2">
          <div className="border divide-x-2 grid grid-cols-3 items-center text-center rounded mt-6">
            <div className="py-4">
              <div className="text-xl text-violet-100 font-medium">English scaled score</div>
              <div className="text-muted font-medium text-2xl">
                {scaledScore?.english.toFixed(2) || 0}
              </div>
            </div>
            <div className="py-4">
              <div className="text-xl text-violet-100 font-medium">Maths scaled score</div>
              <div className="text-muted font-medium text-2xl">
                {scaledScore?.math.toFixed(2) || 0}
              </div>
            </div>
            <div className="py-4">
              <div className="text-xl text-violet-100 font-medium">Total scaled score</div>
              <div className="text-muted font-medium text-2xl">
                {scaledScore?.total.toFixed(2) || 0}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ScaledScore;
