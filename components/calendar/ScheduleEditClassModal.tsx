import React from "react";
// headless ui
import { Dialog } from "@headlessui/react";
// components
import Button from "@components/buttons";

export const ScheduleClassModal = ({ isModal, setIsModal }: any) => {
  return (
    <Dialog
      as="div"
      className="relative z-10 shadow-lg"
      open={isModal}
      onClose={() => setIsModal(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-[623px] h-full  transform overflow-hidden  bg-white p-8  shadow-xl transition-all">
            <Dialog.Title as="div" className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
              Schedule Class
            </Dialog.Title>
            <div className="mt-4">
              <div className="text-dark-0">Session Name</div>
              <input
                type="text"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">Date</div>
              <input
                type="date"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">Start Time</div>
              <input
                type="time"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">End Time</div>
              <input
                type="time"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">Session Link</div>
              <input
                type="text"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>

            <div className="flex justify-end items-center pt-8">
              <div>
                <Button
                  variant="secondary"
                  className="border border-border-light px-4 py-2 bg-light-100 text-dark-0 mr-8"
                  onClick={() => setIsModal(false)}
                >
                  Cancel
                </Button>
                <Button className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium">
                  Schedule
                </Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export const EditScheduleClassModal = ({ isModal, setIsModal }: any) => {
  return (
    <Dialog
      as="div"
      className="relative z-10 shadow-lg"
      open={isModal}
      onClose={() => setIsModal(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-[623px] h-full  transform overflow-hidden  bg-white p-8  shadow-xl transition-all">
            <Dialog.Title as="div" className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
              Edit Session
            </Dialog.Title>
            <div className="mt-4">
              <div className="text-dark-0">Session Name</div>
              <input
                type="text"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">Date</div>
              <input
                type="date"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">Start Time</div>
              <input
                type="time"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">End Time</div>
              <input
                type="time"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>
            <div className="mt-4">
              <div className="text-dark-0">Session Link</div>
              <input
                type="text"
                className="border border-border-light outline-none px-4 py-2 w-full"
              />
            </div>

            <div className="flex justify-end items-center pt-8">
              <div>
                <Button
                  variant="secondary"
                  className="border border-border-light px-4 py-2 bg-light-100 text-dark-0 mr-8"
                  onClick={() => setIsModal(false)}
                >
                  Cancel
                </Button>
                <Button className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium">
                  Edit
                </Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
