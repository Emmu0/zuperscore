import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";

interface IItem {
  key: number;
  title: string;
  body: string;
}

const ProfileHelp = ({ setDisplayPage }: any) => {
  const items: IItem[] = [
    {
      key: 1,
      title:
        "Can I reschedule my classes since I have multiple activities that I am participating in.",
      body: "Rescheduling/ Cancelling of classes is not encouraged unless there is a medical reason. The idea of sending the link in advance is to book your slots as per your availability and to avoid cancellations.",
    },
    {
      key: 2,
      title: "How many attempts can we take for the SAT?",
      body: "Students can take the SAT as many times as they want however, there are typically only seven test dates throughout the year.",
    },
    {
      key: 3,
      title: "What is the frequency of classes that should be done in a week?",
      body: "A minimum of 2 classes to maximum of 4 classes per week should be done to make sure we complete the core prep as per plan",
    },
    {
      key: 4,
      title: "How many hours should I dedicate per week towards the SAT?",
      body: "4 - 5 hours a week is suggested",
    },
  ];
  React.useEffect(() => {
    setDisplayPage("Zuperscore Tem");
  }, []);

  return (
    <div className="bg-white w-full border border-gray-200 p-4 relative divide-y space-y-5">
      <div className="w-full">
        <div className="grid gap-4 w-full rounded bg-white">
          {items.map((item) => (
            <div key={item.key}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg border bg-violet-100 opacity-90 text-yellow-0 px-4 py-2 text-left text-sm font-medium focus:outline-none">
                      {/* {{}} */}
                      <span className="">
                        {item.key}. {item.title}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          !open ? "rotate-180 transform" : ""
                        } h-5 w-5  text-yellow-100`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm bg-gray-200 rounded-b-md font-medium ">
                      {/* Add your content here */}
                      {item?.body}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHelp;
