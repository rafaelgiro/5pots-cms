export interface PostContextI {
  postContent?: PostContentI;
  setPostContent?: React.Dispatch<React.SetStateAction<PostContentI>>;
}

export interface UserContextI {
  user?: User;
  setUser?:
    | React.Dispatch<React.SetStateAction<User | undefined>>
    | React.Dispatch<React.SetStateAction<undefined>>;
}

export interface UIReducerStateI {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  snackbar: { msg?: string; variant?: string; visible: boolean; time?: number };
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UIReducerActionsType =
  | "CHANGE_THEME"
  | "SHOW_SNACKBAR"
  | "HIDE_SNACKBAR"
  | "OPEN_MENU"
  | "CLOSE_MENU";

export interface SnackBarI {
  variant?: "success" | "error" | "default";
  visible?: boolean;
  msg?: string;
  time?: number;
}

export interface UIReducerActionsI {
  type: UIReducerActionsType;
  snackbar?: SnackBarI;
}
