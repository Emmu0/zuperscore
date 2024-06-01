import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IQuestionPassage {
  block: any;
  handleBlock: any;
  setBlock: any;
}

const QuestionPassage: React.FC<IQuestionPassage> = ({ block, handleBlock,setBlock }) => {
  return (
    <div className="p-3 border-b border-gray-300">
      <div className="pb-1 text-sm font-medium text-gray-500">Passage</div>
      <Editor
        id={block?.id}
        data={block?.passage && block?.passage !== null ? block?.passage : null}
        onChange={(data: any,html_string:any,string:any) => { 
          setBlock({
            ...block,
            passage:data,
            passage_html:html_string,
            passage_text:string,
          })
         } }
      />
    </div>
  );
};

export default QuestionPassage;
