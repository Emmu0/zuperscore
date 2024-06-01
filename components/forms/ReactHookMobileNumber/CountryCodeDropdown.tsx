import React from "react";
// headless ui
import { Menu, Transition } from "@headlessui/react";
// hero icons
import { ChevronDownIcon } from "@heroicons/react/solid";

interface ICountryCodeDropdown {
  watch: any;
  setValue?: any;
  disabled?: any;
}

const CountryCodeDropdown: React.FC<ICountryCodeDropdown> = ({ watch, setValue, disabled }) => {
  const questionTypes = [
    { title: "+91 (India)", value: "91" },
    // { title: "+1 (United States of America)", value: "1" },
    // { title: "+44 (United Kingdom)", value: "44" },
  ];

  const renderQuestionType = (value: any) => {
    let currentQuestion = questionTypes.find((_qType) => _qType?.value == value);
    if (currentQuestion) return currentQuestion?.title;
  };

  return (
    <>
      <Menu as="div" className="relative inline-block h-full">
        <Menu.Button
          disabled={disabled === true}
          className="w-auto h-[40px] flex justify-center items-center text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
        >
          <div className={`font-medium text-xs cursor-pointer px-2 py-1`}>
            {watch("country_code") ? renderQuestionType(watch("country_code")) : "Country Code"}
          </div>
          <div className="flex-shrink-0 w-[24px] flex justify-center items-center">
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
          <Menu.Items className="mb-4 z-20 absolute left-0 mt-2 w-auto m-w-[400px] origin-top-left rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none whitespace-nowrap">
            <div className="px-1 py-1 overflow-auto">
              {questionTypes &&
                questionTypes.length > 0 &&
                questionTypes.map((option, index) => (
                  <div key={"option-" + index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setValue("country_code", option?.value)}
                          className={`${
                            watch("type") === option?.value
                              ? "bg-gray-300"
                              : active
                              ? "bg-gray-100 text-black"
                              : "text-gray-800"
                          } group flex w-full items-center rounded px-2 py-2 text-sm cursor-pointer`}
                        >
                          {option.title}
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default CountryCodeDropdown;
