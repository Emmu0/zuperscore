import { useEffect } from "react";
// lexical
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
//nodes
import { $createEquationNode, EquationNode } from "../nodes/EquationNode";

export const INSERT_EQUATION_COMMAND = createCommand();

const EquationsPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([EquationNode])) {
      throw new Error("EquationsPlugins: EquationsNode not registered on editor");
    }

    return editor.registerCommand(
      INSERT_EQUATION_COMMAND,
      (payload) => {
        const { equation, inline } = payload;
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const equationNode = $createEquationNode(equation, inline);
          selection.insertNodes([equationNode]);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
};

export default EquationsPlugin;
