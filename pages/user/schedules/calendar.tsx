import React, { Fragment, useRef } from "react";
// next imports
import { NextPage } from "next";
// headless ui
import { Tab } from "@headlessui/react";
// components
import FloatingButton from "@components/user/FloatingButton";
import UserNavbar from "@components/user/UserNavbar";
import Sessions from "@components/user/week-schedule-compponents/Sessions";
import WeekCalendar from "@components/calendar/WeekCalendar";
import MonthCalendar from "@components/calendar/MonthCalendar";
const WeekSchedule: NextPage = () => {

  return (
    <>
      <UserNavbar />
      <FloatingButton />
      <div className="bg-[#FAFAFA] h-auto">
        <div className="mx-12">
          <div className="pt-6 grid grid-col-4 xl:grid-flow-col lg:grid-flow-col md:grid-flow-row sm:grid-flow-row">
            <div className="mr-5 xl:col-span-1 lg:col-span-1 md:col-span-4 sm:col-span-4">
              <Sessions />
            </div>
            <div className=" col-span-3 ml-5  xl:col-span-3 lg:col-span-3 md:col-span-4 sm:col-span-4">
              <Tab.Group>
                <div className="flex flex-col w-full mb-7 py-1">
                  <div className="flex justify-between ">
                    <h1 className="text-2xl font-bold">Month Year</h1>
                    <div className="flex items-center">
                      <div className="mr-7">
                        <Tab.List>
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={`${
                                  selected
                                    ? "bg-violet-0/20 text-violet-100 border border-none"
                                    : "bg-light-0 text-dark-0"
                                } px-4 py-2`}
                              >
                                Month
                              </button>
                            )}
                          </Tab>
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={`${
                                  selected
                                    ? "bg-violet-0/20 text-violet-100 border border-none"
                                    : "bg-light-0 text-dark-0"
                                } px-4 py-2`}
                              >
                                Week
                              </button>
                            )}
                          </Tab>
                        </Tab.List>
                      </div>
                      <div className="flex items-center">
                        <button className="bg-violet-100 px-7 py-2 text-yellow-100">
                          Schedule Class
                        </button>
                      </div>
                    </div>
                  </div>
                  <Tab.Panels>
                    <Tab.Panel>
                      <MonthCalendar />
                    </Tab.Panel>
                    <Tab.Panel>
                      <WeekCalendar />
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekSchedule;
