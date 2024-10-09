import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lists: [],
};

const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList(state, action) {
            state.lists.push(action.payload);
        },
        updateList(state, action) {
            const index = state.lists.findIndex(list => list.id === action.payload.id);
            if (index !== -1) {
                state.lists[index] = action.payload;
            }
        },
        deleteList(state, action) {
            state.lists = state.lists.filter(list => list.id !== action.payload);
        },
        setLists(state, action) {
            state.lists = action.payload;
        },
    },
});

export const { addList, updateList, deleteList, setLists } = listSlice.actions;
export default listSlice.reducer;