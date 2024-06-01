import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IProps {
  block: any;
  result: any;
}

const BlockPreviewMCQ: React.FC<IProps> = ({ block, result }) => {
  return (
    <>
      {/* options */}
      {block && block?.options && block?.options.length > 0 ? (
        <div className="p-3">
          <div className="text-bold text-gray-500 pb-2">Options</div>
          {block?.options.map((field: any, index: number) => (
            <div key={index} className="flex items-center gap-2 pb-3">
              <div
                className={`border border-solid flex-shrink-0 flex h-[26px] w-[26px] cursor-move items-center justify-center 
                ${
                  !result?.result?.is_user_answered
                    ? result?.result?.answers.includes(field.hash)
                      ? "bg-violet-100 text-white"
                      : `border-violet-100`
                    : result?.result?.is_correct
                    ? result?.result?.answers.includes(field.hash)
                      ? "bg-green-900 text-white"
                      : `border-violet-100`
                    : result?.result?.user_answers.includes(field.hash)
                    ? "bg-red-900 text-white border-red-900"
                    : result?.result?.answers.includes(field.hash)
                    ? "bg-green-900 text-white"
                    : `border-violet-100`
                } 
                ${!block?.multiple ? `rounded-full` : `rounded-sm`}`}
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
    </>
  );
};

export default BlockPreviewMCQ;
