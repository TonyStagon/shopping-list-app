import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteList } from '../features/listSlice';

const ShoppingListItem = ({ list }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteList(list.id));
  };

  return (
    <li className="shopping-list-item">
      <span>{list.name} - {list.category}</span>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ShoppingListItem;
