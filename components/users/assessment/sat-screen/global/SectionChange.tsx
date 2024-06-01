import React from "react";
// recoil
import { useRecoilState } from "recoil";
// components
import Button from "../helpers/button";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const SectionChange = ({ renderQuestionDetails }: any) => {
  const [onlineCurrentView, recoilOnlineCurrentView] = useRecoilState(
    assessmentRecoil.onlineCurrentView
  );
  const [messageIndex, setMessageIndex] = React.useState(0);
  const timeoutRef: any = React.useRef(null);
  const message = [
    "",
    "Fetching test data...",
    "Loading questions...",
    "Loading the test interface...",
    "Almost there, just a few more seconds...",
  ];

  React.useEffect(() => {
    if (onlineCurrentView === "SECTION-CHANGE") {
      timeoutRef.current = setTimeout(() => {
        if (onlineCurrentView === "SECTION-CHANGE") {
          const currentIndex = (messageIndex + 1) % message.length;
          setMessageIndex(currentIndex);
        }
      }, 5000);
    }
  }, [onlineCurrentView, messageIndex, message.length]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-center space-y-5">
          <div className="text-3xl text-blue-500">This module is over</div>
          <div className="text-gray-600 space-y-2">
            <div>All your work has been saved.</div>
            <div>You{"'"}ll move on automatically in just a moment.</div>
            <div>Do not refresh this page.</div>
          </div>
          <div className="text-violet-100 mt-2">{message[messageIndex]}</div>
          {/* {isEnabled && (
            <div className="flex flex-col w-full justify-center items-center text-center p-3">
              <div className="mb-4">Still stuck at this page?</div>
              {onlineCurrentView === "SECTION-CHANGE" && (
                <Button disabled={!isEnabled} onClick={handleClick}>
                  Next
                </Button>
              )}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SectionChange;
