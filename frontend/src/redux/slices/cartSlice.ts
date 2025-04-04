import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  quantity: number;
}
interface CartState {
  value: CartItem[];
}

const initialState: CartState = {
  value: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const foundItem = state.value.find(
        (item) => item._id === action.payload._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        state.value.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.value.forEach((item) => {
        if (item._id === action.payload._id) {
          item.quantity -= 1;
          if (item.quantity === 0) {
            state.value = state.value.filter(
              (item) => item._id !== action.payload._id
            );
          }
        }
      });
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
