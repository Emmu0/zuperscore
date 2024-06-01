import React, { Fragment } from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// headless ui
import { Tab } from "@headlessui/react";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import { ScheduleClassModal } from "@components/calendar/ScheduleEditClassModal";
import WeekCalendar from "@components/calendar/WeekCalendar";
import MonthCalendar from "@components/calendar/MonthCalendar";

// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Calendar",
};

const AdminCalendar: NextPage = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [calendarView, setCalendarView] = React.useState<"month" | "week">("month");
  const [isModal, setIsModal] = React.useState<boolean>(false);
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        {/* <AdminHeader
                    title={date.toLocaleString("default", { month: "long" }) + " " + date.getFullYear()}
                    description="Calendar"
                    button={
                        <div className=" mt-8 flex justify-end items-center">
                            <div className="mr-4">
                                <ViewToggle calendarView={calendarView} setCalendarView={setCalendarView} />
                            </div>
                            <div>
                                <Button onClick={() => setIsModal(true)}>Schedule Class</Button>
                            </div>
                        </div>
                    }
                /> */}
        <div>
          <div className="my-4">
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
                                    ? "bg-violet-0/20 text-violet-100 border "
                                    : "bg-light-0 text-dark-0"
                                } px-4 py-2 border`}
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
                                    ? "bg-violet-0/20 text-violet-100 border "
                                    : "bg-light-0 text-dark-0"
                                } px-4 py-2 border`}
                              >
                                Week
                              </button>
                            )}
                          </Tab>
                        </Tab.List>
                      </div>
                      <div className="flex items-center">
                        <button
                          className="bg-violet-100 px-7 py-2 text-yellow-100"
                          onClick={() => setIsModal(true)}
                        >
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
        <ScheduleClassModal isModal={isModal} setIsModal={setIsModal} />
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminCalendar, { authRequired: true });
