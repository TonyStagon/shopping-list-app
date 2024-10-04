import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';  // Correct path to Home.css

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to the Shopping List App</h1>
        <nav>
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/shopping-list">My Shopping Lists</Link></li>
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="intro-section">
          <h2>Your shopping made simple!</h2>
          <p>Create and manage your shopping lists with ease.</p>
        </section>

        <section className="shopping-lists-overview">
          <h2>My Shopping Lists</h2>
          <p>You currently have no shopping lists.</p>
          {/* Add logic to show shopping lists if available */}
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Shopping List App. All rights reserved. Arthur Maatlane</p>
      </footer>
    </div>
  );
};


export default Home;
