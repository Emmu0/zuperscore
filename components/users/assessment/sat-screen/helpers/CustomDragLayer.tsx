import { ArrowsPointingIn, ArrowsPointingOut, DragIcon } from "@ui/icons";
import type { CSSProperties, FC } from "react";
import type { XYCoord } from "react-dnd";
import { useDragLayer } from "react-dnd";

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
): CSSProperties {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer: FC<any> = ({ children, widgetwidth, handleSize, setIsOpen }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, clientOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
    })
  );
  if (!isDragging) {
    return null;
  }
  const layerStyles: CSSProperties = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  };
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div
          className={`${
            widgetwidth === "expand" ? "w-[768px]" : "w-[480px]"
          } border border-border-light shadow-xl`}
        >
          <div className="w-full h-8 bg-black text-white flex justify-between items-center px-4">
            <div className="text-md font-bold">Refrence Sheet</div>
            <div className="cursor-move">
              <DragIcon width="18" height="18" />
            </div>
            <div className="flex items-center gap-4">
              <div onClick={handleSize} className="cursor-pointer">
                {widgetwidth === "expand" ? (
                  <div className="flex items-center gap-2 text-md font-bold">
                    <ArrowsPointingIn width="18" height="18" />
                    Collapse
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-md font-semibold">
                    <ArrowsPointingOut width="18" height="18" />
                    Expand
                  </div>
                )}
              </div>
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
