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

// Create async thunk to update user profile
export const updateUser = createAsyncThunk('auth/updateUser', async (userData) => {
  const { id, ...updatedData } = userData; // Extract the ID and the rest of the data
  const response = await axios.patch(`http://localhost:5002/users/${id}`, updatedData); // Use PATCH to update the user
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, // Store logged-in user data here
    status: 'idle', // Add status to handle async states
    error: null,    // Store error messages if needed
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
      state.error = null; // Clear error on successful login
    });

    // Handle login failure (e.g., invalid credentials)
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null; // Clear any existing user data
      state.error = action.error.message; // Store error message for displaying to the user
    });

    // Handle profile update
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload; // Update the user data with the new info
      state.status = 'succeeded'; // Set status to succeeded after update
      state.error = null; // Clear error on successful update
    });

    // Handle update failure
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = 'failed'; // Set status to failed
      state.error = action.error.message; // Store error message
    });

    // Handle loading state for update
    builder.addCase(updateUser.pending, (state) => {
      state.status = 'loading'; // Set status to loading when updating
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
