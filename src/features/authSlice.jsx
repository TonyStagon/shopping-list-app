import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk to register a user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
  const response = await axios.post('http://localhost:5002/users', userData); // Using your JSON server for registration
  return response.data;
});

// Create async thunk to login a user
export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  // Since JSON server doesn't support actual authentication, we simulate login by fetching the user with the same email/password
  const response = await axios.get('http://localhost:5002/users', {
    params: { email: userData.email, password: userData.password },
  });
  
  if (response.data.length > 0) {
    return response.data[0]; // Return the first matching user
  } else {
    throw new Error('Invalid email or password');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, // Store logged-in user data here
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null; // Clear user data on logout
    },
  },
  extraReducers: (builder) => {
    // Handle registration
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isAuthenticated = false; // Keep user logged out after registration
    });

    // Handle login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true; // Mark user as logged in
      state.user = action.payload; // Store the logged-in user's data
    });

    // Handle login failure (e.g., invalid credentials)
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null; // Clear any existing user data
      // Optionally, handle any error messages here
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
