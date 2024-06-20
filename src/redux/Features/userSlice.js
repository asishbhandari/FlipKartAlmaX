import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  wishList: [],
  cartItems: [],
  cartLength: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action?.payload?.name;
      state.email = action?.payload?.email;
      state.wishList = action?.payload?.wishList;
      state.cartItems = action?.payload?.cartItems;
      state.cartLength = action?.payload?.cartLength;
    },
    removeUser: (state) => {
      state.name = "";
      state.email = "";
      state.wishList = [];
      state.cartItems = [];
      state.cartLength = 0;
    },
    addToWishList: (state, action) => {
      state.wishList = [...state.wishList, action.payload];
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action?.payload?.id
      );
    },
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      state.cartLength += 1;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action?.payload?.id
      );
      state.cartLength -= 1;
    },
    addQuantity: (state, action) => {
      state.cartItems = state?.cartItems?.map((item) =>
        item?.id === action?.payload?.id
          ? { ...item, noOfItem: item?.noOfItem + 1 }
          : item
      );
    },
    removeQuantity: (state, action) => {
      state.cartItems = state?.cartItems?.map((item) =>
        item?.id === action?.payload?.id
          ? { ...item, noOfItem: item?.noOfItem - 1 }
          : item
      );
    },
    removeCartItem: (state) => {
      state.cartItems = [];
      state.cartLength = 0;
    },
  },
});

export const {
  addUser,
  removeUser,
  addToWishList,
  removeFromWishList,
  addToCart,
  removeFromCart,
  addQuantity,
  removeQuantity,
  removeCartItem,
} = userSlice.actions;
export default userSlice.reducer;
