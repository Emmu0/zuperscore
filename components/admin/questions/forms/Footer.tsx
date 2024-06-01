import React from "react";
// components
import Button from "@components/buttons";

interface IQuestionFooter {
  type: any;
  block: any;
  buttonLoader: boolean;
  onBlockUpdate: any;
}

const QuestionFooter: React.FC<IQuestionFooter> = ({
  type,
  block,
  buttonLoader,
  onBlockUpdate,
}: any) => {
  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-300">
      <Button size="sm" disabled={buttonLoader} onClick={onBlockUpdate}>
        {buttonLoader ? "Processing..." : type === "create" ? "Create" : "Update"}
      </Button>
    </div>
  );
};

export default QuestionFooter;
