import { createContext } from "react";

const initialState = {
  postContent: {},
  setPostContent: () => {},
};
const PostContext = createContext(initialState);

export default PostContext;
