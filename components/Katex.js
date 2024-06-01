import React from "react";
// katex
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const KatexRender = ({ equation, block }) => {
  return block ? (
    <BlockMath>{String.raw`${equation}`}</BlockMath>
  ) : (
    <InlineMath>{String.raw`${equation}`}</InlineMath>
  );
};

export default KatexRender;
