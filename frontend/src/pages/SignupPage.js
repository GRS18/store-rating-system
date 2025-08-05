import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/store-theme.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1 className="page-header">Store Rating System</h1>
      <h2>Signup</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address:</label><br />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Role:</label><br />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="store_owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: 10 }}>Register</button>
      </form>

      <p style={{ marginTop: 10 }}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default SignupPage;