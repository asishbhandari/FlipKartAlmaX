import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategories: "",
  products: [],
  FilteredProducts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategories = action.payload;
    },
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    addFilteredProducts: (state, action) => {
      state.FilteredProducts = action.payload;
    },
  },
});

export const { selectCategory, addProducts, addFilteredProducts } =
  uiSlice.actions;
export default uiSlice.reducer;
