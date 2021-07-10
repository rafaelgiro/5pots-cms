import { OutputData } from "@editorjs/editorjs";
import React, { ReactNode } from "react";

export interface EditorContainerProps {
  editorRef: React.Dispatch<any>;
  children?: ReactNode;
  data?: OutputData | undefined;
  options: Record<string, any>;
  onChange: () => void;
}
