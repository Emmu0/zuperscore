// React Imports
import { useState } from "react";
// Data
import { plans } from "data/mother-plan";
// Plan Structure Components
import PlanRenderView from "./planStructure/helpers/planRenderView";
// UI Components
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from "@heroicons/react/solid";
import { DragDropContext } from "react-beautiful-dnd";

type PlanCardProps = {
  planId: any;
};

const PlanCard = ({ planId }: PlanCardProps) => {
  // const [accordion, setAccordion] = useState<any>(false);

  const plan = plans[planId - 1];

  return (
    <>
      <h2 className="font-medium text-xl">{plan?.name}</h2>
      {plan &&
        plan.children &&
        plan.children.length > 0 &&
        plan.children.map((planChild: any, planChildIndex: number) => (
          <div key={planChildIndex} className="mt-5">
            <h3 className="bg-yellow-200 text-violet-100 text-lg font-medium p-3 rounded rounded-b-none flex items-center gap-2">
              {planChild.name}
              {/* {accordion ? (
                <ArrowCircleDownIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setAccordion(!accordion)}
                />
              ) : (
                <ArrowCircleUpIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setAccordion(!accordion)}
                />
              )} */}
            </h3>
            {/* <div className={`${accordion ? "hidden" : null} border border-slate-300 border-t-0`}> */}
            <div className="border border-slate-300 border-t-0">
              {planChild.children && planChild.children.length > 0 ? (
                <DragDropContext onDragEnd={() => {}}>
                  <PlanRenderView plan={planChild.children} level={0} childPadding={16} />
                </DragDropContext>
              ) : (
                <h3>No children</h3>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default PlanCard;
