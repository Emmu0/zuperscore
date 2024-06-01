import React from "react";
//components
import SectionDrag from "@components/users/assessment/sat-screen/helpers/SectionDrag";
import { CustomDragLayer } from "../helpers/CustomDragLayer";
import RefrenceSheetContent from "./RefrenceSheetContent";
import { MathRefIcon } from "@ui/icons";
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
          <MathRefIcon height="16px" width="16px" fill="#8B8B8B" />
          <div className="text-sm font-medium text-gray-500">Math Ref</div>
        </div>
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
            <RefrenceSheetContent />
          </SectionDrag>
          <CustomDragLayer widgetwidth={widgetwidth} handleSize={handleSize} setIsOpen={setIsOpen}>
            <RefrenceSheetContent />
          </CustomDragLayer>
        </>
      )}
    </>
  );
};

export default TopBarReference;
