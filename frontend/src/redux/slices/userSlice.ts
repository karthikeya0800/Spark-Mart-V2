import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderItem {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  numReviews: number;
  quantity: number;
  countInStock: number;
  date: string;
}
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

export interface UserRecord {
  _id: string;
  username: string;
  cart: CartItem[];
  orders: OrderItem[];
}

interface UserState {
  value: UserRecord;
}

const initialState: UserState = {
  value: {
    _id: "",
    username: "",
    cart: [],
    orders: [],
  },
};

export const refreshOrders = createAsyncThunk(
  "user/refreshOrders",
  async (userId: string) => {
    const response = await axios.post(
      "https://spark-mart-backend.vercel.app/api/users/myorders/",
      { userId }
    );
    return response.data.orders.reverse();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserRecord>) => {
      state.value = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const foundItem = state.value.cart.find(
        (item) => item._id === action.payload._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        state.value.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      for (const item of state.value.cart) {
        if (item._id === action.payload._id) {
          item.quantity -= 1;
        }
        if (item.quantity == 0) {
          state.value.cart = state.value.cart.filter(
            (cartItem) => cartItem._id !== action.payload._id
          );
        }
      }
    },
    clearCart: (state) => {
      state.value.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshOrders.fulfilled, (state, action) => {
      state.value.orders = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, setUser, clearCart } =
  userSlice.actions;
export default userSlice.reducer;
