import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductItem {
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
}
interface ProductState {
  products: ProductItem[];
  pageNo: number;
  isLoading: boolean;
  currentProduct: ProductItem;
}

const initialState: ProductState = {
  products: [],
  pageNo: 1,
  isLoading: false,
  currentProduct: {
    _id: "",
    name: "",
    image: "",
    brand: "",
    category: "",
    price: 0,
    description: "",
    rating: 0,
    numReviews: 0,
    countInStock: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addFetchedProductsToState: (
      state,
      action: PayloadAction<ProductItem[]>
    ) => {
      state.products = action.payload;
    },
    incrementPageBy: (state, action: PayloadAction<number>) => {
      state.pageNo += action.payload;
    },
    decrementPageBy: (state, action: PayloadAction<number>) => {
      state.pageNo -= action.payload;
    },
    setIsLoading: (state,action:PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addToCurrentProduct: (state, action: PayloadAction<ProductItem>) => {
      state.currentProduct = action.payload;
    },
  },
});

export const {
  addFetchedProductsToState,
  incrementPageBy,
  decrementPageBy,
  setIsLoading,
  addToCurrentProduct,
} = productSlice.actions;
export default productSlice.reducer;
