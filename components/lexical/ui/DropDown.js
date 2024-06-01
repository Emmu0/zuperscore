import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

const DropDown = (props) => {
  const { value, list, handleChange, disabled = false } = props;

  return (
    <div className="">
      <Listbox value={value} onChange={handleChange} disabled={disabled}>
        <div className="relative disabled:cursor-not-allowed">
          <Listbox.Button
            className={`bg-gray-200 hover:bg-gray-300 rounded-sm border-0 flex gap-1 justify-center items-center h-[30px] min-w-[30px] px-2`}
          >
            <div className="truncate">
              {list?.find((item) => item.value === value)?.name ?? list[0]?.name}
            </div>
            <div className="pointer-events-none">
              <SelectorIcon width="18px" height="18px" />
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10  mt-1 max-h-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    ` cursor-default select-none py-2 px-4 ${
                      active ? "bg-blue-200 text-black" : "text-gray-900"
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropDown;
