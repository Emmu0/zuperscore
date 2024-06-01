import React from "react";
// recoil
import {  useSetRecoilState, useRecoilState } from "recoil";
// components
import Button from "../helpers/button";
import Timer from "../global/Timer";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const SectionBreak: React.FC = () => {
  const [sections, recoilSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, recoilSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);

  const recoilAssessmentDefaultSet = useSetRecoilState(assessmentRecoil.assessmentDefaultSelector);

  const handleTimerEnd = () => {
    recoilAssessmentDefaultSet({
      type: "update",
      data: {
        onlineCurrentView: "TEST",
      },
    });
  };

  const renderCurrentTimer = () => {
    let timer = 0;
    if (sections && sectionIndex >= 0) {
      timer = sections[sectionIndex - 1]?.data?.section?.timers?.break_time | 0;
      timer = timer >= 0 ? timer * 60 : 0;
    }
    return timer;
  };

  return (
    <>
      <div className="bg-[#1e1e1e] relative h-full w-full overflow-hidden">
        <div className="mx-auto container w-full h-full flex items-center text-white">
          <div className="w-full flex flex-col justify-center items-center p-5">
            <div className="border border-border-light px-8 py-2 inline-flex flex-col justify-center items-center rounded-md">
              <div className="font-semibold">Remaining Break Time:</div>
              <div className="text-6xl pt-2 font-bold">
                <Timer startTime={renderCurrentTimer()} handleTimerEnd={handleTimerEnd} />
              </div>
            </div>

            <div className="py-8">
              <Button variant="warning" onClick={handleTimerEnd}>
                <div className="!text-dark">Continue Testing</div>
              </Button>
            </div>

            {/* <div>
              {profile?.user?.first_name || "First"} {profile?.user?.last_name || "Last"}
            </div> */}
          </div>

          <div className="text-white w-full space-y-10 p-5">
            <div>
              <div className="text-3xl font-semibold">Practice Test Break</div>
              <div className="pt-3">
                You can resume this practice test as soon as you{"'"}re ready to move on. On Test
                Day, you{"'"}ll wait until the clock counts down. Read below to see how breaks work
                on test day.
              </div>
            </div>

            <div className="bg-gray-200 h-1 w-full"></div>

            <div className="w-full">
              <div className="text-3xl font-semibold">Take a break</div>
              <div className="pt-3">
                You may leave the room, but don{"'"}t disturb the students who are still testing.
                <div className="pt-5">Do not exit the app or close your laptop.</div>
                <div className="pt-5">Testing wont resume until you return.</div>
                <div className="pt-5 text-lg font-semibold">
                  Follow these rules during the break:
                </div>
                <ol>
                  <li>1. Do not access your phones, textbooks, notes or the internet</li>
                  <li>2. Do not eat or drink in the test room.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionBreak;
