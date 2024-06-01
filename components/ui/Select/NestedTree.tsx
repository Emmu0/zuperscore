import React from "react";
// headless ui
import { Menu, Transition } from "@headlessui/react";
// hero icons
import { ChevronDownIcon } from "@heroicons/react/solid";

export interface ISelectOptions {
  key: string;
  title: string;
  data?: Object | null;
}

interface ISelect {
  placeHolder?: string;
  options: ISelectOptions[];
  handleOption: (key: string[], data: Object | null) => void;
  selectedOptions: string[] | null;
  multiple?: boolean;
  disabled?: boolean;
}

const Select: React.FC<ISelect> = ({
  placeHolder,
  options,
  handleOption,
  selectedOptions,
  multiple = false,
  disabled = false,
}) => {
  const renderQuestionType = (_key: string) => {
    let currentQuestion = options?.find((_qType) => _qType?.key == _key);
    if (currentQuestion) return currentQuestion?.title;
  };

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
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button
          disabled={disabled === true}
          className="border inline-flex w-full justify-between items-center rounded bg-transparent text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
        >
          <div className={`font-medium text-sm cursor-pointer px-2 py-2`}>
            {selectedOptions && selectedOptions.length > 0 ? (
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
          <Menu.Items className="mb-4 z-20 absolute left-0 mt-2 w-auto m-w-[400px] max-h-[190px] overflow-hidden overflow-y-auto origin-top-left rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none whitespace-nowrap">
            <div className="px-1 py-1 space-y-1 overflow-auto">
              {options &&
                options.length > 0 &&
                options.map((_option: any, index: any) => (
                  <div key={index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => handleCurrentOption(_option.key, _option?.data || null)}
                          className={`${
                            active ? "bg-gray-100 text-black" : "text-gray-800"
                          } group flex w-full items-center gap-2 rounded pr-2 py-1 text-sm cursor-pointer`}
                          style={
                            _option?.padding > 0
                              ? { paddingLeft: `${_option?.padding + 10}px` }
                              : { paddingLeft: `${10}px` }
                          }
                        >
                          <div>
                            <input
                              type="checkbox"
                              className="accent-violet-100 mt-[5px]"
                              checked={
                                selectedOptions && selectedOptions.includes(_option.key)
                                  ? true
                                  : false
                              }
                            />
                          </div>
                          <div>{_option.title}</div>
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

export default Select;
