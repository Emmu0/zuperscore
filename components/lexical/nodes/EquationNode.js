import { useCallback, useEffect, useRef, useState } from "react";

// lexical
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  COMMAND_PRIORITY_HIGH,
  DecoratorNode,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

// ui components
import EquationEditor from "../ui/EquationEditor";
import DisplayKatex from "../ui/DisplayKatex";

const EquationComponent = ({ equation, inline, nodeKey }) => {
  const [editor] = useLexicalComposerContext();
  const [equationValue, setEquationValue] = useState(equation);
  const [showEquationEditor, setShowEquationEditor] = useState(false);
  const inputRef = useRef(null);

  const onHide = useCallback(
    (restoreSelection) => {
      setShowEquationEditor(false);
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isEquationNode(node)) {
          node.setEquation(equationValue);
          if (restoreSelection) {
            node.selectNext(0, 0);
          }
        }
      });
    },
    [editor, equationValue, nodeKey]
  );

  useEffect(() => {
    if (showEquationEditor) {
      return mergeRegister(
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          (payload) => {
            const activeElement = document.activeElement;
            const inputElem = inputRef.current;
            if (inputElem !== activeElement) {
              onHide();
            }
            return false;
          },
          COMMAND_PRIORITY_HIGH
        ),
        editor.registerCommand(
          KEY_ESCAPE_COMMAND,
          (payload) => {
            const activeElement = document.activeElement;
            const inputElem = inputRef.current;
            if (inputElem === activeElement) {
              onHide(true);
              return true;
            }
            return false;
          },
          COMMAND_PRIORITY_HIGH
        )
      );
    }
  }, [editor, onHide, showEquationEditor]);

  return (
    <>
      {showEquationEditor ? (
        <EquationEditor
          equation={equationValue}
          setEquation={setEquationValue}
          inline={inline}
          inputRef={inputRef}
        />
      ) : (
        <DisplayKatex
          equation={equationValue}
          inline={inline}
          onClick={() => {
            setShowEquationEditor(true);
          }}
        />
      )}
    </>
  );
};

export class EquationNode extends DecoratorNode {
  __equation;
  __inline;

  static getType() {
    return "equation";
  }

  static clone(node) {
    return new EquationNode(node.__equation, node.__inline, node.__key);
  }

  constructor(equation, inline, key) {
    super(key);
    this.__equation = equation;
    this.__inline = inline ?? false;
  }

  static importJSON(serializedNode) {
    const node = $createEquationNode(serializedNode.equation, serializedNode.inline);
    return node;
  }

  exportJSON() {
    return {
      equation: this.getEquation(),
      inline: this.__inline,
      type: "equation",
      version: 1,
    };
  }

  createDOM(_config) {
    return document.createElement(this.__inline ? "span" : "div");
  }

  updateDOM(prevNode) {
    // If the inline property changes, replace the element
    return this.__inline !== prevNode.__inline;
  }

  getEquation() {
    return this.__equation;
  }

  setEquation(equation) {
    const writable = this.getWritable();
    writable.__equation = equation;
  }

  decorate() {
    return (
      <EquationComponent equation={this.__equation} inline={this.__inline} nodeKey={this.__key} />
    );
  }
}

export function $createEquationNode(equation = "", inline = false) {
  const equationNode = new EquationNode(equation, inline);
  return equationNode;
}

export function $isEquationNode(node) {
  return node instanceof EquationNode;
}
