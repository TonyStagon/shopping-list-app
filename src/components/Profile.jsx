import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Surname: {user.surname}</p>
          <p>Email: {user.email}</p>
          <p>Cell Number: {user.cellNumber}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default Profile;
