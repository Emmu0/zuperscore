import React from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";
// components
import { ChevronRightIcon } from "@ui/icons";
import QuestionPreview from "./preview";
import { Preview1, Preview2, Preview3, Preview4, Preview5, Preview6 } from "./Previews";

interface IQuestionModal {
  data: any;
  handleCurrentBlock: any;
}

const QuestionPreviewModal: React.FC<IQuestionModal> = ({ data, handleCurrentBlock }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    if (handleCurrentBlock) handleCurrentBlock("close-modal");
  };
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    if (data) handleShow();
  }, [data]);

  const previews = [
    "preview-1",
    "preview-2",
    "preview-3",
    "user-preview-1",
    "user-preview-2",
    "user-preview-3",
  ];
  const [selectedPreview, setSelectedPreview] = React.useState(0);
  const handleSelectedPreview = (index: number) => {
    setSelectedPreview(index);
  };

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
                  <div className="text-xl font-medium">Preview Question</div>
                  <div
                    className="ml-auto cursor-pointer text-sm focus:outline-none"
                    onClick={handleClose}
                  >
                    <XIcon width="16px" />
                  </div>
                </div>

                <div className="flex  items-start py-4">
                  {/* <div className="w-[280px]">
                    {previews &&
                      previews.map((preview, index) => (
                        <div
                          key={index}
                          className={`border rounded-md border-border-light px-4 py-2 my-2 flex items-center cursor-pointer hover:bg-gray-300 ${
                            index === selectedPreview ? "bg-gray-200" : "bg-light-100"
                          }`}
                          onClick={() => handleSelectedPreview(index)}
                        >
                          {preview.toLocaleUpperCase()}{" "}
                          <ChevronRightIcon height="16" width="16" className="ml-2" />{" "}
                        </div>
                      ))}
                  </div> */}
                  <div className="w-full mx-2">
                    <div className="w-full h-full border border-gray-300 rounded-sm ">
                      <QuestionPreview block={data} handleCurrentBlock={handleCurrentBlock} />
                    </div>
                    {/* {selectedPreview === 0 && (
                      <Preview1 block={data} handleCurrentBlock={handleCurrentBlock} />
                    )}
                    {selectedPreview === 1 && (
                      <Preview2 block={data} handleCurrentBlock={handleCurrentBlock} />
                    )}
                    {selectedPreview === 2 && (
                      <Preview3 block={data} handleCurrentBlock={handleCurrentBlock} />
                    )}
                    {selectedPreview === 3 && (
                      <Preview4 block={data} handleCurrentBlock={handleCurrentBlock} />
                    )}
                    {selectedPreview === 4 && (
                      <Preview5 block={data} handleCurrentBlock={handleCurrentBlock} />
                    )}
                    {selectedPreview === 5 && (
                      <Preview6 block={data} handleCurrentBlock={handleCurrentBlock} />
                    )} */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QuestionPreviewModal;
