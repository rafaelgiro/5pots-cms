import { useCallback, useState, useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

export const dataKey = "editorData";

export const useSaveCallback = (editor: EditorJS) => {
  return useCallback(async () => {
    if (!editor) return;
    try {
      const out = await editor.save();
      return out;
    } catch (e) {
      console.error("SAVE RESULT failed", e);
    }
  }, [editor]);
};

// Set editor data after initializing
export const useSetData = (editor: EditorJS | null, data: OutputData) => {
  useEffect(() => {
    if (!editor || !data) {
      return;
    }

    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        editor.render(data);
      }, 100);
    });
  }, [editor, data]);
};

export const useClearDataCallback = (editor: EditorJS) => {
  return useCallback(
    (ev) => {
      ev.preventDefault();
      if (!editor) {
        return;
      }
      editor.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor.clear();
        }, 100);
      });
    },
    [editor]
  );
};

// load saved data
export const useLoadData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mimic async data load
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      console.group("EDITOR load data");
      const saved = localStorage.getItem(dataKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
        console.dir(parsed);
      } else {
        console.info("No saved data, using initial");
      }
      console.groupEnd();
      setLoading(false);
    }, 200);

    return () => {
      setLoading(false);
      clearTimeout(id);
    };
  }, []);

  return { data, loading };
};
