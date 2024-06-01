import React from "react";
// headless ui
import { Transition, Popover } from "@headlessui/react";
// hero icons
import { ChevronDownIcon } from "@heroicons/react/solid";
import SearchIcon from "@ui/icons/searchIcon";

export interface ISelectMultipleSearchFilterOptions {
  key: string | null;
  title: string;
  data?: Object | null;
}

interface ISelectMultipleSearchFilter {
  placeHolder?: string;
  options: ISelectMultipleSearchFilterOptions[];
  handleOption: (key: string[] | null, data: Object | null) => void;
  selectedOptions: string[] | null;
  multiple?: boolean;
  disabled?: boolean;
  search?: boolean;
  position?: "left" | "right";
}

const SelectMultipleSearchFilter: React.FC<ISelectMultipleSearchFilter> = ({
  placeHolder,
  options,
  handleOption,
  selectedOptions,
  multiple = false,
  disabled = false,
  search = true,
  position = "left",
}) => {
  const handleCurrentOption = (optionId: string, optionData: Object | null) => {
    if (multiple) {
      handleOption(
        selectedOptions
          ? selectedOptions.includes(optionId)
            ? selectedOptions.filter((_option) => _option != optionId)
            : [...selectedOptions, optionId]
          : [optionId],
        optionData
      );
    } else {
      handleOption([optionId], optionData);
    }
    setSearchInput("");
  };

  const [searchInput, setSearchInput] = React.useState("");
  const renderSearchOptions = (options: any) => {
    let returnOptions = [...options];

    if (searchInput && searchInput.length > 0 && returnOptions.length > 0) {
      returnOptions = returnOptions.filter((_option: any) =>
        _option && _option.title.toLowerCase().includes(searchInput.toLowerCase()) ? true : false
      );
    }

    return returnOptions;
  };

  let reasonErrorTypeReadingAndWritingOptions = [
    { key: "clicking_error", title: "Clicking error" },
    { key: "not_read_all_options", title: "Did not read all options" },
    { key: "not_follow_correct_steps", title: "Did not follow the correct steps " },
    { key: "did_not_identify_question_type", title: "Didn't identify the question type " },
    { key: "could_not_choose_between_two_options", title: "Couldn't choose between two options " },
    { key: "did_not_notice_a_trap", title: "Didn't notice a trap " },
    {
      key: "not_read_all_keywords_of_the_question",
      title: "Did not read all keywords of the question",
    },
  ];

  let reasonErrorTypeMathOptions = [
    { key: "conceptual_error ", title: "Conceptual error " },
    { key: "calculation_error ", title: "Calculation error " },
    { key: "reading_error", title: "Reading error" },
    { key: "graph_based_error", title: "Graph based error" },
  ];

  const renderQuestionType = (_key: string) => {
    let currentQuestion = reasonErrorTypeReadingAndWritingOptions?.find(
      (_qType) => _qType?.key == _key
    );
    if (!currentQuestion)
      currentQuestion = reasonErrorTypeMathOptions?.find((_qType) => _qType?.key == _key);
    if (currentQuestion) return `${currentQuestion?.title}`;
  };

  return (
    <div className="w-full">
      <Popover className={"relative"}>
        <Popover.Button
          disabled={disabled === true}
          className="border inline-flex w-full justify-between items-center rounded bg-transparent text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
        >
          <div className={`font-medium text-sm cursor-pointer px-2 py-2`}>
            {selectedOptions && selectedOptions.length > 0 ? (
              <div className="flex flex-grow flex-wrap gap-2 items-center">
                {selectedOptions.map((_option, _optionIndex: number) => (
                  <div
                    className="border rounded px-2 w-full max-w-[300px] line-clamp-1"
                    key={_optionIndex}
                  >
                    {renderQuestionType(_option)}
                  </div>
                ))}
              </div>
            ) : placeHolder ? (
              placeHolder
            ) : (
              "Select"
            )}
          </div>
          <div className="w-[24px] h-[24px] flex justify-center items-center">
            <ChevronDownIcon
              className="h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </div>
        </Popover.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className={`mb-4 z-20 absolute ${
              position === "left" ? `left-0` : `right-0`
            } mt-2 w-[400px] max-h-[190px] overflow-hidden origin-top-left rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none whitespace-nowrap flex flex-col`}
          >
            <div className="px-1 py-1 space-y-1 w-full h-full overflow-y-auto">
              {search && (
                <div className="flex-shrink-0 text-sm flex items-center gap-2 px-3 py-1 border-b border-gray-200">
                  <div className="w-[24px] h-[24px] flex-shrink-0 flex justify-center items-center">
                    <SearchIcon width="14" height="14" />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder={placeHolder}
                      className="outline-none w-full h-full"
                      value={searchInput}
                      onChange={(e: any) => setSearchInput(e.target.value)}
                    />
                  </div>
                  {searchInput && searchInput.length > 0 && (
                    <div
                      className="text-gray-400 hover:text-gray-500 cursor-pointer"
                      onClick={() => {
                        setSearchInput("");
                      }}
                    >
                      Clear
                    </div>
                  )}
                </div>
              )}

              {(renderSearchOptions(reasonErrorTypeReadingAndWritingOptions) &&
                renderSearchOptions(reasonErrorTypeReadingAndWritingOptions).length > 0) ||
              (renderSearchOptions(reasonErrorTypeMathOptions) &&
                renderSearchOptions(reasonErrorTypeMathOptions).length > 0) ? (
                <div>
                  <div className="text-sm bg-gray-200 pl-2 py-1 font-medium my-1">
                    Reading and Writing
                  </div>
                  {renderSearchOptions(reasonErrorTypeReadingAndWritingOptions).map(
                    (_option, index) => (
                      <div key={index}>
                        <div
                          onClick={() => {
                            handleCurrentOption(_option.key, _option?.data || null);
                          }}
                          className="relative hover:bg-gray-300 rounded px-2 py-1 text-sm cursor-pointer  "
                        >
                          <span className="relative break-words w-full">{_option.title}</span>
                        </div>
                      </div>
                    )
                  )}
                  <div className="text-sm bg-gray-200 pl-2 py-1 font-medium my-1">Math</div>
                  {renderSearchOptions(reasonErrorTypeMathOptions).map((_option, index) => (
                    <div key={index}>
                      <div
                        onClick={() => {
                          handleCurrentOption(_option.key, _option?.data || null);
                        }}
                        className="relative hover:bg-gray-300 rounded px-2 py-1 text-sm cursor-pointer  "
                      >
                        <span className="relative break-words w-full">{_option.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-sm text-gray-400">No filtered options are available.</div>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default SelectMultipleSearchFilter;
