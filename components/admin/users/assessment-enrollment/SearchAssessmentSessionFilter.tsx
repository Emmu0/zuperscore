import React from "react";
// next import
import { useRouter } from "next/router";
// components
import Button from "@components/buttons";
import SearchFilter from "@components/filters/SelectSearchFilter";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

interface IAssessmentSessionSearchFilter {
  user_id: any;
  assessments: any;
  searchAssessment: any;
  handleSearchAssessment?: any;
}

const AssessmentSessionSearchFilter: React.FC<IAssessmentSessionSearchFilter> = ({
  user_id,
  assessments,
  searchAssessment,
  handleSearchAssessment,
}) => {
  const router = useRouter();
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [assessment, setAssessment] = React.useState<any>(null);
  const [assessmentListOptions, setAssessmentListOptions] = React.useState<any>(null);

  const handleSearch = () => {
    if (assessment) {
      setAssessment(assessment);
      handleSearchAssessment(assessment);
      if (user_id)
        router.replace(`/users/${user_id}/assessment-enroll?assessment=${assessment}`, undefined, {
          shallow: true,
        });
    } else {
      handleAlert(
        "warning",
        "Empty Assessment",
        "Please select the assessment to continue searching."
      );
    }
  };
  const handleClear = () => {
    setAssessment(null);
    handleSearchAssessment(null);
    if (user_id)
      router.replace(`/users/${user_id}/assessment-enroll`, undefined, { shallow: true });
  };

  React.useEffect(() => {
    if (assessments && assessments.length > 0) {
      let assessmentPayload: any = [];
      assessments.map((_assessment: any) => {
        assessmentPayload.push({
          key: _assessment?.id,
          title: _assessment?.name,
          data: _assessment,
        });
      });
      setAssessmentListOptions(assessmentPayload);
    }
  }, [assessments]);

  React.useEffect(() => {
    if (searchAssessment && assessment === null) setAssessment([searchAssessment]);
  }, [searchAssessment, assessment]);

  return (
    <>
      {assessmentListOptions && assessmentListOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <div>
            <SearchFilter
              placeHolder="Select Assessment"
              options={assessmentListOptions}
              selectedOptions={assessment ? [assessment] : null}
              handleOption={(_value: any, data: any) => {
                setAssessment(_value[0]);
              }}
              multiple={false}
              position="right"
            />
          </div>
          <div>
            <Button size={"xs"} onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div>
            <Button variant="secondary" size={"xs"} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentSessionSearchFilter;
