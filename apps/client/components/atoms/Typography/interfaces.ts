export interface TypographyProps {
  component: keyof JSX.IntrinsicElements;
  variant: "h1" | "h2" | "h3" | "h4" | "p" | "sub";
  children: React.ReactNode | string;
  className?: string;
  style?: React.CSSProperties;
}
