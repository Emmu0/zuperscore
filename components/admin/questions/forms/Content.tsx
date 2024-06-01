import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IQuestionContent {
  block: any;
  handleBlock: any;
  setBlock: any;
}

const QuestionContent: React.FC<IQuestionContent> = ({ block, handleBlock,setBlock }) => {
  return (
    <div className="p-3 border-b border-gray-300">
      <div className="pb-1 text-sm font-medium text-gray-500">Question</div>
      <Editor
        id={block?.id}
        data={block?.content && block?.content !== null ? block?.content : null}
        onChange={(data: any,html_string:any,string:any) => { 
          setBlock({
            ...block,
            content:data,
            content_html:html_string,
            content_text:string,
          })
         } }
      />
    </div>
  );
};

export default QuestionContent;
