import React from "react";
// components
import KatexRender from "@components/Katex";

interface IQuestionSPR {
  block: any;
  setBlock: any;
  handleBlock: any;
}

const QuestionSPR: React.FC<IQuestionSPR> = ({ block, setBlock, handleBlock }) => {
  const updateAnswer = (key: any) => {
    handleBlock("answers", [key]);
  };

  return (
    <>
      <div className="p-3 border-b border-gray-300">
        <div className="space-y-2">
          <div className="pb-1 text-sm font-medium text-gray-500">Enter your Answer:</div>
          <input
            type="text"
            className="border border-border-light outline-none px-4 py-2 w-full"
            placeholder={`Enter your Answer`}
            value={block?.answers ? block?.answers[0] : ""}
            onChange={(e: any) => updateAnswer(e.target.value)}
          />
          <div className="pb-1 text-sm font-medium text-gray-500">Preview:</div>
          <div>
            {block?.answers && block?.answers.length > 0 && block?.answers[0] && (
              <KatexRender equation={block?.answers} block={true} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionSPR;
