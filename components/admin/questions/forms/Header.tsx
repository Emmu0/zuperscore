import React from "react";
// headless ui
import { Switch } from "@headlessui/react";

interface IProps {
  block: any;
  handleBlock: any;
  setBlock: any;
}

const QuestionHeader: React.FC<IProps> = ({ block, handleBlock, setBlock }) => {
  const handleCurrentBlockChange = () => {
    setBlock({
      ...block,
      type: block?.type === "MCQ" ? "SPR" : "MCQ",
      title: block?.title,
      content: null,
      content_html: null,
      content_text: null,
      multiple: false,
      options: [],
      answers: [],
    });
  };

  return (
    <div className="flex items-center text-sm gap-4 p-3 border-b border-gray-300">
      {/* type */}
      <div
        className="border border-violet-100 text-violet-100 rounded-sm px-1 py-0.5 cursor-pointer flex items-center gap-2"
        onClick={handleCurrentBlockChange}
      >
        <div>{block?.type}</div>
        <div>
          ({block?.type === "MCQ" && "Multiple Choice Questions"}
          {block?.type === "SPR" && "Student Produced Response"})
        </div>
      </div>

      {/* multiple answers check only for MCQ */}
      {/* <div className="ml-auto">
        {block && block?.type === "MCQ" && block?.options.length >= 0 && (
          <div className="flex gap-1 items-center text-sm text-gray-500 cursor-pointer ml-auto">
            <div className="relative">
              <Switch
                checked={block?.multiple}
                onChange={() => handleBlock("multiple", !block?.multiple)}
                style={{ backgroundColor: block?.multiple ? "#721154" : "#8B8B8B" }}
                className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    block?.multiple ? "translate-x-4" : "translate-x-0"
                  } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <span
              className="text-xs font-bold"
              onClick={() => handleBlock("multiple", !block?.multiple)}
            >
              Multiple Answers
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default QuestionHeader;
