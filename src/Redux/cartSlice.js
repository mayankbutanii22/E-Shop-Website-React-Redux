import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress') || '{}'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const exist = state.cartItems.find(x => x._id === item._id);
      if (exist) {
        state.cartItems = state.cartItems.map(x =>
          x._id === item._id ? { ...x, qty: item.qty } : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

