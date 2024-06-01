import React from "react";
// headless ui
import { Menu, Transition } from "@headlessui/react";
// hero icons
import { ChevronDownIcon } from "@heroicons/react/solid";

export interface IDropdownOptions {
  title: string;
  onClick: () => void;
}

interface IDropdown {
  placeHolder?: React.ReactNode | string;
  options: IDropdownOptions[];
  disabled?: boolean;
  mode?: "light" | "dark";
}

const Dropdown: React.FC<IDropdown> = ({
  placeHolder,
  options,
  disabled = false,
  mode = "light",
}) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          disabled={disabled === true}
          className={`${
            mode === "light" ? "border border-gray-300  text-gray-700" : " text-white"
          }  inline-flex w-auto max-w-[300px] justify-between items-center rounded bg-transparent text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden`}
        >
          <div className={`font-medium text-sm cursor-pointer px-2 py-1.5`}>
            {placeHolder ? placeHolder : "Select"}
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
                options.map((_option, index) => (
                  <div key={index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={_option.onClick}
                          className={`text-gray-800 hover:bg-gray-200 group flex w-full items-center rounded px-2 py-1 text-sm cursor-pointer`}
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

export default Dropdown;
