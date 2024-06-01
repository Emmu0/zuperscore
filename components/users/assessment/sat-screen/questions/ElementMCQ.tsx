import React from "react";
// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// components
import LexicalEditor from "components/lexical/Editor";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const ElementMCQ = ({ value, setValue, attempt, updateAttempt }: any) => {
  const [maskToggle, recoilMaskToggleSet] = useRecoilState(assessmentRecoil.maskToggle);

  const handleMcqOptions = (hash: any) => {
    if (value) {
      let payload: any = [...value?.answers];

      if (value?.multiple && payload) {
        if (payload.includes(hash)) payload = payload.filter((answer: any) => answer !== hash);
        else payload = [...payload, hash];
      } else payload = [hash];

      setValue("answers", [...payload]);
      // handle update epoch time
      let currentTime = Date.now();
      let existingEpochs = [...attempt?.time_taken?.no_of_attempts];
      existingEpochs[existingEpochs.length - 1] = {
        ...existingEpochs[existingEpochs.length - 1],
        end_time: currentTime,
        duration: Math.floor(
          (currentTime - existingEpochs[existingEpochs.length - 1]?.start_time) / 1000
        ),
      };

      let maskedOptions: any =
        maskToggle && attempt?.masked_options.includes(hash)
          ? attempt?.masked_options.filter((_maskOption: any) => _maskOption != hash)
          : attempt?.masked_options;

      updateAttempt(
        { user_answer: [...payload] },
        { no_of_attempts: existingEpochs },
        { ...attempt },
        maskedOptions
      );
    }
  };

  const validateMcqOptions = (hash: any) => {
    if (value && value?.answers.length > 0 && value?.answers.includes(hash)) return true;
    return false;
  };

  const handleMaskedOptions = (optionHash: any) => {
    let maskedOptions = attempt?.masked_options.includes(optionHash)
      ? attempt?.masked_options.filter((_maskOption: any) => _maskOption != optionHash)
      : [...attempt?.masked_options, optionHash];

    updateAttempt(
      {
        user_answer: attempt?.data?.user_answer.includes(optionHash)
          ? attempt?.data?.user_answer.filter((_maskOption: any) => _maskOption != optionHash)
          : attempt?.data?.user_answer,
      },
      { no_of_attempts: attempt?.time_taken?.no_of_attempts },
      { ...attempt },
      [...maskedOptions]
    );
  };

  return (
    <>
      {value && value?.options && value?.options.length > 0 ? (
        <div className="w-full">
          {value?.options.map((_option: any, _idx: number) => (
            <div key={_idx} className={`w-full flex items-center gap-2`}>
              <div
                className={`relative flex items-center gap-2 border-2 rounded-lg my-2 px-2 py-2 cursor-pointer w-full ${
                  validateMcqOptions(_option.hash) ? "border-[#0077C8] bg-[#0077C81A]" : ""
                } ${
                  maskToggle && attempt?.masked_options.includes(_option.hash) ? "opacity-50" : ""
                }`}
                onClick={() => handleMcqOptions(_option.hash)}
              >
                {/* strike through */}
                {maskToggle && attempt?.masked_options.includes(_option.hash) && (
                  <div
                    className={`w-full border border-gray-500 absolute left-0 right-0 mx-auto`}
                  ></div>
                )}

                <div
                  className={`border border-solid border-[#1e1e1e] flex-shrink-0 relative hover:border-gray-400 flex h-[26px] w-[26px] items-center justify-center hover:bg-gray-100 ${
                    validateMcqOptions(_option.hash) ? `border-[#0077C8] bg-[#0077C81A]` : ``
                  } ${!value?.multiple ? `rounded-full` : `rounded-sm`}`}
                >
                  {maskToggle && attempt?.masked_options.includes(_option.hash) && (
                    <div className="border border-gray-500 absolute left-[-5px] right-[-5px]"></div>
                  )}
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_idx]}
                </div>

                <div className={`relative flex w-full flex-grow items-center px-5 bg-opacity-10`}>
                  {_option?.data && (
                    <div className="w-full">
                      <LexicalEditor
                        data={
                          _option.data && _option.data?.name && _option.data?.name !== null
                            ? _option.data?.name
                            : _option.data && _option.data.content && _option.data.content !== null
                            ? _option.data.content
                            : _option.data && _option.data !== null
                            ? _option.data
                            : null
                        }
                        readOnly={true}
                      />
                    </div>
                  )}
                </div>
              </div>

              {maskToggle && (
                <>
                  <div
                    className={`flex-shrink-0`}
                    onClick={() => handleMaskedOptions(_option.hash)}
                  >
                    {attempt?.masked_options.includes(_option.hash) ? (
                      <div className="underline underline-offset-1 text-sm font-medium cursor-pointer">
                        Undo
                      </div>
                    ) : (
                      <div className="relative !w-[28px] !h-[28px] border border-gray-500 rounded-full cursor-pointer text-[14px] font-medium flex items-center justify-center mr-1">
                        <div className="border border-gray-500 absolute left-[-5px] right-[-5px]"></div>
                        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_idx]}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 text-center text-gray-500">No options are available.</div>
      )}
    </>
  );
};

export default ElementMCQ;
