import React from "react";
// head less UI
import { Menu, Transition } from "@headlessui/react";

interface Option {
  icon?: React.ReactElement;
  label: string;
  on_click: any;
}

const Dropdown = ({
  options,
  button,
  direction,
  position,
}: {
  options: Option[];
  button: JSX.Element;
  direction?: "left" | "right";
  position?: any;
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="py-1.5 px-1">{button}</Menu.Button>
      </div>

      <Transition as={React.Fragment}>
        <Menu.Items
          className={` ${
            direction && direction === "left"
              ? "left-0 origin-top-left"
              : "right-0 origin-top-right"
          } absolute w-56 ${position} z-20 mt-2 rounded-md bg-white ring-[1.5px] ring-black ring-opacity-5 focus:outline-none`}
        >
          {options &&
            options.length > 0 &&
            options.map((option: Option, index: Number) => (
              <div className="group my-1 cursor-pointer" key={"option-" + index}>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={option.on_click}
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700") +
                        " flex items-center gap-3 px-4 py-1.5 text-sm"
                      }
                    >
                      {option?.icon}
                      {option.label}
                    </div>
                  )}
                </Menu.Item>
              </div>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
