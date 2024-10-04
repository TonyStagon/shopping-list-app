import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../features/listSlice';
import ShoppingListForm from './ShoppingListForm';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  return (
    <div className="shopping-list-page">
      <h2>Shopping Lists</h2>
      <ShoppingListForm />
      <ul>
        {lists.map((list) => (
          <ShoppingListItem key={list.id} list={list} />
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
