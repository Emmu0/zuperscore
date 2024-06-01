import React from "react";
// components
import Button from "@components/buttons";

interface IBlockFooter {
  block: any;
  buttonLoader: boolean;
  onBlockUpdate: any;
  setCurrentBlockDelete: any;
}

const BlockFooter: React.FC<IBlockFooter> = ({
  block,
  buttonLoader,
  onBlockUpdate,
  setCurrentBlockDelete,
}: any) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <Button size="sm" variant="secondary" onClick={() => setCurrentBlockDelete(block)}>
        Delete
      </Button>
      <Button size="sm" disabled={buttonLoader} onClick={onBlockUpdate}>
        {buttonLoader ? "Processing..." : "Update"}
      </Button>
    </div>
  );
};

export default BlockFooter;
