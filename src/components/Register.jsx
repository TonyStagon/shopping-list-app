import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, logout } from '../features/authSlice'; // Import registerUser and logout

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !name || !surname || !cellNumber) {
      setError('All fields are required');
      return;
    }

    dispatch(registerUser({ username, email, password, name, surname, cellNumber }))
      .unwrap()
      .then(() => {
        setSuccessMessage('Registration Successful! You can now log in.');
        setError(null); // Clear any previous error messages
        dispatch(logout()); // Ensure the user is logged out after registration
        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setName('');
        setSurname('');
        setCellNumber('');
      })
      .catch((err) => {
        setError(err.message || 'Registration failed');
        setSuccessMessage(''); // Clear success message on error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
      <input type="text" placeholder="Cell Number" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
