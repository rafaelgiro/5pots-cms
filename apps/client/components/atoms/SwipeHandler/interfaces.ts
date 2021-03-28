import { ReactNode } from "react";

export interface SwipeHandlerProps {
  onLeft?(): void;
  onRight?(): void;
  onTop?(): void;
  onDown?(): void;
  children: ReactNode;
}
