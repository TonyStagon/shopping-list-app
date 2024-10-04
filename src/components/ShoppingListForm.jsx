import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../features/listSlice';

const ShoppingListForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addList({ name, category }));
    setName('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="List Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <button type="submit">Add List</button>
    </form>
  );
};

export default ShoppingListForm;
