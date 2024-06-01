import React from "react";
// lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot } from "lexical";
// nodes
import Nodes from "./nodes/Nodes";
// custom plugins
import Toolbar from "./plugins/toolbar";
import HorizontalLinePlugin from "./plugins/HorizontalLinePlugin";
import ImagePlugin from "./plugins/ImagePlugin";
import EquationsPlugin from "./plugins/EquationsPlugin";
import ReadOnlyPlugin from "./plugins/ReadOnlyPlugin";

// theme
import theme from "./theme/EditorTheme";

function Editor(props) {
  const { id, readOnly = false, data, onChange: onEditorUpdate } = props;

  // const [editor, setEditor] = React.useState();

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

  const [newLoad, setNewLoad] = React.useState(false);

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
    editorState.read(() => {
      //textContent
      const root = $getRoot();
      const text = root.getTextContent();
      let editorData = editorState.toJSON();
      setNewLoad(true);
      if (prevInitialValue.current != JSON.stringify(editorData) && newLoad) {
        prevInitialValue.current = JSON.stringify(editorData);
        if (onEditorUpdate) {
          editor.update(() => {
            const html_string = $generateHtmlFromNodes(editor, null);
            onEditorUpdate(editorData, html_string, text);
          });
        }
        // console.log(htmlString);
        // if (editor) {
        //   const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());
        //   const parsedEditorState = editor.parseEditorState(stringifiedEditorState);
        //   let editorStateTextString = parsedEditorState.read(() => $getRoot().getTextContent());
        //   const editorStateHtmlString = $generateHtmlFromNodes(editor, null);
        //   if (onEditorUpdate) {
        //     onEditorUpdate(editorData, editorStateTextString, editorStateHtmlString);
        //   }
        // }
      }
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
                style={readOnly ? { minHeight: "12px", cursor: "pointer" } : {}}
              />
            }
            placeholder={
              <div className={`editor__paceholder ${!readOnly && "pt-3"} `}>
                Start writing here...
              </div>
            }
          />
          <ShowInitialDataPlugin data={data} />
          <ListPlugin />
          <HorizontalLinePlugin />
          <HistoryPlugin />
          <ImagePlugin />
          <EquationsPlugin />
          <ReadOnlyPlugin readOnly={readOnly} data={data} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
