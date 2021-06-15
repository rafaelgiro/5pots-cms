export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "normal" | "outline" | "invisible" | "icon";
  type?: "button" | "submit" | "reset";
  color?: string;
  className?: string;
}
