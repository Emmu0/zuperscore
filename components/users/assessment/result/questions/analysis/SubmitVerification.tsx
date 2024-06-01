import React from "react";
// components
import Button from "@components/buttons";
import Modal from "@components/ui/Modal";
// api services
import { AssessmentSession } from "@lib/services/user.assessment.service";

interface IProps {
  session_id?: any;
  result?: any;
  attempts?: any;
  view?: any;
}

const AnalysisSubmitVerification: React.FC<IProps> = ({ session_id, result, attempts, view }) => {
  const [isValidationArray, setValidationArray] = React.useState<any>(null);
  const [isReviewed, setIsReviewed] = React.useState(false);
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [isModal, setModal] = React.useState<any>(false);
  const closeModal = () => {
    setModal(false);
    setIsReviewed(false);
    setButtonLoader(false);
    setTimeout(() => {
      setValidationArray(null);
    }, 500);
  };

  const verifyAnalysisSubmission = async () => {
    let sectionsData: any = [];
    let validateAttempts: any = [];

    result?.user_assessment_session?.section_analysis_data &&
      result?.user_assessment_session?.section_analysis_data.length > 0 &&
      result?.user_assessment_session?.section_analysis_data.map((_section: any) => {
        let incorrectQuestions =
          (result?.user_assessment_session.total_incorrect_qids &&
            result?.user_assessment_session.total_incorrect_qids.length > 0 &&
            result?.user_assessment_session.total_incorrect_qids.find(
              (_iSection: any) => _iSection?.section_id == _section?.id
            )?.qid) ||
          [];
        let unansweredQuestions =
          (result?.user_assessment_session.total_unanswered_qids &&
            result?.user_assessment_session.total_unanswered_qids.length > 0 &&
            result?.user_assessment_session.total_unanswered_qids.find(
              (_iSection: any) => _iSection?.section_id == _section?.id
            )?.qid) ||
          [];

        const currentSectionIncorrectQuestions = incorrectQuestions.concat(unansweredQuestions);
        sectionsData = [
          ...sectionsData,
          {
            id: _section?.id,
            name: _section?.name,
            attempts: currentSectionIncorrectQuestions
              .map((_questionId: any) => {
                let currentAttempt = attempts.find(
                  (_attempt: any) =>
                    _attempt?.question == _questionId && _attempt?.section == _section?.id
                );
                if (currentAttempt && !currentAttempt?.analysis_data?.type) {
                  validateAttempts = [...validateAttempts, currentAttempt];
                  return currentAttempt;
                }
              })
              .filter((_attempt: any) => !!_attempt),
          },
        ];
      });

    if (validateAttempts && validateAttempts.length > 0) {
      setValidationArray([...sectionsData]);
      setModal(true);
    } else {
      updateUserAssessmentSession();
    }
  };

  const updateUserAssessmentSession = () => {
    setButtonLoader(true);
    setIsReviewed(false);

    let sessionPayload = {
      id: session_id,
      is_reviewed: true,
      state: "ANALYSED",
    };

    AssessmentSession.update(sessionPayload)
      .then((response) => {
        setButtonLoader(false);
        setIsReviewed(true);
      })
      .catch((error) => {
        setButtonLoader(false);
        setIsReviewed(false);
      });
  };

  return (
    <>
      <div className="flex items-center whitespace-nowrap">
        {result?.user_assessment_session?.is_reviewed || isReviewed ? (
          <span className="border border-gray-300 hover:border-gray-400 bg-gray-200 hover:bg-gray-3-00 text-gray-800 px-3 py-2">
            Analysis Submitted Successfully
          </span>
        ) : (
          <>
            {view === "student" ? (
              <Button size="sm" disabled={buttonLoader} onClick={verifyAnalysisSubmission}>
                {buttonLoader ? "Submitting Analysis..." : "Submit Analysis"}
              </Button>
            ) : (
              <Button size="sm">Analysis not Submitted</Button>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <Modal
        title={`Analysis Verification`}
        modal={isModal}
        setModal={closeModal}
        onClose={() => {}}
        onSubmit={() => {}}
        bottomNavigation={false}
      >
        <div className="space-y-2">
          <div className="text-gray-500">
            Please complete the analysis in the below mentioned sections.
          </div>
          <div>
            {isValidationArray && isValidationArray.length > 0 ? (
              <table className="w-full border border-collapse text-sm">
                <thead className="border bg-yellow-100 text-violet-100">
                  <tr className="border!font-normal">
                    <th className="border px-4 py-2 text-center">#</th>
                    <th className="border text-left px-4 py-2">Section Name</th>
                    <th className="border text-left px-4 py-2">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {isValidationArray.map((section: any, index: number) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-center">{index + 1}</td>
                      <td className="border text-left px-4 py-2">{section?.name}</td>
                      <td className="border text-left px-4 py-2">{section?.attempts?.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No sections are available.</div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AnalysisSubmitVerification;
