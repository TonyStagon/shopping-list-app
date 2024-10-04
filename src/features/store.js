import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure this exists and is exported correctly
import listReducer from './listSlice'; // Ensure this exists and is exported correctly

const store = configureStore({
    reducer: {
        auth: authReducer,
        lists: listReducer,
    },
});

export default store;