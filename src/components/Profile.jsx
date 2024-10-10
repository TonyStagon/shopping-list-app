import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/authSlice';  // Import the updateUser action

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Local state for editable fields
  const [updatedUser, setUpdatedUser] = useState({
    id: user?.id || '',
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    cellNumber: user?.cellNumber || '',
    password: user?.password || '' // If users want to update their password
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission for updating user profile
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the updateUser action to update the user's info in db.json
    dispatch(updateUser(updatedUser));
  };

  return (
    <div className="profile-page">
      <h2>Update Profile</h2>
      {user ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={updatedUser.surname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Cell Number:
            <input
              type="text"
              name="cellNumber"
              value={updatedUser.cellNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={updatedUser.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Update Profile</button>
        </form>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default Profile;
