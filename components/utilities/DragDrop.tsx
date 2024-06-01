import React from "react";
// react dnd
import { useDrag, useDrop } from "react-dnd";

const DragDrop = ({ children, elementPosition, setElementPosition }: any) => {
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
  const [{ isDragging }, drag] = useDrag({
    type: "box",
    item: { left: elementPosition.left, top: elementPosition.top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const dragStyle = {
    position: "absolute",
    cursor: "move",
  };
  return (
    <div
      ref={drop}
      style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1",
      }}
    >
      <div
        ref={drag}
        style={{
          position: "absolute",
          cursor: "move",
          left: elementPosition.left,
          top: elementPosition.top,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DragDrop;
