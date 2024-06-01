import React from "react";
// swr
import { mutate } from "swr";
// headless
import { Combobox, Transition } from "@headlessui/react";
// icon
import { ChevronDownIcon } from "@heroicons/react/solid";
// services
import { APIFetcher } from "@lib/services";

const SearchDropDown = ({
  value,
  placeHolder,
  label,
  required,
  options,
  mutateUrl,
  position = "left",
  handleValue,
  currentValue,
}: any) => {
  const [selected, setSelected] = React.useState(value);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selected?.key === null) {
      let payload: any = { key: selected?.key, title: selected?.title };
      setSelected(payload);
    } else if (!currentValue) {
      let payload: any = { key: currentValue, title: currentValue };
      setSelected(payload);
    } else if (!value && currentValue) {
      let currentOption: any = options?.find(
        ({ title, key }: any) => title === currentValue || key === currentValue
      );
      let payload: any = { key: currentOption?.key, title: currentOption?.title };
      setSelected(payload);
    }
  }, [value, currentValue]);

  const handleSearchInput = async (value: any) => {
    setLoading(true);
    if (value.trim()?.length >= 3) {
      await mutate(mutateUrl, APIFetcher(`${mutateUrl}&search=${value}`), false);
    } else {
      await mutate(mutateUrl, APIFetcher(`${mutateUrl}`), false);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchInput(query);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const clearHandler = () => {
    setQuery("");
    setSelected(void 0);
  };
  return (
    <>
      <div className="">
        <div className="text-sm text-dark-100 mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </div>
        <Combobox
          as="div"
          value={selected}
          onChange={(value: any) => {
            setSelected(value);
            handleValue(value);
            setQuery("");
          }}
        >
          <div className="relative mt-1">
            <div className=" w-full cursor-default group rounded focus:outline-none">
              <Combobox.Button className="w-full">
                <Combobox.Input
                  className="w-full border py-2 placeholder-black bg-transparent pl-3 pr-10 text-sm rounded focus:ring-0 focus:outline-none"
                  placeholder={placeHolder}
                  displayValue={(option: any) => (query.length === 0 ? option?.title : query)}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Combobox.Button>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                {(query?.length > 0 || selected?.title?.length > 0) && (
                  <div
                    className="hidden group-hover:block text-gray-400 text-sm p-0.5"
                    onClick={clearHandler}
                  >
                    x
                  </div>
                )}
                <ChevronDownIcon
                  className="h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className={`absolute ${
                  position === "left" ? `left-0` : `right-0`
                } z-10 mt-1 min-w-[10rem] origin-top-right rounded-md bg-white p-2 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="overflow-y-auto max-h-[216px]">
                  {loading ? (
                    <div className={`block truncate font-medium text-gray-900 py-2`}>
                      Loading...
                    </div>
                  ) : (
                    <>
                      {options && options?.length === 0 && query !== "" ? (
                        <div
                          className={`block truncate font-medium text-gray-900 py-2 text-center`}
                        >
                          Nothing found.
                        </div>
                      ) : (
                        options &&
                        options?.map((person: any) => (
                          <Combobox.Option
                            key={person.key}
                            value={person}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-1 px-3 rounded-sm ${
                                active ? "bg-gray-500 text-white" : "text-gray-900"
                              }`
                            }
                          >
                            {({ selected, active }) => (
                              <div
                                className={`block truncate ${
                                  selected || active ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person?.title}
                              </div>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </>
                  )}
                </div>
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
};
export default SearchDropDown;
