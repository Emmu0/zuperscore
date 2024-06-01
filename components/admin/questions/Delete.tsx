import React from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";
// components
import Button from "@components/buttons";
// api services
import { Question } from "@lib/services/assessment.service";

interface IQuestionDelete {
  data: any;
  handleCurrentBlock: (arg: any) => void;
}

const QuestionDelete: React.FC<IQuestionDelete> = ({ data, handleCurrentBlock }) => {
  const [modal, setModal] = React.useState<boolean>(false);
  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    handleCurrentBlock("close-modal");
  };
  React.useEffect(() => {
    if (data) openModal();
  }, [data]);

  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);
  const SubmitTestDelete = () => {
    setButtonLoader(true);
    Question.delete(data?.id)
      .then((response) => {
        setButtonLoader(false);
        setModal(false);
        handleCurrentBlock("clear");
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <>
      <Transition appear show={modal} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={modal}
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
              <div className="relative z-10 my-8 inline-block w-full max-w-xl transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center text-lg font-medium leading-6 text-gray-900">
                  <div className="text-xl font-medium">Delete Question</div>
                  <div
                    className="ml-auto cursor-pointer text-sm focus:outline-none"
                    onClick={closeModal}
                  >
                    <XIcon width="16px" />
                  </div>
                </div>

                <div className="pt-4">
                  Are you sure you want to delete <strong>{data?.title}</strong>
                </div>

                <Button onClick={SubmitTestDelete} className="float-right mt-3">
                  {buttonLoader ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QuestionDelete;
