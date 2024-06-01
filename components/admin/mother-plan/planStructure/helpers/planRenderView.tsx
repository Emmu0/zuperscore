// Plan Structure Components
import PlanCardView from "./planCardView";
// UI Components
import { MenuAlt4Icon } from "@heroicons/react/solid";
import { Draggable, Droppable } from "react-beautiful-dnd";

type PlanRenderView = {
  plan: any;
  level: number | string;
  childPadding: number;
};

const PlanRenderView = ({ plan, level, childPadding }: PlanRenderView) => {
  return (
    <>
      <Droppable droppableId={`List-${level}`} type={`Type-${childPadding}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {plan.map((initialPlan: any, initialPlanIndex: number) => {
              return (
                <Draggable
                  key={`plan-structure-level-${level}-${initialPlanIndex}`}
                  draggableId={`plan-structure-level-${level}-${initialPlanIndex}`}
                  index={initialPlanIndex}
                >
                  {(providedDrag) => (
                    <div {...providedDrag.draggableProps} ref={providedDrag.innerRef}>
                      <PlanCardView
                        plan={initialPlan}
                        level={`${level}-${initialPlanIndex}`}
                        childPadding={childPadding}
                        dragHandle={
                          <div {...providedDrag.dragHandleProps}>
                            <MenuAlt4Icon className="h-4 w-4 outline-none" />
                          </div>
                        }
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default PlanRenderView;
