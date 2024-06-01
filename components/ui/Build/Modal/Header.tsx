import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

type ModalHeaderProps = {
  title?: string;
  closeToggle: boolean;
  closeButton?: any;
  children?: any;
};

const ModalHeader = (props: ModalHeaderProps) => {
  return (
    <>
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 relative">
        {props.closeToggle ? (
          <div
            className="absolute top-[-1rem] right-[-1rem] cursor-pointer"
            onClick={props.closeButton ? props.closeButton : null}
          >
            <XIcon className="h-4 w-4" />
          </div>
        ) : null}
        <div>{props.children ? props.children : props.title}</div>
      </Dialog.Title>
    </>
  );
};

ModalHeader.defaultProps = {
  closeToggle: true,
};

export default ModalHeader;
