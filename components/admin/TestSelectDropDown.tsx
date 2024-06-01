import { testTypes } from "@components/data";
import { Listbox } from "@headlessui/react";
import { DropdownIcon } from "@ui/icons";
import React from "react";

const TestSelectDropDown = ({ value, onChange }: any) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button className={"border w-full px-4 py-2 flex justify-between items-center"}>
        {value}
        <DropdownIcon className="" />
      </Listbox.Button>

      <Listbox.Options className={"border w-full  bg-white shadow-lg"}>
        {testTypes.map((test) => (
          <Listbox.Option key={test} value={test} className="px-4 py-2 cursor-pointer">
            {test}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default TestSelectDropDown;
