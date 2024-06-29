import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  items: cartItems,
  totalQuantity: cartItems.reduce((acc, item) => acc + item.amount, 0),
  totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.amount, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseItemQuantity(state, action) {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.amount++;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },
    decreaseItemQuantity(state, action) {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.amount > 1) {
        existingItem.amount--;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      } else if (existingItem && existingItem.amount === 1) {
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    removeItem(state, action) {
      const { id } = action.payload;
      const itemToRemove = state.items.find(item => item.id === id);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.amount;
        state.totalPrice -= itemToRemove.price * itemToRemove.amount;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    calculateTotals(state) {
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.amount, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.amount, 0);
    },
  },
});

export const {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
