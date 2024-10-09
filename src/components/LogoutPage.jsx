import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice'; // Assuming you have an authSlice

const LogoutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the logout action when the user reaches the logout page
    dispatch(logout());
  }, [dispatch]);

  return (
    <div>
      <h1>You have been logged out</h1>
      <p>Please choose one of the following options:</p>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </div>
  );
};

export default LogoutPage;
