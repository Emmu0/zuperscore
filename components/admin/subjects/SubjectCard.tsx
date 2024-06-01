import React from "react";
// icons
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { FolderAddIcon } from "@heroicons/react/solid";
import { DotsVerticalIcon, PlusIcon } from "@ui/icons";
// swr
import useSWR from "swr";
// components
import TreeCreateView from "@components/admin/subjects/treeStructure/create";
import TreeEditView from "@components/admin/subjects/treeStructure/edit";
import TreeDeleteView from "@components/admin/subjects/treeStructure/delete";
import TreeRenderView from "@components/admin/subjects/treeStructure/helpers/treeRenderView";
import Dropdown from "@components/utilities/Dropdown";
import Button from "@components/buttons";
import MoveTo from "@components/admin/subjects/treeStructure/helpers/MoveTo";
// api routes
import { SUBJECT_WITH_NODE_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// node operations
import { moveNode } from "@components/admin/subjects/treeStructure/helpers/nodeOperations";

const SubjectCard = ({ subject, subjectsList, parentSubject }: any) => {
  const [currentSubject, setCurrentSubject] = React.useState<any>(null);
  const handleCurrentSubject = (type: any, sub: any) => {
    let subject;
    if (sub?.data) subject = { id: sub.id, ...sub?.data };
    else subject = { id: sub.id, title: sub?.title, is_subject: true };
    setCurrentSubject({ type: type, data: subject ,title: subject?.title });
  };

  const { data: subjectDetails, error: subjectDetailsError } = useSWR(
    subject && subject?.id ? [SUBJECT_WITH_NODE_ENDPOINT(subject?.id), subject?.id] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const subjectOptions = (data: any) => {
    return [
      {
        icon: <FolderAddIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Add Folder",
        on_click: () => handleCurrentSubject("add", data),
      },
      {
        icon: <PencilIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Edit",
        on_click: () => handleCurrentSubject("edit", data),
      },
      {
        icon: <TrashIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Delete",
        on_click: () => handleCurrentSubject("delete", data),
      },
    ];
  };

  const findItemNested = (arr: any, itemId: any, nestingKey: any) =>
    arr.reduce((a: any, item: any) => {
      if (a) return a;
      if (item.id === itemId) return item;
      if (item[nestingKey]) return findItemNested(item[nestingKey], itemId, nestingKey);
    }, null);

  const sequenceReorder = (list: any, startIndex: any, endIndex: any) => {
    const result: any = Array.from(list);
    const [removed]: any = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const updateSequenceDataChange = (node: Array<object>, nodeId: number, data: object) => {
    node.map((nodeItem: any) => {
      if (nodeId === nodeItem.id) {
        nodeItem.children = data;
      } else {
        if (nodeItem.children) {
          updateSequenceDataChange(nodeItem.children, nodeId, data);
        }
      }
    });
    return node;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.source && result.destination) {
      let currentTreeParentNode: any = findItemNested(
        subjectDetails?.tree,
        parseInt(result.source.droppableId),
        "children"
      );

      let node_id: any = currentTreeParentNode.children[result.source.index].id;
      let target_id: any = currentTreeParentNode.children[result.destination.index].id;

      let execData: any;
      if (result.destination.index > result.source.index) {
        execData = moveNode(node_id, target_id, "right");
      } else {
        execData = moveNode(node_id, target_id, "left");
      }

      console.log("execData", execData);

      let reorderedData: any = sequenceReorder(
        currentTreeParentNode.children,
        result.source.index,
        result.destination.index
      );

      let updatedCurrentTree: any = updateSequenceDataChange(
        subjectDetails?.tree,
        parseInt(result.source.droppableId),
        reorderedData
      );

      // setTree([...updatedCurrentTree[0].children]);

      // mutate(
      //   [SUBJECT_WITH_NODE_ENDPOINT(root_node_id), root_node_id],
      //   async (elements: any) => {
      //     const payload = { ...elements, tree: updatedCurrentTree };
      //     return payload;
      //   },
      //   false
      // );
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl font-bold capitalize">
          {subjectDetails && subjectDetails?.tree[0]?.data?.title}
        </div>
        <div className="flex items-center gap-2">
          {/* <Button
            variant="secondary"
            size="sm"
            onClick={() => handleCurrentSubject("delete", subject)}
          >
            Delete Subject
          </Button> */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleCurrentSubject("edit", subject)}
            className="flex items-center gap-2"
          >
            <PencilIcon height="14px" width="14px" fill="#8b8b8b" />
            Edit Subject
          </Button>
          <Button
            size="sm"
            onClick={() => handleCurrentSubject("add", subject)}
            className="flex items-center gap-2"
          >
            <PlusIcon height="14px" width="14px" fill="#F3E4B1" />
            Add Folder
          </Button>
        </div>
      </div>

      {subjectDetails && !subjectDetailsError ? (
        <div>
          {subjectDetails &&
          subjectDetails?.tree &&
          subjectDetails &&
          subjectDetails?.tree.length > 0 &&
          subjectDetails?.tree[0]?.children &&
          subjectDetails?.tree[0]?.children.length > 0 ? (
            <div className="space-y-3">
              {subjectDetails?.tree[0]?.children.map((subjectChild: any, index: any) => (
                <div key={index}>
                  <div className="border border-gray-300 px-4 py-2 bg-yellow-200 text-violet-100 flex gap-2 items-center">
                    {/* <div className="flex-shrink-0 min-w-[26px] h-[26px] flex justify-center items-center">
                      d
                    </div> */}
                    <div className="font-medium w-full">{subjectChild?.data?.title}</div>
                    <div className="flex-shrink-0 min-w-[26px] h-[26px]"></div>
                    <div className="flex-shrink-0 min-w-[26px] h-[26px]"></div>
                    <div className="flex-shrink-0 w-[26px] h-[26px] flex justify-center items-center rounded-sm cursor-pointer hover:bg-yellow-0">
                      <Dropdown
                        options={subjectOptions(subjectChild)}
                        button={<DotsVerticalIcon height="16px" width="16px" fill="#8B8B8B" />}
                      />
                    </div>
                  </div>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <TreeRenderView
                      tree={subjectChild?.children}
                      level={0}
                      t_children={16}
                      root_node_id={subjectChild?.id}
                      parent={subjectChild?.id}
                      subject={subject}
                      handleCurrentSubject={handleCurrentSubject}
                      parentSubject={parentSubject}
                    />
                  </DragDropContext>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 mb-5 text-center text-gray-400">No Content Available.</div>
          )}
        </div>
      ) : (
        <div className="mt-5 mb-5 text-center text-gray-400">Loading...</div>
      )}

      {currentSubject && currentSubject?.type === "add" && (
        <TreeCreateView
          data={currentSubject.data}
          handleData={setCurrentSubject}
          add_to="children"
          subject={subject}
        />
      )}

      {currentSubject && currentSubject?.type === "edit" && (
        <TreeEditView data={currentSubject?.data} handleData={setCurrentSubject} subject={subject} />
      )}

      {currentSubject && currentSubject?.type === "delete" && (
        <TreeDeleteView
          data={currentSubject.data}
          handleData={setCurrentSubject}
          subject={subject}
        />
      )}

      {currentSubject && currentSubject?.type === "move" && (
        <MoveTo
          data={currentSubject.data}
          handleData={setCurrentSubject}
          subjectTree={subjectDetails?.tree[0]?.children}
          subject={subject}
          subjectsList={subjectsList}
        />
      )}
    </div>
  );
};

export default SubjectCard;
