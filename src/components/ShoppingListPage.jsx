// ShoppingListPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, addList, updateList, deleteList } from '../features/shoppingListSlice';
import { useStore } from 'react-redux';

const ShoppingListPage = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingLists.lists);
  const status = useSelector((state) => state.shoppingLists.status);
  
  const [newList, setNewList] = useState({ name: '', quantity: '', notes: '', category: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLists());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    setNewList({ ...newList, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateList({ ...newList, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addList(newList));
    }
    setNewList({ name: '', quantity: '', notes: '', category: '' });
  };

  const handleEdit = (list) => {
    setNewList(list);
    setEditingId(list.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteList(id));
  };

  return (
    <div>
      <h1>Shopping Lists</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newList.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          type="text"
          name="quantity"
          value={newList.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <input
          type="text"
          name="notes"
          value={newList.notes}
          onChange={handleChange}
          placeholder="Notes"
        />
        <input
          type="text"
          name="category"
          value={newList.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} List</button>
      </form>

      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <h3>{list.name}</h3>
            <p>Quantity: {list.quantity}</p>
            <p>Notes: {list.notes}</p>
            <p>Category: {list.category}</p>
            <button onClick={() => handleEdit(list)}>Edit</button>
            <button onClick={() => handleDelete(list.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
