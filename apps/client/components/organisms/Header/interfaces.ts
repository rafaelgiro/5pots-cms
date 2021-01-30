export interface MenuButtonProps {
  onTop?: boolean;
  dark?: boolean;
}

export interface NavProps {
  isVisible?: boolean;
}

export interface NavItemProps {
  link: string;
  children: React.ReactNode;
}
