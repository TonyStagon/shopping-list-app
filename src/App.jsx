import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Bring back the Provider
import store from './features/store';   // Make sure the store is correctly imported
import Home from './components/Home';   // Ensure this path is correct
import Profile from './components/Profile';
import Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
