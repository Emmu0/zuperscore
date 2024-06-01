import React, { useState, Fragment, useRef } from "react";
// next imports
import { NextPage } from "next";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// components
import DefaultCalendar from "@components/calendar/DefaultCalendar";
import TimeSlots from "../../../components/user/schedule-class-components/TimeSlots";
import SlotDetails from "../../../components/user/schedule-class-components/SlotDetails";
import FloatingButton from "@components/user/FloatingButton";
import UserNavbar from "@components/user/UserNavbar";

const ScheduleClass: NextPage = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const calRef = useRef<any>();

  function prevM() {
    if (calRef.current) {
      calRef.current.prevMonth();
    }
  }

  function nextM() {
    if (calRef.current) {
      calRef.current.nextMonth();
    }
  }

  function currentM() {
    if (calRef.current) {
      calRef.current.currentMonth();
    }
  }
  return (
    <>
      <>
        {" "}
        <UserNavbar />
        <div className="flex flex-col bg-gray-100 w-full pb-10">
          <div className="mx-20 mt-4 ">
            <div className="flex justify-between w-full ">
              <div className="lg:w-1/3 md:w-full sm:w-full">
                {/* <button className='p-2 mx-2 border border-dark bg-violet-100 text-light-100' onClick={() => prevM()}>Prev</button>
                            <button className='p-2 mx-2 border border-dark bg-violet-100 text-light-100' onClick={() => nextM()}>Next</button>
                            <button className='p-2 mx-2 border border-dark bg-violet-100 text-light-100' onClick={() => currentM()}>Current</button> */}
                <DefaultCalendar ref={calRef} />
              </div>
              <div className="lg:w-2/3 md:w-full sm:w-full flex flex-col">
                <div className="w-full">
                  <TimeSlots />
                </div>
                <div className="w-full">
                  <SlotDetails />
                </div>
                <div className="flex mx-2 mt-4">
                  <button className="px-4 py-2 bg-maroon text-cream mr-3 " onClick={openModal}>
                    Confirm Schedule
                  </button>
                  <button className="px-4 py-2 bg-gray-200 border border-gray-300 text-gray-500">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FloatingButton />
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white p-6 align-middle shadow-2xl transition-all">
                    <div className="p-2 items-center">
                      <h1 className="font-bold text-4xl">Confirmed!</h1>
                      <p className="text-gray-700 mt-3">
                        You are scheduled with
                        <span className=" px-1 text-violet-100 underline">Vamsi Kurama</span>
                      </p>
                      <p className="text mt-4 text-dark-400">
                        <div className="flex-col bg-white text-center">
                          <p className=" px-4 my-2 font-semibold">Date : 12th May 2022</p>
                          <p className=" px-4 my-2 font-semibold">Time : 10:00-10:50</p>
                          <p className=" px-4 my-2 font-semibold">Indian Standard Time</p>
                        </div>
                      </p>
                      <button className="px-8 py-3 bg-violet-100 text-white rounded-full mt-4 text-md">
                        Acknowledge
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
};

export default ScheduleClass;
