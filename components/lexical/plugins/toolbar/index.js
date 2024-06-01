import React from "react";
// lexical
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getSelectionStyleValueForProperty, $patchStyleText } from "@lexical/selection";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
// image upload model
import ImageUploadModal from "@components/ui/ImageUploadModal";
// icons
import {
  ImageIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikeIcon,
  SubScriptIcon,
  SuperScriptIcon,
} from "../../icons";

// plugins
import { INSERT_IMAGE_COMMAND } from "../ImagePlugin";

//components
import BlockElementDropDown from "./BlockElementDropDown";
import AlignmentDropDown from "./AlignmentDropDown";
import Equation from "./Equation";
import DropDown from "components/lexical/ui/DropDown";
import ColorPicker from "../../ui/ColorPicker";

const InsertImageDialog = ({ activeEditor, isModal, setIsModal }) => {
  const onClick = (url) => {
    activeEditor.focus();
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: url, altText: "test" });
    setIsModal(false);
  };
  return (
    <ImageUploadModal
      modal={isModal}
      handleModal={setIsModal}
      handleImage={onClick}
      context={"exams"}
    />
  );
};

const ImageHandler = (props) => {
  const [isModal, setIsModal] = React.useState(false);

  return (
    <>
      <label
        className={`bg-gray-200 hover:bg-gray-300 rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm cursor-pointer m-0 p-0`}
        onClick={() => setIsModal(true)}
      >
        <ImageIcon width="14px" height="14px" />
      </label>
      <InsertImageDialog
        activeEditor={props.activeEditor}
        isModal={isModal}
        setIsModal={setIsModal}
      />
    </>
  );
};

const Divider = () => {
  return <div className="divide-x border border-solid divide-gray-200" />;
};

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = React.useState(editor);
  const [blockType, setBlockType] = React.useState("paragraph");

  const [fontSize, setFontSize] = React.useState("15px");
  // const [fontFamily, setFontFamily] = React.useState("Arial");
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isSubscript, setIsSubscript] = React.useState(false);
  const [isSuperscript, setIsSuperscript] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const [isText, setIsText] = React.useState(true);
  const [bgColor, setBgColor] = React.useState("#fff");

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#fff"));

      if (elementDOM !== null) {
        // setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
        }
      }
      setFontSize($getSelectionStyleValueForProperty(selection, "font-size", "15px"));
    }
    setIsText($isRangeSelection(selection));
  }, [activeEditor]);

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        // updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  React.useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, updateToolbar]);

  const applyStyleText = React.useCallback(
    (styles) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const fontSizes = [
    { name: "10px", value: "10px" },
    { name: "11px", value: "11px" },
    { name: "12px", value: "12px" },
    { name: "13px", value: "13px" },
    { name: "14px", value: "14px" },
    { name: "15px", value: "15px" },
    { name: "16px", value: "16px" },
    { name: "17px", value: "17px" },
    { name: "18px", value: "18px" },
    { name: "19px", value: "19px" },
    { name: "20px", value: "20px" },
  ];

  const onFontSizeSelect = React.useCallback(
    (value) => {
      applyStyleText({ "font-size": value });
    },
    [applyStyleText]
  );
  const onBgColorSelect = React.useCallback(
    (value) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );

  return (
    <div className="bg-white py-2 px-2 border border-solid border-gray-200 rounded-t flex items-center flex-wrap gap-2">
      <button
        className={`bg-gray-200 hover:bg-gray-300 rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        disabled={!canUndo}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      >
        Undo
      </button>
      <button
        className={`bg-gray-200 hover:bg-gray-300 rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        disabled={!canRedo}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      >
        Redo
      </button>

      <Divider />

      <BlockElementDropDown editor={activeEditor} blockType={blockType} disabled={!isText} />

      <Divider />

      <DropDown
        list={fontSizes}
        handleChange={onFontSizeSelect}
        value={fontSize}
        disabled={!isText}
      />

      <Divider />

      <button
        className={`${
          isBold ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`
        } rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        disabled={!isText}
      >
        <BoldIcon width="14px" height="14px" />
      </button>
      <button
        className={`${
          isItalic ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`
        } rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        disabled={!isText}
      >
        <ItalicIcon width="14px" height="14px" />
      </button>
      <button
        className={`${
          isUnderline ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`
        } rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        disabled={!isText}
      >
        <UnderlineIcon width="14px" height="14px" />
      </button>
      <button
        className={`${
          isStrikethrough ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`
        } rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        disabled={!isText}
      >
        <StrikeIcon width="14px" height="14px" />
      </button>

      <button
        className={`${
          isSubscript ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`
        } rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}
        disabled={!isText}
      >
        <SubScriptIcon width="14px" height="14px" />
      </button>

      <button
        className={`${
          isSuperscript ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`
        } rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}
        disabled={!isText}
      >
        <SuperScriptIcon width="14px" height="14px" />
      </button>

      <ColorPicker
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting background color"
        buttonIconClassName="icon bg-color"
        color={bgColor}
        onChange={onBgColorSelect}
        title="bg color"
      />

      <Divider />

      <button
        className={`bg-gray-200 hover:bg-gray-300 rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
        onClick={() => {
          editor.focus();
          activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
        }}
      >
        Divide
      </button>

      <Divider />

      <AlignmentDropDown activeEditor={activeEditor} />

      <Divider />

      <Equation activeEditor={activeEditor} />

      <Divider />

      <ImageHandler activeEditor={activeEditor} />
    </div>
  );
};

export default Toolbar;
