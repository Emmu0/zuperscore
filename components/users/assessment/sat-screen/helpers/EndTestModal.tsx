import React, { useEffect } from "react";
// headlessui
import { Dialog, Transition } from "@headlessui/react";
// contexts
import Button from "@components/ui/Button";
import { useRouter } from "next/router";

const TestDelete = ({ data, children }: { data?: any; children: any }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const router = useRouter();
  const { assessment_id } = router.query;

  const SubmitTest = () => {
    setButtonLoader(true);

    router.push(`/assessments/${assessment_id}/result`);

    setOpen(false);
    setButtonLoader(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog static={true} as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-6 pt-5 pb-4 text-left shadow-xl transition-all sm:w-full sm:max-w-xl">
                  <div className="text-center sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 flex flex-row text-gray-900"
                    >
                      End the test
                    </Dialog.Title>
                    <div className="mt-6 mb-10 text-xl">Are you sure you want to end the test</div>
                  </div>
                  <div className="mt-8 flex justify-end gap-3">
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button size="sm" onClick={SubmitTest} variant="danger">
                      {buttonLoader ? "processing..." : "End Test"}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default TestDelete;
