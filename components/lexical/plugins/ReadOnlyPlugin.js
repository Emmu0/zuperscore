import { useEffect, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const ReadOnlyPlugin = (props) => {
  const { data, readOnly } = props;
  const [editor] = useLexicalComposerContext();
  const [currentReadOnly, setReadOnly] = useState(false);

  useEffect(() => {
    if (editor && readOnly) {
      editor.setReadOnly(readOnly);
      setReadOnly(readOnly);
    }
  }, [readOnly, editor]);

  useEffect(() => {
    if (currentReadOnly && editor && data) {
      const editorStateJSONString =
        data && typeof data === "object" && data !== null && data !== "" ? data : null;
      if (editorStateJSONString) {
        const initialEditorState = editor?.parseEditorState(editorStateJSONString);
        editor.setEditorState(initialEditorState);
      }
    }
  }, [editor, data, currentReadOnly]);

  return <></>;
};

export default ReadOnlyPlugin;
