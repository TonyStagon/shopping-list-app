import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importing routing tools
import { Provider } from 'react-redux';  // Importing Provider to give access to Redux store
import store from './features/store';  // Importing the Redux store

import Home from './components/Home';  // Importing components for different pages
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';  // Import the Register component
import ShoppingListPage from './components/ShoppingListPage';
import NavBar from './components/NavBar'; // Import the NavBar

function App() {
  return (
    <Provider store={store}>  {/* Wrap everything inside Provider to give access to the store */}
      <Router>  {/* Router handles navigation */}
        <NavBar /> {/* Include the NavBar here */}
        <Routes>  {/* Routes defines the different pages in your app */}
          <Route path="/" element={<Home />} />  {/* Home page */}
          <Route path="/login" element={<Login />} />  {/* Login page */}
          <Route path="/register" element={<Register />} />  {/* Register page */}
          <Route path="/profile" element={<Profile />} />  {/* Profile page */}
          <Route path="/shopping-lists" element={<ShoppingListPage />} />  {/* Shopping list route */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
