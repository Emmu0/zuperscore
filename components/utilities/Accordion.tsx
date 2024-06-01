import React from "react";

interface IAccordion {
  title: string;
  content: React.ReactNode | string;
  defaultState?: boolean;
}

const Accordion: React.FC<IAccordion> = ({ title, content, defaultState = false }) => {
  const [isActive, setIsActive] = React.useState<boolean>(defaultState);

  return (
    <div className="w-full">
      <div
        className="w-full flex items-center justify-between text-lg font-bold px-8 py-4 cursor-pointer border-b shadow-sm "
        onClick={() => setIsActive(!isActive)}
      >
        <div className="underline">{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="bg-gray-100 w-full px-8 py-2">{content}</div>}
    </div>
  );
};

export default Accordion;
