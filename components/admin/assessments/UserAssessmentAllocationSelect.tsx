import React from "react";
// headless ui
import { Menu, Transition } from "@headlessui/react";
// hero icons
import { ChevronDownIcon, XIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";

export interface ISelectOptions {
  key: string;
  title: string;
  data?: Object | null;
}

interface ISelect {
  placeHolder?: string;
  options: ISelectOptions[];
  handleOption: (key: any, data: Object | null) => void;
  selectedOptions: any | null;
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
  const renderQuestionType = (_key: any) => {
    let currentQuestion = options?.find((_qType) => _qType?.key == _key?.assessment_id);
    if (currentQuestion) return currentQuestion?.title;
  };

  const handleCurrentOption = (optionId: any, optionData: Object | null) => {
    if (multiple) {
      handleOption(
        selectedOptions
          ? selectedOptions.find((_item: any) => _item?.assessment_id === optionId)
            ? selectedOptions.filter((_option: any) => _option.assessment_id != optionId)
            : [...selectedOptions, { assessment_id: optionId, times: 1 }]
          : [{ assessment_id: optionId, times: 1 }],
        optionData
      );
    } else {
      handleOption([{ assessment_id: optionId, times: 1 }], optionData);
    }
  };

  const handleCurrentOptionTimer = (options: any, kind: "add" | "subtract") => {
    let currentTime =
      kind === "add" ? options?.times + 1 : options.times > 1 ? options?.times - 1 : options?.times;

    handleOption(
      selectedOptions
        ? selectedOptions.find((_item: any) => _item?.assessment_id === options?.assessment_id)
          ? selectedOptions.map((_option: any) =>
              _option.assessment_id != options?.assessment_id
                ? _option
                : { ..._option, times: currentTime }
            )
          : [...selectedOptions, { assessment_id: options?.assessment_id, times: currentTime }]
        : [{ assessment_id: options?.assessment_id, times: currentTime }],
      null
    );
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button
          disabled={disabled === true}
          className="border inline-flex w-full justify-between items-center rounded bg-transparent text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
        >
          <div className={`font-medium text-sm cursor-pointer px-2 py-2`}>Add Assessment</div>
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
                options.map((_option, index) => (
                  <div key={index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => handleCurrentOption(_option.key, _option?.data || null)}
                          className={`${
                            selectedOptions &&
                            selectedOptions.find(
                              (_item: any) => _item?.assessment_id === _option.key
                            )
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

      {/* rendering the questions */}
      <div className="text-sm text-dark-100 my-2 mt-4">Selected Assessments</div>
      {selectedOptions && selectedOptions.length > 0 ? (
        <>
          <div className="mt-2 border rounded-sm divide-y select-none">
            {selectedOptions.map((_option: any, _optionIndex: number) => (
              <div className="px-2 py-1 flex items-center gap-4" key={_optionIndex}>
                <div className="text-sm">{renderQuestionType(_option)}</div>
                <div className="flex items-center gap-2 ml-auto">
                  <div
                    className="border border-gray-300 w-[20px] h-[20px] rounded-sm flex justify-center items-center text-gray-400 hover:text-gray-600 hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleCurrentOptionTimer(_option, "subtract")}
                  >
                    <MinusIcon className="h-3 w-3" aria-hidden="true" />
                  </div>
                  <div>{_option?.times}</div>
                  <div
                    className="border border-gray-300 w-[20px] h-[20px] rounded-sm flex justify-center items-center text-gray-400 hover:text-gray-600 hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleCurrentOptionTimer(_option, "add")}
                  >
                    <PlusIcon className="h-3 w-3" aria-hidden="true" />
                  </div>
                </div>
                <div
                  className="border border-gray-300 w-[20px] h-[20px] rounded-sm flex justify-center items-center text-gray-400 hover:text-gray-600 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handleCurrentOption(_option.assessment_id, null)}
                >
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-sm py-5 text-gray-500">No Assessments are allocated.</div>
      )}
    </div>
  );
};

export default Select;
