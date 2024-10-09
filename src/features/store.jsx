// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your auth reducer
import shoppingListReducer from './shoppingListSlice'; // Import your shopping list reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingLists: shoppingListReducer, // Add your shopping list reducer here
  },
});

export default store;
