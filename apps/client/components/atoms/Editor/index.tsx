import React, { useEffect, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

/**
 *
 * @param {EditorJS.Tool[]} toolsList
 * @param {*} param1
 * @param {EditorJS.EditorConfig} options
 */
export const useEditor = (
  toolsList: Record<string, any>,
  {
    data,
    editorRef,
  }: { data: OutputData | undefined; editorRef: React.Dispatch<any> },
  options: Record<string, any> = {},
  onChange: () => void
) => {
  const [editorInstance, setEditor] = useState<EditorJS | null>(null);
  const {
    data: ignoreData,
    tools: ignoreTools,
    holder: ignoreHolder,
    ...editorOptions
  } = options;

  // initialize
  useEffect(() => {
    // create instance
    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: "editor-js",

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: toolsList,

      /**
       * Previously saved data that should be rendered
       */
      data: data || undefined,

      initialBlock: "paragraph",

      onChange,

      // Override editor options
      ...editorOptions,
    });

    setEditor(editor);

    // cleanup
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setEditor(null);
        })
        .catch((e) => console.error("ERROR editor cleanup", e));
    };
  }, [toolsList]);

  // set reference
  useEffect(() => {
    if (!editorInstance) {
      return;
    }
    // Send instance to the parent
    if (editorRef) {
      editorRef(editorInstance);
    }
  }, [editorInstance, editorRef]);

  return { editor: editorInstance };
};
