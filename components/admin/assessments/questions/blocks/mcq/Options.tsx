import React from "react";
// uuid
import { v4 as uuidv4 } from "uuid";
// icons
import { XIcon, PlusIcon } from "@heroicons/react/outline";
// components
import Button from "@components/buttons";
import LexicalEditor from "components/lexical/Editor";
// api-services
import { Option } from "lib/services/assessment.service";

interface IProps {
  block: any;
  setBlock: any;
  handleBlock: any;
}

const MCQForm: React.FC<IProps> = ({ block, setBlock, handleBlock }) => {
  const addOption = async () => {
    handleBlock("mcq_option_loading", true);
    try {
      let response: any = await Option.create({
        data: "",
        hash: uuidv4(),
        question: block?.id,
        sequence:
          block?.options?.length > 0
            ? block?.options[block?.options.length - 1]?.sequence + 65535
            : 65535,
      });
      setBlock({
        ...block,
        options: [...block?.options, response],
        mcq_option_loading: false,
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const updateOption = (data: any, index: number) => {
    let option = block?.options[index];
    option = { ...option, data: data };
    setBlock({
      ...block,
      options: block?.options.map((oldElement: any, i: Number) =>
        i === index ? option : oldElement
      ),
    });
  };

  const deleteOption = (index: number) => {
    let option = block?.options[index];
    Option.delete(option?.id)
      .then((response) => {
        setBlock({
          ...block,
          options: block?.options.filter(
            (oldElement: any, i: Number) => oldElement?.id != option?.id
          ),
          answers: block?.answers.filter((answer: any) => answer !== option?.hash),
        });
      })
      .catch((error) => console.error("error", error));
  };

  const updateAnswer = (key: any) => {
    if (block?.multiple) {
      if (block?.answers?.includes(key))
        handleBlock(
          "answers",
          block?.answers?.filter((answer: any) => answer !== key)
        );
      else handleBlock("answers", [...block?.answers, key]);
    } else {
      handleBlock("answers", [key]);
    }
  };

 

  return (
    <>
      <div className="p-2">
        <div className="space-y-2">
          <div className="pb-1 text-sm font-medium text-gray-500">Options</div>

          <div className="space-y-1">
            {block?.options.map((field: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
               
                <div
                  className="flex w-full items-center gap-2 rounded border border-solid border-gray-100 px-2"
                  key={field.id}
                >
                  <div className="">
                    <input
                      id="mcq-options"
                      className={`${
                        block?.multiple ? `form-checkbox rounded` : `form-radio`
                      } border border-solid border-gray-300 text-[#1089ff] ring-0 focus:ring-0 cursor-pointer`}
                      type={block?.multiple ? "checkbox" : "radio"}
                      value={field.hash}
                      name="options"
                      checked={
                        block?.answers && block?.answers?.includes(field.hash) ? true : false
                      }
                      onChange={() => updateAnswer(field.hash)}
                      onClick={() => updateAnswer(field.hash)}
                    />
                  </div>

                  <div className="w-full">
                    <LexicalEditor
                      id={field.hash}
                      data={
                        field.data && field.data?.name && field.data?.name !== null
                          ? field.data?.name
                          : field.data && field.data.content && field.data.content !== null
                          ? field.data.content
                          : field.data && field.data !== null
                          ? field.data
                          : null
                      }
                      onChange={(data: any) => updateOption(data, index)}
                    />
                  </div>

                  <div
                    className="w-[24px] h-[24px] flex justify-center items-center rounded cursor-pointer border border-solid border-gray-100 hover:bg-gray-100"
                    onClick={() => deleteOption(index)}
                  >
                    <XIcon className="h-4 w-4 cursor-pointer text-gray-700" fill="#a7a7a7" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button
              size="sm"
              onClick={addOption}
              disabled={block?.mcq_option_loading}
              className="flex gap-2 items-center"
            >
              <PlusIcon className="h-[16px] w-[16px]" />
              {block?.mcq_option_loading ? "Processing..." : "Add option"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MCQForm;
