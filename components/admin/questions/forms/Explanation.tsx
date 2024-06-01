import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IExplanationContent {
  block: any;
  handleBlock: any;
  setBlock: any;

}

const ExplanationContent: React.FC<IExplanationContent> = ({ block, handleBlock,setBlock }) => {
  return (
    <div className="p-3">
      <div className="pb-1 text-sm font-medium text-gray-500">Explanation</div>
      <Editor
        id={block?.id}
        data={block?.explanation && block?.explanation !== null ? block?.explanation : null}
        onChange={(data: any,html_string:any,string:any) => { 
          setBlock({
            ...block,
            explanation:data,
            explanation_html:html_string,
            explanation_text:string,
          })
         } }
      />
    </div>
  );
};

export default ExplanationContent;