import React from "react";
//components
import SectionDrag from "@components/users/assessment/sat-screen/helpers/SectionDrag";
import CalculatorContent from "./CalculatorContent";
import { CustomDragLayer } from "../helpers/CustomDragLayer";

interface ICalculator {}

const TopBarCalculator: React.FC<ICalculator> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
 
  const [widgetwidth, setWidgetWidth] = React.useState("shrink");
  const handleSize = () => {
    if (widgetwidth === "expand") {
      setWidgetWidth("shrink");
    } else {
      setWidgetWidth("expand");
    }
  };
  const [elementPosition, setElementPosition] = React.useState({ left: 100, top: 100 });
  return (
    <>
      <div className="cursor-pointer text-sm mt-1" onClick={() => setIsOpen(!isOpen)}>
        <div className="h-5 w-5 bg-gray-200 flex justify-center items-center">C</div>
      </div>
      {isOpen && (
        <>
          <SectionDrag
            elementPosition={elementPosition}
            setElementPosition={setElementPosition}
            widgetwidth={widgetwidth}
            handleSize={handleSize}
            setIsOpen={setIsOpen}
          >
            <CalculatorContent />
          </SectionDrag>
          <CustomDragLayer widgetwidth={widgetwidth} handleSize={handleSize} setIsOpen={setIsOpen}>
            <CalculatorContent />
          </CustomDragLayer>
        </>
      )}
    </>
  );
};

export default TopBarCalculator;
