// React Imports
import { useState } from "react";
// Plan Structure Components
import PlanRenderView from "./planRenderView";
// UI Components
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { PencilIcon, TrashIcon, FolderAddIcon } from "@heroicons/react/outline";
import Tooltip from "@components/ui/Tooltip";

type PlanCardView = {
  plan: any;
  level: number | string;
  childPadding: number;
  dragHandle: any;
};

const PlanCardView = ({ plan, level, childPadding, dragHandle }: PlanCardView) => {
  const [accordion, setAccordion] = useState<any>(true);

  return (
    <>
      <div style={childPadding > 0 ? { paddingLeft: `${childPadding}px` } : {}}>
        <h4 className="px-3 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {plan.children && plan.children.length > 0 ? (
              <span className="cursor-pointer" onClick={() => setAccordion(!accordion)}>
                {accordion ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </span>
            ) : null}
            {plan.name}
          </div>
          <div className="flex items-center gap-[2rem]">
            <div className="flex items-center gap-2">
              <span className="cursor-pointer">
                <FolderAddIcon className="h-4 w-4" />
              </span>
              <span className="cursor-pointer">
                <PencilIcon className="h-4 w-4" />
              </span>
              <span className="cursor-pointer">
                <TrashIcon className="h-4 w-4" />
              </span>
            </div>
            <Tooltip content="Drag to rearrange" position="left">
              {dragHandle}
            </Tooltip>
          </div>
        </h4>
        <div className={`${accordion ? null : "hidden"}`}>
          {plan.children && plan.children.length > 0 ? (
            <PlanRenderView plan={plan.children} level={level} childPadding={childPadding + 16} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PlanCardView;
