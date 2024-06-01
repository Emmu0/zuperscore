import { Fragment, useState, FC } from "react";
// headless ui
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import React from "react";
export interface ISelectSearchFilterOptions {
  key: string | null;
  title: string;
  data?: Object | null;
}
interface ISearchDropdownFilter {
  options: ISelectSearchFilterOptions[] | null;
  value: ISelectSearchFilterOptions | null;
  handleValue: (value: ISelectSearchFilterOptions | null) => void;
  placeHolder?: string;
  loading?: boolean;
  disabled?: boolean;
  position?: "left" | "right";
  children?: React.ReactElement;
  name: string;
  currentValue:String;
}
export const SearchDropdownFilter: FC<ISearchDropdownFilter> = ({
  options,
  value,
  handleValue,
  placeHolder,
  currentValue,
  loading = false,
  disabled,
  position = "right",
  children,
}) => {
  const [selected, setSelected] = useState<ISelectSearchFilterOptions | null>(value);
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    if (!currentValue) {
      let payload: any = { key: currentValue, title: currentValue };
      setSelected(payload);
    } else if (!value && currentValue) {
      let currentOption: any = options?.find(({ title, key }) => title === currentValue || key === currentValue);
      let payload: any = { key: currentOption?.key, title: currentOption?.title };
      setSelected(payload);
    }
  }, [value, currentValue, options]);

  const filteredOptions =
    query === ""
      ? options
      : options &&
      options.length > 0 &&
      options.filter((person) =>
        person.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
  return (
    <div className="w-full">
      <Combobox
        as="div"
        value={selected}
        onChange={(value: ISelectSearchFilterOptions) => {
          setSelected(value);
          handleValue(value);
        }}
        disabled={disabled}
      >
        <div className="relative mt-1">
          <Combobox.Button
            className={`flex w-full cursor-pointer items-center justify-between gap-1 rounded-sm border px-3 py-2 text-sm shadow-sm duration-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-w-[100px] ${disabled ? `bg-gray-200 cursor-not-allowed` : `hover:bg-gray-100`
              }`}
          >
            <div className="overflow-hidden overflow-ellipsis text-overflow whitespace-nowrap w-full text-left">
              {selected?.title ?? placeHolder}
            </div>

            <div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute ${position === "left" ? `left-0` : `right-0`
                } z-10 mt-1 min-w-[10rem] origin-top-right rounded-md bg-white p-2 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {/* search filter */}
              <div className="flex w-full items-center justify-start rounded-sm border bg-gray-100 px-2 text-gray-500 mb-2">
                <SearchIcon className="flex-shrink-0 h-3 w-3" />
                <Combobox.Input
                  className="w-full bg-transparent py-1 px-2 text-xs focus:outline-none"
                  displayValue={(person: any) => person?.title || person}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
                <div
                  className="flex-shrink-0 cursor-pointer hover:bg-gray-300 rounded-sm"
                  onClick={() => {
                    // setSelected(null);
                    setQuery("");
                  }}
                >
                  {/* <XMarkIcon className="h-4 w-4" /> */}X
                </div>
              </div>
              {/* option filter */}
              <div className="overflow-y-auto max-h-[216px]">
                {loading ? (
                  <div className={`block truncate font-medium text-gray-900 py-2`}>Loading...</div>
                ) : (
                  <>
                    {filteredOptions && filteredOptions.length === 0 && query !== "" ? (
                      <div className={`block truncate font-medium text-gray-900 py-2 text-center`}>
                        Nothing found.
                      </div>
                    ) : (
                      filteredOptions &&
                      filteredOptions.map((person) => (
                        <Combobox.Option
                          key={person.key}
                          value={person}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-1 px-3 rounded-sm ${active ? "bg-gray-500 text-white" : "text-gray-900"
                            }`
                          }
                        >
                          {({ selected, active }) => (
                            <div
                              className={`block truncate ${selected || active ? "font-medium" : "font-normal"
                                }`}
                            >
                              {person.title}
                            </div>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                    {/* custom components */}
                    {children && <div className="select-none py-1 px-3">{children}</div>}
                  </>
                )}
              </div>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
