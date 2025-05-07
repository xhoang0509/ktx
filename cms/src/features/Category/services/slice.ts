import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface CategoryState {
  categories: any[];
}

const initialState: CategoryState = {
  categories: [],
};

export const CategorySlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getCategories: (state, { payload }) => {},
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    addCategory: (state, { payload }) => {},
    editCategory: (state, { payload }) => {},
    deleteCategory: (state, { payload }) => {},
    getDetailCategory: (state, { payload }) => {},
  },
});
const CategoryReducer = CategorySlice.reducer;
export default CategoryReducer;
export const CategoryActions = CategorySlice.actions;

export const CategorySelectors = {
  categories: (state: RootState) => state.category.categories,
};
