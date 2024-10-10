// ShoppingListPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, addList, updateList, deleteList } from '../features/shoppingListSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ShoppingList.css';

const ShoppingListPage = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingLists.lists);
  const status = useSelector((state) => state.shoppingLists.status);
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  const [newList, setNewList] = useState({ name: '', quantity: '', notes: '', category: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch lists only for the logged-in user
  useEffect(() => {
    if (status === 'idle' && user) {
      dispatch(fetchLists());  // Fetch all lists
    }
  }, [status, dispatch, user]);

  // Handle search input change
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('search') || '';
    setSearch(query);
  }, [location]);

  useEffect(() => {
    navigate(`?search=${search}`); // Update URL with search query
  }, [search, navigate]);

  // Handle change in text fields
  const handleChange = (e) => {
    setNewList({ ...newList, [e.target.name]: e.target.value });
  };

  // Handle file input change for the image (convert to base64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewList({ ...newList, image: reader.result });  // Save base64 string in state
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateList({ ...newList, id: editingId, userId: user.id }));  // Pass the user ID when updating
      setEditingId(null);
    } else {
      dispatch(addList({ ...newList, userId: user.id }));  // Include the user ID when adding a new list
    }
    setNewList({ name: '', quantity: '', notes: '', category: '', image: '' });
  };

  const handleEdit = (list) => {
    setNewList(list);
    setEditingId(list.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteList(id));
  };

  // Filter the lists by the logged-in user (if necessary on the frontend)
  const userLists = lists.filter(list => list.userId === user?.id);
  
  // Search functionality
  const filteredLists = userLists.filter((list) => list.name.toLowerCase().includes(search.toLowerCase()));

  // Sort functionality
  const sortedLists = filteredLists.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    } else {
      return new Date(a.dateAdded) - new Date(b.dateAdded); // Assuming dateAdded is a field in your list object
    }
  });

  return (
    <div className="shopping-list-container">
      <h2>{user ? `${user.name}'s Shopping Lists` : 'Your Shopping Lists'}</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search items by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort options */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="category">Sort by Category</option>
        <option value="dateAdded">Sort by Date Added</option>
      </select>

      {/* Form to add or edit a shopping list */}
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
        {/* Image input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} List</button>
      </form>

      {/* Display shopping lists */}
      <ul>
        {sortedLists.map((list) => (
          <li key={list.id} className="shopping-list-item">
            <h3>{list.name}</h3>
            <p>Quantity: {list.quantity}</p>
            <p>Notes: {list.notes}</p>
            <p>Category: {list.category}</p>
            {/* Display the uploaded image if available */}
            {list.image && (
              <img
                src={list.image}  // Display base64 image from state
                alt={list.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            )}
            <button onClick={() => handleEdit(list)}>Edit</button>
            <button onClick={() => handleDelete(list.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Display a message if no lists are found */}
      {sortedLists.length === 0 && status !== 'loading' && <p>No shopping lists found.</p>}
    </div>
  );
};

export default ShoppingListPage;
