import React from "react";
// react dnd
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
// ui icons
import { DragIcon } from "@ui/icons";

interface ISectionDrag {
  children: any;
  elementPosition: any;
  setElementPosition: any;
  widgetwidth: any;
  handleSize: any;
  setIsOpen: any;
}

const DesmosDrag: React.FC<ISectionDrag> = ({
  children,
  elementPosition,
  setElementPosition,
  widgetwidth,
  handleSize,
  setIsOpen,
}: any) => {
  const [, drop] = useDrop({
    accept: "box",
    drop(item: any, monitor) {
      const delta: any = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      setElementPosition({
        left: left,
        top: top,
      });
      return undefined;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "box",
    item: { left: elementPosition.left, top: elementPosition.top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
 
  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={drop}
      style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: "100",
        height: isDragging ? "100%" : "fit-content",
        width: isDragging ? "100%" : "fit-content",
      }}
    >
      <div
        // ref={drag}
        style={{
          position: "absolute",
          opacity: isDragging ? 0 : 1,
          height: isDragging ? 0 : "",
          left: elementPosition.left,
          top: elementPosition.top,
        }}
      >
        <div className={`w-[602px] border border-border-light shadow-xl`}>
          <div
            className="w-full h-8 bg-black text-white flex justify-between items-center px-4"
            ref={drag}
          >
            <div className="text-md font-bold">Desmos</div>
            <div className="cursor-move">
              <DragIcon width="18" height="18" />
            </div>
            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsOpen(false)}
                className="text-md font-semibold cursor-pointer"
              >
                Exit
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DesmosDrag;
