import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IProps {
  block: any;
  handleCurrentBlock?: any;
  from?: string;
}

const BlockPreviewMCQ: React.FC<IProps> = ({ block, handleCurrentBlock, from }) => {
  return (
    <div>
      {/* options */}
      {block && block?.options && block?.options.length > 0 ? (
        <div
          className="p-3"
          onClick={() => {
            if (from === "subjects") handleCurrentBlock("edit", block);
          }}
        >
          <div className="text-bold text-gray-500 pb-2">Options</div>
          {block?.options.map((field: any, index: number) => (
            <div key={index} className="flex items-center gap-2 pb-3">
              <div
                className={`border border-solid border-violet-100 flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px] cursor-move items-center justify-center hover:bg-gray-100 ${
                  block?.data?.answers &&
                  block?.data?.answers.length > 0 &&
                  block?.data?.answers.includes(field.hash) &&
                  `bg-violet-100 text-yellow-100`
                } ${!block?.multiple ? `rounded-full` : `rounded-sm`}`}
              >
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]}
              </div>

              <div className="flex w-full items-center gap-2 rounded-sm" key={field.id}>
                <div className="w-full">
                  <Editor
                    id={field.hash}
                    readOnly={true}
                    data={
                      field.data && field.data?.name && field.data?.name !== null
                        ? field.data?.name
                        : field.data && field.data.content && field.data.content !== null
                        ? field.data.content
                        : field.data && field.data !== null
                        ? field.data
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted p-2"> Options are not created yet</div>
      )}
    </div>
  );
};

export default BlockPreviewMCQ;
