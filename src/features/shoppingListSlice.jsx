// shoppingListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5002/lists';

// Fetch shopping lists from JSON server
export const fetchLists = createAsyncThunk('shoppingLists/fetchLists', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new shopping list
export const addList = createAsyncThunk('shoppingLists/addList', async (newList) => {
  const response = await axios.post(API_URL, newList);
  return response.data;
});

// Update an existing shopping list
export const updateList = createAsyncThunk('shoppingLists/updateList', async (updatedList) => {
  const { id, ...data } = updatedList; // Extract id and data
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

// Delete a shopping list
export const deleteList = createAsyncThunk('shoppingLists/deleteList', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Return the id to delete from the state
});

// Create the shopping list slice
const shoppingListSlice = createSlice({
  name: 'shoppingLists',
  initialState: {
    lists: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload; // Add the fetched lists to the state
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload); // Add the new list to the state
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex((list) => list.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload; // Update the existing list in the state
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload); // Remove the deleted list from the state
      });
  },
});

export default shoppingListSlice.reducer;
