export interface SectionTitleProps {
  children: React.ReactNode;
  title: string;
}

export interface SectionTitleDevProps extends SectionTitleProps {
  sectionIndex: number;
}
