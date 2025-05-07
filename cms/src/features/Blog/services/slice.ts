import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface BlogState {
  blogs: any[];
}

const initialState: BlogState = {
  blogs: [],
};

export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogs: (state, { payload }) => {},
    setBlogs: (state, { payload }) => {
      state.blogs = payload;
    },
    addBlog: (state, { payload }) => {},
    editBlog: (state, { payload }) => {},
    deleteBlog: (state, { payload }) => {},
    getDetailBlog: (state, { payload }) => {},
  },
});
const BlogReducer = BlogSlice.reducer;
export default BlogReducer;
export const BlogActions = BlogSlice.actions;

export const BlogSelectors = {
  blogs: (state: RootState) => state.blog.blogs,
};
