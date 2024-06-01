import React from "react";
// components
import BlockHeader from "./Header";
import BlockPassage from "./Passage";
import BlockContent from "./Content";
import BlockMCQ from "./BlockMCQ";
import BlockSPR from "./BlockSPR";

interface IProps {
  block_bridge?: any;
  block: any;
  handleCurrentBlock?: any;
  handleCurrentBlockSequence?: any;
  from?: string;
}

const BlockMcqPreview: React.FC<IProps> = ({
  block_bridge,
  block,
  handleCurrentBlock,
  handleCurrentBlockSequence,
  from,
}) => {
  return (
    <div>
      <BlockHeader
        block_bridge={block_bridge}
        block={block}
        handleCurrentBlock={handleCurrentBlock}
        handleCurrentBlockSequence={handleCurrentBlockSequence}
        from={from}
      />
      <BlockPassage block={block} handleCurrentBlock={handleCurrentBlock} from={from} />
      <BlockContent block={block} handleCurrentBlock={handleCurrentBlock} from={from} />
      {block?.type === "MCQ" && (
        <BlockMCQ block={block} handleCurrentBlock={handleCurrentBlock} from={from} />
      )}
      {block?.type === "SPR" && (
        <BlockSPR block={block} handleCurrentBlock={handleCurrentBlock} from={from} />
      )}
    </div>
  );
};

export default BlockMcqPreview;
