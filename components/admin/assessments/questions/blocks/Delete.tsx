import React from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// components
import Button from "@components/buttons";
// api services
import { Question } from "@lib/services/assessment.service";

const QuestionDelete = ({
  data,
  handleData,
  handleEditCurrentBlock,
}: {
  data: any;
  handleData: (arg: any) => void;
  handleEditCurrentBlock?: any;
}) => {
  const [modal, setModal] = React.useState<boolean>(false);

  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    handleData(null);
  };

  React.useEffect(() => {
    if (data) openModal();
  }, [data]);

  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const SubmitTestDelete = () => {
    setButtonLoader(true);
    Question.delete(data?.id)
      .then((response) => {
        closeModal();
        setButtonLoader(false);
        handleEditCurrentBlock(null);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <Transition.Root show={modal} as={React.Fragment}>
      <Dialog static={true} as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center sm:items-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white p-8 text-left shadow-xl transition-all">
                <div className="font-semibold sm:text-left">
                  <Dialog.Title as="h3" className="text-lg">
                    Delete the Question
                  </Dialog.Title>
                  <div className="pt-4">
                    Are you sure you want to delete <strong>{data?.title}</strong>
                  </div>
                </div>
                <Button onClick={SubmitTestDelete} className="float-right mt-3">
                  {buttonLoader ? "Deleting..." : "Delete"}
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default QuestionDelete;
