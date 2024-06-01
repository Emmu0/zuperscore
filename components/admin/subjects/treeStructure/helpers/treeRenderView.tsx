import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
// components
import TreeChildrenRenderView from "./treeCardView";

type Props = {
  tree: [];
  level: number | string;
  t_children: number;
  root_node_id: number | null | undefined;
  parent: number | null | undefined;
  subject: any;
  handleCurrentSubject: any;
  parentSubject: any;
};

const TreeRenderView = ({
  tree,
  level,
  t_children,
  root_node_id,
  parent,
  subject,
  handleCurrentSubject,
  parentSubject,
}: Props) => {
  return (
    <>
      <Droppable droppableId={`List-${level}`} type={`type-${t_children}`}>
        {(provided) => (
          <div className="h-full" {...provided.droppableProps} ref={provided.innerRef}>
            {tree &&
              tree.length > 0 &&
              tree.map((initialRoot: any, initialRootIndex: any) => (
                <Draggable
                  key={`tree-structure-level-${level}-${initialRootIndex}`}
                  draggableId={`tree-structure-level-${level}-${initialRootIndex}`}
                  index={initialRootIndex}
                  isDragDisabled={true}
                >
                  {(providedDrag) => (
                    <div
                      key={`tree-structure-level-${level}-${initialRootIndex}`}
                      className={`${t_children ? "children" : ""}`}
                      {...providedDrag.draggableProps}
                      {...providedDrag.dragHandleProps}
                      ref={providedDrag.innerRef}
                    >
                      <TreeChildrenRenderView
                        tree={initialRoot}
                        level={`${level}-${initialRootIndex}`}
                        t_children={t_children}
                        root_node_id={root_node_id}
                        parent={parent}
                        index={initialRootIndex}
                        subject={subject}
                        handleCurrentSubject={handleCurrentSubject}
                        parentSubject={parentSubject}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default TreeRenderView;
