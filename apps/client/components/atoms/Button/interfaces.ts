export interface ButtonProps {
  children: React.ReactNode;
  variant?: "normal" | "outline" | "invisible" | "icon";
  type?: "button" | "submit" | "reset";
  color?: string;
  className?: string;
}
