import React from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";
// components
import QuestionEdit from "@components/admin/questions/Edit";

interface IQuestionModal {
  data: any;
  handleCurrentBlock: any;
}

const QuestionModal: React.FC<IQuestionModal> = ({ data, handleCurrentBlock }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    if (handleCurrentBlock) handleCurrentBlock("close-modal");
  };
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    if (data) handleShow();
  }, [data]);

  return (
    <>
      <Transition appear show={show} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={show}
          static={true}
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative z-10 my-8 inline-block w-full max-w-full transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center text-lg font-medium leading-6 text-gray-900">
                  <div className="text-xl font-medium">Edit Question</div>
                  <div
                    className="ml-auto cursor-pointer text-sm focus:outline-none"
                    onClick={handleClose}
                  >
                    <XIcon width="16px" />
                  </div>
                </div>

                <div className="py-4">
                  <QuestionEdit data={data} handleCurrentBlock={handleCurrentBlock} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QuestionModal;
