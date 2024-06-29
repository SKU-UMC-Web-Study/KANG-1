import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';

const rootReducer = {
  cart: cartReducer,
  modal: modalReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
