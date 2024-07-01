import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',  
  async (_, thunkAPI) => { 
    try {
      const response = await fetch('http://localhost:8081/musics'); 
      if (!response.ok) {
        throw new Error('404 Page Not Found' ); 
      }
      const data = await response.json(); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
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
        state.totalPrice += Number(existingItem.price);
      }
    },
    decreaseItemQuantity(state, action) {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.amount > 1) {
        existingItem.amount--;
        state.totalQuantity--;
        state.totalPrice -= Number(existingItem.price);
      } else if (existingItem && existingItem.amount === 1) {
        state.totalQuantity--;
        state.totalPrice -= Number(existingItem.price);
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    removeItem(state, action) {
      const { id } = action.payload;
      const itemToRemove = state.items.find(item => item.id === id);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.amount;
        state.totalPrice -= Number(itemToRemove.price) * itemToRemove.amount;
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
      state.totalPrice = state.items.reduce((acc, item) => acc + Number(item.price) * item.amount, 0);
    },
  },
 extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.amount, 0);
        state.totalPrice = state.items.reduce((acc, item) => acc + Number(item.price) * item.amount, 0);
        state.error = null; 
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
        alert(`Error: ${action.payload}`);
      });
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
