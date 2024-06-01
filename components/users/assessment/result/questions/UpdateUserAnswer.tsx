import React from "react";
// components
import Editor from "@components/lexical/Editor";
import Button from "@components/buttons";
// api services
import { AssessmentAttempt } from "lib/services/user.assessment.service";

interface IProps {
  view: any;
  block: any;
  result: any;
  session_id: any;
}

const UpdateUserAnswer: React.FC<IProps> = ({ view = "student", block, result, session_id }) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [currentAnswer, setCurrentAnswer] = React.useState<any>(null);

  const handleMCQBlock = (hash: any) => {
    let payload: any = [hash];
    setCurrentAnswer(payload);
  };

  const handleSPRBlock = (value: any) => {
    let payload: any = [value];
    setCurrentAnswer(payload);
  };

  const inputRef = React.useRef<any>();
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let str = event.target.value;
    const position = inputRef.current.selectionStart;
    if ((str.includes("-") && str.length <= 6) || (!str.includes("-") && str.length <= 5))
      if ((45 <= str.charCodeAt(position - 1) && str.charCodeAt(position - 1) <= 57) || str === "")
        handleSPRBlock(event.target.value);
  };

  const updateAttempt = () => {
    if (currentAnswer && currentAnswer != null) {
      setButtonLoader(true);
      let payload = {
        id: result?.attempt_id,
        data: { user_answer: currentAnswer },
        is_visited: true,
        is_answered: true,
      };
      AssessmentAttempt.update(payload)
        .then((response) => {
          setButtonLoader(false);
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    } else {
      alert("Please select or fill the field");
    }
  };

  return (
    <>
      {/* {result?.attempt_id && result?.result?.is_visited && !result?.result?.is_user_answered && (
        <>
          <div className="p-3 border-t border-gray-300">
            <div className="text-bold text-gray-500 select-none cursor-pointer pb-3">
              <div>Developer Control</div>
            </div>
            <div>
              {block?.type === "MCQ" ? (
                <>
                  {block && block?.options && block?.options.length > 0 ? (
                    <div>
                      {block?.options.map((field: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 pb-3 cursor-pointer"
                          onClick={() => handleMCQBlock(field.hash)}
                        >
                          <div
                            className={`border border-solid flex-shrink-0 flex h-[26px] w-[26px] items-center justify-center 
                            ${
                              currentAnswer &&
                              currentAnswer != null &&
                              currentAnswer.includes(field.hash)
                                ? `border-violet-100 bg-violet-100 text-white`
                                : ``
                            } rounded-full`}
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
                                    : field.data &&
                                      field.data.content &&
                                      field.data.content !== null
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
                    <div className="text-sm text-muted p-2">Options are not created yet</div>
                  )}
                </>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  className="border-2 border-black outline-none px-4 py-2 rounded-md"
                  placeholder={`Enter your Answer`}
                  value={(currentAnswer && currentAnswer != null && currentAnswer[0]) || ""}
                  onChange={handleOnInputChange}
                />
              )}

              <div className="flex items-center gap-2 mt-2 whitespace-nowrap">
                <Button
                  size="sm"
                  variant={"primary"}
                  onClick={updateAttempt}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default UpdateUserAnswer;
