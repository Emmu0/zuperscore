import React from "react";
// lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
// nodes
import Nodes from "./nodes/Nodes";
// custom plugins
import Toolbar from "./plugins/toolbar";
import ReadOnlyPlugin from "./plugins/ReadOnlyPlugin";
// theme
import theme from "./theme/EditorTheme";

function Editor(props) {
  const { id, readOnly = false, data, onChange: onEditorUpdate } = props;
  const prevInitialValue = React.useRef("");

  const initialConfig = {
    namespace: id || "Lexical Editor",
    theme,
    nodes: [...Nodes],
    onError: function onError(error) {
      console.error("error", error);
    },
    readOnly: readOnly,
  };

  const ShowInitialDataPlugin = ({ data }) => {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
      // if (editor) setEditor(editor);
      if (prevInitialValue.current != JSON.stringify(data)) {
        const editorStateJSONString =
          data && typeof data === "object" && data !== null ? data : null;
        if (editorStateJSONString) {
          prevInitialValue.current = JSON.stringify(editorStateJSONString);
          const editorState = editor.parseEditorState(editorStateJSONString);
          editor.setEditorState(editorState);
        } else {
          let payload = {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  direction: "ltr",
                },
              ],
              direction: "ltr",
            },
          };
          prevInitialValue.current = JSON.stringify(payload);
          const editorState = editor.parseEditorState(payload);
          editor.setEditorState(editorState);
        }
      }
    }, [data, editor]);
    return null;
  };

  const onChange = (editorState, editor) => {
    //Html_string
    editor.update(() => {
      const html_string = $generateHtmlFromNodes(editor, null);
      onEditorUpdate(html_string)
    });
  };

  return (
    <div className="editor-shell">
      <LexicalComposer initialConfig={initialConfig}>
        {!readOnly && <Toolbar />}
        <div className={`editor-container ${!readOnly && "pt-3"}`}>
          <AutoFocusPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`contenteditable ${
                  readOnly
                    ? `resize-none pointer-events-none !cursor-pointer border-0 text-semibold`
                    : `border`
                } !border-t-0 border-solid border-gray-200`}
                style={readOnly ? { minHeight: "12px", cursor: "pointer", display: "none" } : {}}
              />
            }
            placeholder={
              <div className={`editor__paceholder ${!readOnly && "pt-3"} `}>
                Start writing here...
              </div>
            }
          />

          <ReadOnlyPlugin readOnly={readOnly} data={data} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
