import { Popover } from "@headlessui/react";
import React from "react";

const PopOver = ({ button, content, position }: any) => {
  return (
    <Popover className="relative">
      <Popover.Button className={`outline-none`}>{button}</Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Popover.Panel className={`absolute z-10 ${position}`}>{content}</Popover.Panel>
    </Popover>
  );
};

export default PopOver;
