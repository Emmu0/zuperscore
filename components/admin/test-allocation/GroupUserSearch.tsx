import React from "react";
// headless ui
import { Menu, Transition } from "@headlessui/react";
// hero icons
import { ChevronDownIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@ui/icons";

export interface ISelectOptions {
  key: string;
  title: string;
  data?: Object | null;
}

interface ISelect {
  placeHolder?: string;
  options: ISelectOptions[];
  handleOption: (key: string[], data: Object | null, title: string) => void;
  selectedOptions: string[] | null;
  multiple?: boolean;
  disabled?: boolean;
  error?: any;
  query?: string;
  setQuery?: any;
}

const GroupUserSearch: React.FC<ISelect> = ({
  placeHolder,
  options,
  handleOption,
  selectedOptions,
  multiple = false,
  disabled = false,
  error = null,
  query,
  setQuery,
}) => {
  const renderQuestionType = (_key: string) => {
    let currentQuestion = options?.find((_qType) => _qType?.key == _key);
    if (currentQuestion) return currentQuestion?.title;
  };

  const handleCurrentOption = (
    optionId: string,
    optionData: Object | null,
    optionTitle: string
  ) => {
    if (multiple) {
      handleOption(
        selectedOptions
          ? selectedOptions.includes(optionId)
            ? selectedOptions.filter((_option) => _option != optionId)
            : [...selectedOptions, optionId]
          : [optionId],
        optionData,
        optionTitle
      );
    } else {
      handleOption([optionId], optionData, optionTitle);
    }
  };

  return (
    <div>
      <Menu
        as="div"
        className={`relative inline-block text-left w-full ${
          error ? `border bg-red-100 border-red-500` : ``
        }`}
      >
        <Menu.Button
          disabled={disabled === true}
          className="border inline-flex w-full justify-between items-center rounded bg-transparent text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
        >
          <div className={`font-medium text-sm cursor-pointer px-2 py-2`}>
            {selectedOptions && selectedOptions.length > 0 && !multiple ? (
              <div className="flex flex-grow flex-wrap gap-2 items-center">
                {selectedOptions.map((_option, _optionIndex: number) => (
                  <div className="border rounded px-2" key={_optionIndex}>
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
        </Menu.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="mb-4 z-20 absolute left-0 mt-2 w-auto m-w-[400px] max-h-[190px] overflow-hidden overflow-y-auto origin-top-left px-2 py-2 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none whitespace-nowrap">
            <div className="flex w-full items-center justify-start rounded-sm border bg-gray-100 px-2 text-gray-500 mb-2">
              <SearchIcon className="flex-shrink-0 h-3 w-3" />
              <input
                className="w-full bg-transparent py-1 px-2 text-xs focus:outline-none"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === " " && event.target === document.activeElement) {
                    event.preventDefault();
                  }
                }}
              />
              <div
                className="flex-shrink-0 cursor-pointer hover:bg-gray-300 rounded-sm"
                onClick={() => {
                  setQuery("");
                }}
              >
                X
              </div>
            </div>
            <div className="px-1 py-1 space-y-1 overflow-auto">
              {options &&
                options.length > 0 &&
                options.map((_option, index) => (
                  <div key={index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() =>
                            handleCurrentOption(_option.key, _option?.data || null, _option?.title)
                          }
                          className={`${
                            selectedOptions && selectedOptions.includes(_option.key)
                              ? "bg-gray-300"
                              : active
                              ? "bg-gray-100 text-black"
                              : "text-gray-800"
                          } group flex w-full items-center rounded px-2 py-1 text-sm cursor-pointer`}
                        >
                          {_option.title}
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default GroupUserSearch;
