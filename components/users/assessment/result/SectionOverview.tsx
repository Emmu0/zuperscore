import React from "react";
// components
import Button from "@components/buttons";
// api services
import { AssessmentSession, UserAssessmentRender } from "@lib/services/user.assessment.service";

const SectionOverview = ({ result }: any) => {
  const handleGroupType = (key: any) => {
    if (key == "reading_and_writing") return "Reading and Writing";
    if (key == "math") return "Math";
  };

  const [currentSectionLoading, setCurrentSectionLoading] = React.useState<any>(null);

  const processSectionQuestions = async (
    session_id: any,
    current_section_id: any,
    previous_section_id: any,
    previous_section_correct_score: any
  ) => {
    setCurrentSectionLoading(current_section_id);
    // update previous session result
    let scorePayload: any = {};
    scorePayload[`${previous_section_id}`] = previous_section_correct_score;
    const payload: any = {
      id: session_id,
      section_marks_data: {
        ...result?.user_assessment_session?.section_marks_data,
        ...scorePayload,
      },
    };
    await AssessmentSession.update(payload);

    // get current section questions
    let relPayload: any = {
      uas_id: session_id,
      section_id: current_section_id,
      previous_section_id: previous_section_id,
    };
    await UserAssessmentRender.create(relPayload);
    setCurrentSectionLoading(null);
  };

  return (
    <div className="space-y-2">
      <div className="text-lg font-medium">Section Overview</div>

      <div className="border border-border-light divide-y">
        {result?.user_assessment_session?.section_analysis_data &&
          result?.user_assessment_session?.section_analysis_data?.map(
            (section: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 px-4">
                <div className="space-y-2">
                  <div className="text-violet-100 text-lg font-medium flex item-center gap-2">
                    {section?.name}
                    <small>
                      ( {section?.group_by ? handleGroupType(section?.group_by) : "-"} )
                    </small>
                  </div>
                  <div className="w-full flex divide-x whitespace-nowrap">
                    <div className="w-full text-green-900 font-medium pr-3">
                      {section?.results?.correct_answers} Correct
                    </div>
                    <div className="w-full text-red-900 font-medium px-3">
                      {section?.results?.wrong_answers} Incorrect
                    </div>
                    {/* <div className="w-full text-[#080708] font-medium px-3">
                      {section?.results?.answered_answers} Answered
                    </div> */}
                    <div className="w-full text-[#080708] font-medium px-3">
                      {section?.results?.unanswered_answers + section?.results?.unvisited_answers}{" "}
                      Omitted
                      {/* Unanswered */}
                    </div>
                    <div className="w-full text-[#080708] font-medium px-3">
                      {section?.results?.total_no_of_questions} Total Questions
                    </div>
                    {/* <div className="w-full text-[#080708] font-medium px-3">
                      {section?.results?.visited_answers} Visited
                    </div> */}
                    <div className="w-full text-[#080708] font-medium px-3">
                      {section?.results?.unvisited_answers} Unvisited
                    </div>
                    <div className="w-full text-[#080708] font-medium px-3">
                      {section?.results?.over_all_percentage > 0
                        ? parseFloat(section?.results?.over_all_percentage).toFixed(2)
                        : 0}
                      {"% "}
                      Accuracy
                    </div>
                  </div>
                </div>
                {section?.results?.total_no_of_questions <= 0 &&
                  section?.type === "ADAPTIVE" &&
                  process.env.NEXT_PUBLIC_LOCAL_ENVIRONMENT === "local" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        processSectionQuestions(
                          result?.user_assessment_session?.id,
                          section?.id,
                          result?.user_assessment_session?.section_analysis_data[index - 1]?.id,
                          result?.user_assessment_session?.section_analysis_data[index - 1]?.results
                            ?.correct_answers
                        )
                      }
                      disabled={currentSectionLoading != null}
                    >
                      {currentSectionLoading === section?.id ? "Loading..." : "Recalculate"}
                    </Button>
                  )}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default SectionOverview;
