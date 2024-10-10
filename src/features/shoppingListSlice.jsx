// shoppingListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLists = createAsyncThunk('shoppingLists/fetchLists', async () => {
  const response = await fetch('http://localhost:5002/lists'); // Adjust URL as needed
  return response.json();
});

export const addList = createAsyncThunk('shoppingLists/addList', async (newList) => {
  const response = await fetch('http://localhost:5002/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newList),
  });
  return response.json();
});

export const updateList = createAsyncThunk('shoppingLists/updateList', async (updatedList) => {
  const response = await fetch(`http://localhost:5002/lists/${updatedList.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedList),
  });
  return response.json();
});

export const deleteList = createAsyncThunk('shoppingLists/deleteList', async (id) => {
  await fetch(`http://localhost:5002/lists/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const shoppingListSlice = createSlice({
  name: 'shoppingLists',
  initialState: {
    lists: [],
    status: 'idle',
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
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(list => list.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(list => list.id === action.payload);
        if (index !== -1) {
          state.lists.splice(index, 1);
        }
      });
  },
});

export default shoppingListSlice.reducer;
