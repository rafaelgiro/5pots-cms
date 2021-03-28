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
  isLoading: boolean;
  lightbox: LightboxI;
}

export type UIReducerActionsType =
  | "CHANGE_THEME"
  | "SHOW_SNACKBAR"
  | "HIDE_SNACKBAR"
  | "OPEN_MENU"
  | "CLOSE_MENU"
  | "OPEN_LOADING"
  | "CLOSE_LOADING"
  | "SHOW_LIGHTBOX"
  | "HIDE_LIGHTBOX";

export interface SnackBarI {
  variant?: "success" | "error" | "default";
  visible?: boolean;
  msg?: string;
  time?: number;
}

export interface LightboxI {
  images?: string[];
  visible?: boolean;
  current?: number;
}

export interface UIReducerActionsI {
  type: UIReducerActionsType;
  snackbar?: SnackBarI;
  lightbox?: LightboxI;
}
