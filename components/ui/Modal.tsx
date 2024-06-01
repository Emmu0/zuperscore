import React from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";
// ui
import Button from "@components/ui/Button";
interface IModal {
  modal: boolean;
  setModal: any;
  children: React.ReactNode;
  title?: string;
  size?: string;
  onClose?: any;
  onSubmit?: any;
  loading?: boolean;
  bottomNavigation?: boolean;
}
const Modal: React.FC<IModal> = ({
  modal,
  setModal,
  children,
  title,
  size,
  onClose,
  onSubmit,
  loading,
  bottomNavigation = true,
}) => {
  const handleClose = () => setModal(false);
  return (
    <>
      <Transition appear show={modal} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={modal}
          static={true}
          onClose={onClose}
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
              <div
                className={`relative z-10 my-8 inline-block w-full ${
                  size == "sm"
                    ? "max-w-md"
                    : size == "lg"
                    ? "max-w-2xl"
                    : size == "xl"
                    ? "max-w-4xl"
                    : size == "full"
                    ? "w-full"
                    : "max-w-xl"
                } transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="flex items-center text-lg font-medium text-gray-900">
                  <div className="text-xl font-medium">{title}</div>
                  {!loading && (
                    <div
                      className="ml-auto cursor-pointer text-sm focus:outline-none"
                      onClick={handleClose}
                    >
                      <XIcon width="18px" fill="#8b8b8b" />
                    </div>
                  )}
                </div>
                <div className="py-4">{children}</div>
                {bottomNavigation && (
                  <div className="flex gap-3 justify-end items-center">
                    <Button onClick={handleClose} variant="secondary" size="sm" disabled={loading}>
                      Close
                    </Button>
                    <Button onClick={onSubmit} size="sm" disabled={loading}>
                      {loading ? "Processing..." : "Continue"}
                    </Button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
