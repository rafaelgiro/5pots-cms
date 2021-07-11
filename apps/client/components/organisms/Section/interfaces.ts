export interface SectionProps {
  children: React.ReactNode;
  name?: string;
  className?: string;
}

export interface SectionDevProps extends SectionProps {
  sectionIndex: number;
}
