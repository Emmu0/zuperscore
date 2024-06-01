import React from "react";
// swr
import { mutate } from "swr";
// components
import QuestionPreview from "@components/admin/questions/preview";
import QuestionEditModal from "@components/admin/questions/EditModal";
import QuestionDelete from "@components/admin/questions/Delete";
import QuestionPreviewModal from "@components/admin/questions/PreviewModal";
import QuestionSequence from "@components/admin/questions/QuestionSequence";

interface IProps {
  block_bridge?: any;
  blockBridgeSeqUpdate?: any;
  block: any;
  mutate_url?: any;
  from?: string;
}
const QuestionBlockRoot: React.FC<IProps> = ({
  block_bridge,
  blockBridgeSeqUpdate,
  block,
  mutate_url,
  from = "subjects",
}) => {
  const [currentBlock, setCurrentBlock] = React.useState<any>(null);
  const handleCurrentBlock = (type: string, data: any = null) => {
    if (type === "clear") {
      setCurrentBlock(null);
      if (mutate_url) mutate(mutate_url, true);
    } else if (type === "close-modal") setCurrentBlock(null);
    else setCurrentBlock({ type: type, data: data });
  };

  const [currentBlockSequence, setCurrentBlockSequence] = React.useState<any>(null);
  const handleCurrentBlockSequence = (type: string, data: any = null) => {
    if (type === "clear") {
      setCurrentBlockSequence(null);
      if (mutate_url) mutate(mutate_url, true);
    } else if (type === "close-modal") setCurrentBlockSequence(null);
    else setCurrentBlockSequence({ type: type, data: data });
  };

  return (
    <>
      {block && (
        <div className="bg-white">
          <QuestionPreview
            block_bridge={block_bridge}
            block={block}
            handleCurrentBlock={handleCurrentBlock}
            handleCurrentBlockSequence={handleCurrentBlockSequence}
            from={from}
          />
        </div>
      )}

      {currentBlock && currentBlock?.type === "edit" && (
        <QuestionEditModal data={currentBlock?.data} handleCurrentBlock={handleCurrentBlock} />
      )}

      {currentBlock && currentBlock?.type === "delete" && (
        <QuestionDelete data={currentBlock?.data} handleCurrentBlock={handleCurrentBlock} />
      )}

      {currentBlock && currentBlock?.type === "preview" && (
        <QuestionPreviewModal data={currentBlock?.data} handleCurrentBlock={handleCurrentBlock} />
      )}

      {currentBlockSequence && currentBlockSequence?.type === "sequence" && (
        <QuestionSequence
          data={currentBlockSequence?.data}
          handleCurrentBlockSequence={handleCurrentBlockSequence}
          blockBridgeSeqUpdate={blockBridgeSeqUpdate}
        />
      )}
    </>
  );
};

export default QuestionBlockRoot;
