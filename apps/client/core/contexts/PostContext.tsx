import { createContext } from "react";
import { PostContextI } from "./interfaces";

const initialState: PostContextI = {
  postContent: undefined,
  setPostContent: undefined,
};
const PostContext = createContext(initialState);

export default PostContext;
