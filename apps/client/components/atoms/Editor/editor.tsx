import { useEditor } from ".";
import { EditorContainerProps } from "./interfaces";
import { tools } from "./tools";

const EditorContainer = (props: EditorContainerProps) => {
  const { editorRef, children, data, options } = props;
  useEditor(tools, { data, editorRef }, options);

  return (
    <>
      {!children && <div className="container" id="editor-js"></div>}
      {children}
    </>
  );
};

export default EditorContainer;
