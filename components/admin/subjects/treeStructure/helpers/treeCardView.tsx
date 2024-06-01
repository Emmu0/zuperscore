import React from "react";
// next imports
import Link from "next/link";
// icons
import { PencilIcon, TrashIcon, FolderAddIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@ui/icons";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
// components
import TreeRenderView from "./treeRenderView";
import Dropdown from "@components/utilities/Dropdown";

type TreeData = {
  children?: any;
  data: {
    created_at: string;
    data: any;
    description: string;
    is_active: boolean;
    kind: string;
    props: any;
    title: string;
    updated_at: string;
    visible: boolean;
  };
  id: number | null | undefined;
};

type Props = {
  tree: TreeData;
  level: number | string;
  t_children: number;
  root_node_id: number | null | undefined;
  parent: number | null | undefined;
  index: number;
  subject: any;
  handleCurrentSubject: any;
  parentSubject: any;
};

const TreeChildrenRenderView = ({
  tree,
  level,
  t_children,
  root_node_id,
  subject,
  handleCurrentSubject,
  parentSubject,
}: Props) => {
  const [dropdownToggle, setDropdownToggle] = React.useState<any>(true);

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

  return (
    <>
      <div
        className="border border-t-0 border-gray-300 px-4 py-2 text-violet-100 flex gap-2 items-center"
        style={t_children > 0 ? { paddingLeft: `${t_children}px` } : {}}
      >
        {tree && tree?.children && tree?.children.length > 0 && (
          <div
            onClick={() => setDropdownToggle(!dropdownToggle)}
            className="w-[26px] h-[26px] flex justify-center items-center rounded-sm cursor-pointer hover:bg-yellow-0"
          >
            {dropdownToggle ? <ChevronDownIcon width="18px" /> : <ChevronRightIcon width="18px" />}
          </div>
        )}

        <div className="w-full">{tree?.data?.title}</div>
        <div className="flex-shrink-0 min-w-[26px] h-[26px]"></div>
        <div
          className="flex-shrink-0 min-w-[26px] h-[20px] text-[12px] rounded-full flex justify-center items-center px-2 bg-violet-0 bg-opacity-30 hover:bg-opacity-60 cursor-pointer transition-all"
          onClick={() => handleCurrentSubject("move", tree)}
        >
          Move
        </div>
        <Link href={`/subjects/${subject?.id}/questions/${tree?.id}`}>
          <a>
            <div className="flex-shrink-0 min-w-[26px] h-[20px] text-[12px] rounded-full flex justify-center items-center px-2 bg-violet-0 bg-opacity-30 hover:bg-opacity-60 cursor-pointer transition-all">
              Questions
            </div>
          </a>
        </Link>
        <div className="flex-shrink-0 w-[26px] h-[26px] flex justify-center items-center rounded-sm cursor-pointer hover:bg-yellow-0 transition-all">
          <Dropdown
            options={subjectOptions(tree)}
            button={<DotsVerticalIcon height="16px" width="16px" fill="#8B8B8B" />}
          />
        </div>
      </div>

      {dropdownToggle &&
        tree.children &&
        tree.children.length > 0 &&
        tree.children[0]?.data?.is_active && (
          <div>
            <TreeRenderView
              tree={tree.children}
              level={level}
              t_children={t_children + 30}
              root_node_id={root_node_id}
              parent={tree.id}
              subject={subject}
              handleCurrentSubject={handleCurrentSubject}
              parentSubject={parentSubject}
            />
          </div>
        )}
    </>
  );
};

export default TreeChildrenRenderView;
