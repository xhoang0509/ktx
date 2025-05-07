import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";
import { defaultPagination } from "./const";

interface ProductState {
  products: any[];
  categories: any[];
  productsPagination: { page: number; limit: number };
}

const initialState: ProductState = {
  products: [],
  productsPagination: defaultPagination,
  categories: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getCategories: (state, { payload }) => {},
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    getProducts: (state, { payload }) => {},
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    getProductsPagination: (state, { payload }) => {},
    setProductsPagination: (state, { payload }) => {
      state.productsPagination = payload;
    },
    addProduct: (state, { payload }) => {},
    editProduct: (state, { payload }) => {},
    deleteProduct: (state, { payload }) => {},
    getDetailProduct: (state, { payload }) => {},
  },
});
const ProductReducer = ProductSlice.reducer;
export default ProductReducer;
export const ProductActions = ProductSlice.actions;

export const ProductSelectors = {
  products: (state: RootState) => state.product.products,
  categories: (state: RootState) => state.product.categories,
  productsPagination: (state: RootState) => state.product.productsPagination,
};
