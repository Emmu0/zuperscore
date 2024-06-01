import React from "react";
// components
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import Button from "@components/buttons";
// data
import { analysisReportTypeRAWOptions, analysisReportTypeMathOptions } from "./Preview";
// api services
import { AssessmentAttempt } from "lib/services/user.assessment.service";

interface IProps {
  attempt: any;
  analysis_type: any;
  attempts?: any;
  assessmentAttemptsMutate?: any;
  assessmentQuestionsDetailMutate?: any;
}

const defaultAnalysisData = {
  type: null,
  message: "",
};

const BlockPreviewAnalysisPreview: React.FC<IProps> = ({
  attempt,
  analysis_type,
  attempts,
  assessmentAttemptsMutate,
  assessmentQuestionsDetailMutate,
}) => {
  const [isModal, setModal] = React.useState<any>(false);
  const modalOpen = () => {
    if (attempt?.analysis_data) {
      setAnalysisData(() => {
        return {
          type: attempt?.analysis_data?.type || null,
          message: attempt?.analysis_data?.message || "",
        };
      });
    }
    setModal(true);
  };
  const modalClose = () => {
    setModal(false);
    setAnalysisData((prevData: any) => {
      return { ...defaultAnalysisData };
    });
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [analysisData, setAnalysisData] = React.useState<any>({ ...defaultAnalysisData });
  const handleAnalysisData = (key: string, value: string) => {
    if (key === "message")
      setAnalysisData((prevData: any) => {
        return { ...prevData, [key]: value };
      });
    else
      setAnalysisData((prevData: any) => {
        return { ...prevData, [key]: value };
      });
  };

  const updateAnalysis = () => {
    if (analysisData?.type != null && analysisData?.message != null) {
      if (analysisData?.message.length >= 100 && analysisData?.message.length <= 500) {
        setButtonLoader(true);
        const payload = {
          id: attempt?.id,
          analysis_data: attempt?.analysis_data
            ? { ...attempt?.analysis_data, ...analysisData }
            : { ...analysisData },
        };

        AssessmentAttempt.update(payload)
          .then((response) => {
            setButtonLoader(false);
            modalClose();
            if (assessmentAttemptsMutate)
              assessmentAttemptsMutate((data: any) => {
                return data;
              });
          })
          .catch((error) => {
            console.error("error", error);
            setButtonLoader(false);
          });
      } else alert("Comment field should consists between 100 to 500 characters.");
    } else alert("Please fill all the fields.");
  };

  return (
    <div>
      <Button
        size="sm"
        variant="secondary"
        type="button"
        disabled={buttonLoader}
        onClick={modalOpen}
      >
        {buttonLoader ? "Analyze..." : "Analyze"}
      </Button>

      <Modal
        title={`Student analysis`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            modalClose();
          }, 500);
        }}
        onClose={() => {}}
        loading={buttonLoader}
        onSubmit={updateAnalysis}
      >
        <div className="space-y-2">
          <div>
            <div className="text-sm text-dark-100 mb-2">Type</div>
            <Select
              placeHolder="Reason for Error"
              options={
                analysis_type == "reading_and_writing"
                  ? analysisReportTypeRAWOptions
                  : analysisReportTypeMathOptions
              }
              selectedOptions={analysisData?.type ? [analysisData?.type] : null}
              handleOption={(_value: any, data: any) => {
                handleAnalysisData("type", _value[0]);
              }}
              multiple={false}
            />
          </div>
          <div>
            <div className="text-sm text-dark-100 mb-2">Comment</div>
            <textarea
              id={"report-comment"}
              rows={4}
              placeholder={"Comment here"}
              className={`border focus:outline-none w-full px-2 py-1 rounded-sm`}
              value={analysisData?.message ? analysisData?.message : ""}
              onChange={(e: any) => {
                handleAnalysisData("message", e.target.value);
              }}
            />
            <div className="text-right text-sm font-medium text-gray-500">
              {analysisData?.message.length}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlockPreviewAnalysisPreview;
