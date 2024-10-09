import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Home.css'; // Assuming you have a CSS file for styles

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="home-container">
      <h1>Home</h1>
      {!isAuthenticated ? (
        <div className="welcome-message">
          <h2>Welcome to the Shopping List App</h2>
          <p>Your shopping made simple!</p>
          <p>Create and manage your shopping lists with ease.</p>
        </div>
      ) : (
        <div className="shopping-lists">
          <h2>My Shopping Lists</h2>
          <p>You currently have no shopping lists.</p>
        </div>
      )}
      <footer className="footer">
        <p>© 2024 Shopping List App. All rights reserved. Arthur Maatlane</p>
      </footer>
    </div>
  );
};

export default Home;
