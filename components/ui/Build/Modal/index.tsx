import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

type ModalProps = {
  isModal: boolean;
  setModal: Function;
  size?: "xs" | "rg" | "lg" | "xl";
  position?: "top" | "center" | "bottom";
  title: string;
  children?: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const closeModal = () => {
    props.setModal(false);
  };

  const width: string =
    props.size === "xs"
      ? "w-4/12"
      : props.size === "rg"
      ? "w-6/12"
      : props.size === "lg"
      ? "w-9/12"
      : props.size === "xl"
      ? "w-full"
      : "w-auto";

  const position: string =
    props.position === "top"
      ? "content-start justify-items-center"
      : props.position === "center"
      ? "place-items-center"
      : props.position === "bottom"
      ? "content-end justify-items-center"
      : "place-items-center";

  return (
    <>
      <Transition appear show={props.isModal} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className={`grid h-full ${position} p-4 text-center`}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`transform overflow-y-scroll rounded-2xl ${width} bg-white p-8 text-left max-h-full shadow-xl transition-all`}
                >
                  <Header title={props.title} closeButton={closeModal} />
                  <Body>{props.children}</Body>
                  <Footer closeButton={closeModal} continueButton={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

Modal.defaultProps = {
  size: "rg",
  position: "center",
};

export default Modal;
