import React, { ReactNode, useState } from "react";

type TooltipProps = {
  content?: string;
  position?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  const [tooltip, setTooltip] = useState(false);
  let position, arrow, border;

  if (props.position === "top") {
    position = "top-[-2.5rem] left-[50%] translate-x-[-50%]";
    arrow = "top-[100%] left-[50%] ml-[-5px]";
    border = "black transparent transparent transparent";
  }
  if (props.position === "right") {
    position = "top-[50%] right-[-160px] translate-y-[-50%]";
    arrow = "top-[50%] right-[100%] mt-[-5px]";
    border = "transparent black transparent transparent";
  }
  if (props.position === "bottom") {
    position = "bottom-[-2.5rem] left-[50%] translate-x-[-50%]";
    arrow = "bottom-[100%] left-[50%] ml-[-5px]";
    border = "transparent transparent black transparent";
  }
  if (props.position === "left") {
    position = "top-[50%] left-[-160px] translate-y-[-50%]";
    arrow = "top-[50%] left-[100%] mt-[-5px]";
    border = "transparent transparent transparent black";
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        {props.children}
        <span
          className={`absolute transition-opacity duration-300 bg-black text-white p-2 rounded-md text-xs w-[150px] text-center z-[10] ${position} ${
            !tooltip ? "opacity-0 pointer-events-none" : null
          }`}
        >
          {props.content}
          {/* Arrow */}
          <span
            className={`absolute border-[5px] border-solid ${arrow}`}
            style={{ borderColor: border }}
          ></span>
        </span>
      </div>
    </>
  );
};

Tooltip.defaultProps = {
  position: "top",
};

export default Tooltip;
