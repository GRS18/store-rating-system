import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/store-theme.css';

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchStores = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      await axios.post(`http://localhost:5000/api/stores/${storeId}/rate`, { rating }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Rating submitted/updated!');
      fetchStores(); // Refresh the list
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <p>Loading stores...</p>;

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <NavBar /> {/* ✅ Top navigation with logout */}
      <div className="container">
        <h2>Welcome, {user?.name}</h2>
        <h3>Stores</h3>
        {stores.length === 0 ? (
          <p>No stores found.</p>
        ) : (
          <ul>
            {stores.map(store => (
              <li key={store.id}>
                <strong>{store.name}</strong> <br />
                Address: {store.address} <br />
                ⭐ Average Rating: {store.averageRating} <br />
                🧍‍♂️ Your Rating: {store.yourRating || 'Not rated yet'} <br />
                <label>Submit/Update Rating:</label>{' '}
                <select
                  value={store.yourRating || ''}
                  onChange={(e) => submitRating(store.id, parseInt(e.target.value))}
                >
                  <option value="">-- Select --</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default UserDashboard;