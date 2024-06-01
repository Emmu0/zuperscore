import React from "react";
//headless ui
import { Dialog, Transition, Tab } from "@headlessui/react";
//icons
import { XIcon } from "@heroicons/react/solid";
// component
import ImageUploader from "@components/forms/ReactHookImageUploader";

const ImageUploadModal = ({
  modal,
  handleModal,
  size = "sm",
  modalStatic = true,
  handleImage,
  context = "users" || "library" || "exams" || "subjects",
}: any) => {
  const handleSplashImage = (url: any) => {
    handleImage(url.asset);
    handleModal(false);
  };
  return (
    <>
      <Transition appear show={modal} as={React.Fragment}>
        <Dialog
          static={modalStatic}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            {modal && (
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              </Transition.Child>
            )}
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded ${
                  size == "xl" ? "max-w-2xl" : size == "lg" ? "max-w-xl" : "max-w-lg"
                }`}
              >
                <div className="">
                  <div className="flex relative">
                    <div className="w-full items-center gap-3">
                      <Tab.Group>
                        <div className="z-30 flex border-b w-full items-center">
                          <div className="flex pt-3 px-2 font-medium text-theme-muted bg-opacity-90">
                            <Tab.List className="flex flex-nowrap overflow-x-auto scrollbar-hidden">
                              <Tab
                                className={({ selected }) =>
                                  selected
                                    ? "pb-2 border-b-2 border-black outline-none mx-4"
                                    : "pb-2 border-b-2 border-none outline-none mx-4 text-skin-inverted"
                                }
                              >
                                Upload
                              </Tab>
                            </Tab.List>
                          </div>
                          <div
                            className="h-[24px] w-[24px] mx-4 flex justify-center items-center text-sm font-medium outline-none ml-auto rounded-sm cursor-pointer hover:bg-skin-button-muted"
                            onClick={() => handleModal(false)}
                          >
                            <div className="h-[14px] w-[14px]">
                              <XIcon width="18px" />
                            </div>
                          </div>
                        </div>
                        {/* content */}
                        <Tab.Panels>
                          <Tab.Panel>
                            <div className="p-5">
                              <ImageUploader handleImage={handleSplashImage} context={context} />
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
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

export default ImageUploadModal;
