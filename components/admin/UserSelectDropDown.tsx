import { users } from "@components/data";
import StudentTagListOption from "@components/ui/StudentTagListOption";
import { Listbox } from "@headlessui/react";
import { DropdownIcon } from "@ui/icons";

import React from "react";

const UserSelectDropDown = ({ onChange, value }: any) => {
  return (
    <Listbox value={value} onChange={onChange} multiple>
      <Listbox.Button className={"border w-full flex justify-start items-center flex-wrap  "}>
        {value.length > 0 ? (
          <>
            {value.map((student: any) => (
              <StudentTagListOption
                name={`${student.first_name} ${student.last_name}`}
                key={student?._id}
              />
            ))}
          </>
        ) : (
          <>
            <div className="py-2 px-4">Select Students</div>
          </>
        )}

        <DropdownIcon className="absolute right-0 mr-4" />
      </Listbox.Button>

      <Listbox.Options
        className={"border w-full flex justify-start items-center flex-wrap   bg-white shadow-lg "}
      >
        {users.map((student: any) => (
          <Listbox.Option key={student._id} value={student} className="">
            {({ active, selected }: any) => {
              return (
                <StudentTagListOption
                  name={`${student.first_name} ${student.last_name}`}
                  active={active}
                  selected={selected}
                />
              );
            }}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default UserSelectDropDown;
