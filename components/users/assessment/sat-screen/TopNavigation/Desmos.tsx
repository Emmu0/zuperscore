import React from "react";
//components
import DesmosDrag from "@components/users/assessment/sat-screen/helpers/DesmosDrag";
import { CustomDragLayer } from "../helpers/DesmosDragLayer";
import { CalculatorIcon } from "@ui/icons";
import DesmosCalculator from "./DesmosCalculator";
interface IMathCheatSheet {}

const TopBarReference: React.FC<IMathCheatSheet> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [widgetwidth, setWidgetWidth] = React.useState("expand");
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
      <div className="py-1.5 px-1 pr-3">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalculatorIcon height="16px" width="16px" fill="#8B8B8B" />
          <div className="text-sm font-medium text-gray-500">Calculator</div>
        </div>
      </div>

      {isOpen && (
        <>
          <DesmosDrag
            elementPosition={elementPosition}
            setElementPosition={setElementPosition}
            widgetwidth={widgetwidth}
            handleSize={handleSize}
            setIsOpen={setIsOpen}
          >
            <DesmosCalculator />
          </DesmosDrag>
          <CustomDragLayer widgetwidth={widgetwidth} handleSize={handleSize} setIsOpen={setIsOpen}>
            {/* <DesmosCalculator /> */}
          </CustomDragLayer>
        </>
      )}
    </>
  );
};

export default TopBarReference;
