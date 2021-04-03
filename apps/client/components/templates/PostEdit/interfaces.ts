import { Dispatch, SetStateAction } from "react";
import { PostBodyProps, PostHeaderProps } from "../PostView/interfaces";

export interface PostEditProps {
  post: Post;
  champions: Champion[];
  allChampions: string[];
}

export interface SavePostButtonProps {
  hasChanged: boolean;
  handleUpdate: () => void;
}

export interface PostHeaderDevProps extends PostHeaderProps {
  handleChange: (key: string, value: string) => void;
  slug: Post["slug"];
}

export interface EditCotextI {
  json?: boolean;
  handleChampionChange: (newChange: ChampionChange) => void;
  handleNewChampion: (champion: string) => void;
  handleDeleteChampion: (champion: string) => void;
  postState?: Post;
  setPostState: Dispatch<SetStateAction<Post>>;
  championSectionIndex: number;
  handleNewFromPaste(championChange: ChampionChange): void;
}

export interface PostBodyDevProps extends PostBodyProps {
  allChampions: string[];
}
