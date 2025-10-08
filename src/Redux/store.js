import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer,
  },
});
export default store;