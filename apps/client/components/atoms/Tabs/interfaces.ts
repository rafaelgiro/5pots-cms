import { SectionIconsType } from "../Icons/interfaces";

export interface TabsProps {
  children: React.ReactElement[];
  onClick?: () => void;
  className?: string;
}

export interface TabItemProps {
  title: string;
  icon: SectionIconsType;
}

export interface TabNavigationProps {
  options: { title: string; icon: SectionIconsType }[];
  onClick?: () => void;
}

export interface TabContentProps {
  content: React.ReactElement[];
}

export interface OptionsI {
  id: number;
  title: string;
  icon: SectionIconsType;
}

export interface TabContextProps {
  current: number;
  setCurrent: (active: number) => void;
}
