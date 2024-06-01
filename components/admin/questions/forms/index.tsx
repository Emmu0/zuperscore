import React from "react";
// components
import QuestionHeader from "./Header";
import QuestionPassage from "./Passage";
import QuestionContent from "./Content";
import QuestionTags from "./Tags";
import QuestionFilterTags from "./FilterTags";
import QuestionFooter from "./Footer";
import QuestionMCQ from "./mcq";
import QuestionSPR from "./spr";
import ExplanationContent from "./Explanation";

interface IQuestionForm {
  type?: any;
  data?: any;
  handleData?: any;
  setData?: any;
  buttonLoader?: any;
  onBlockUpdate?: any;
}

const QuestionForm: React.FC<IQuestionForm> = ({
  type = "create",
  data,
  handleData,
  setData,
  buttonLoader,
  onBlockUpdate,
}) => {

  return (
    <div className="border border-gray-300 rounded-sm">
      {/* header */}
      <QuestionHeader block={data} handleBlock={handleData} setBlock={setData} />

      {/* passage */}
      <QuestionPassage block={data} handleBlock={handleData} setBlock={setData} />

      {/* title */}
      <QuestionContent block={data} handleBlock={handleData} setBlock={setData} />

      {/* block content */}
      {/* MCQ */}
      {data && data?.type === "MCQ" && (
        <QuestionMCQ block={data} handleBlock={handleData} setBlock={setData} />
      )}
      {data && data?.type === "SPR" && (
        <QuestionSPR block={data} handleBlock={handleData} setBlock={setData} />
      )}
      {/* explanation */}
      <ExplanationContent block={data} handleBlock={handleData} setBlock={setData}  />

      {/* title */}
      <QuestionTags block={data} handleBlock={handleData}  />

      {/* question filter tags */}
      <QuestionFilterTags block={data} handleBlock={handleData} setBlock={setData} />

      {/* footer */}
      <QuestionFooter
        type={type}
        block={data}
        buttonLoader={buttonLoader}
        onBlockUpdate={onBlockUpdate}
      />
    </div>
  );
};

export default QuestionForm;
