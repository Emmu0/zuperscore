import React from "react";
// components
import KatexRender from "@components/Katex";

const ElementSPR = ({ value, setValue, attempt, updateAttempt, mask, setMask }: any) => {
  const handleInt = (answer: any) => {
    if (value) {
      setValue("answers", answer && answer.length > 0 ? [answer] : []);

      // handle update epoch time
      let currentTime = Date.now();
      let existingEpochs = [...attempt?.time_taken?.no_of_attempts];
      existingEpochs[existingEpochs.length - 1] = {
        ...existingEpochs[existingEpochs.length - 1],
        end_time: currentTime,
        answered_time: currentTime,
        duration: Math.floor(
          (currentTime - existingEpochs[existingEpochs.length - 1]?.start_time) / 1000
        ),
      };

      updateAttempt(
        { user_answer: answer && answer.length > 0 ? [answer] : [] },
        { no_of_attempts: existingEpochs },
        { ...attempt }
      );
    }
  };

  const inputRef = React.useRef<any>();
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let str = event.target.value;
    const position = inputRef.current.selectionStart;
    if ((str.includes("-") && str.length <= 6) || (!str.includes("-") && str.length <= 5))
      if ((45 <= str.charCodeAt(position - 1) && str.charCodeAt(position - 1) <= 57) || str === "")
        handleInt(event.target.value);
  };

  return (
    <>
      <div className="space-y-2">
        <div className="pb-1 text-md font-bold">Enter Answer:</div>
        <input
          ref={inputRef}
          type="text"
          className="border-2 border-black outline-none px-4 py-2 rounded-md"
          placeholder={`Enter your Answer`}
          value={value.answers[0] || ""}
          // onChange={(e: any) => handleInt(e.target.value)}
          onChange={handleOnInputChange}
        />
        <div className="pb-1 text-md font-bold">Preview:</div>
        <div>
          {value?.answers && value?.answers.length > 0 && value?.answers && (
            <KatexRender equation={value.answers[0]} block={true} />
          )}
        </div>
      </div>
    </>
  );
};

export default ElementSPR;
