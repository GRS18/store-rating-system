import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/store-theme.css';

function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/owner/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error('Error fetching owner dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  //Extra check: If data is still null
  if (!data) return <p>Error loading dashboard. Please try again later.</p>;

  return (
    <>
      <NavBar />
      <div className="container">
        <div style={{ padding: '20px' }}>
          <h2>Welcome, {JSON.parse(localStorage.getItem('user'))?.name}</h2>
          <h3>Your Store: {data.storeName}</h3>
          <p>⭐ Average Rating: {data.averageRating}</p>
          <p>Total Ratings: {data.totalRatings}</p>

          <h4>Users who rated your store:</h4>
          {data.ratingsByUsers && data.ratingsByUsers.length === 0 ? (
            <p>No ratings yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.ratingsByUsers?.map((user, index) => (
                <li
                  key={index}
                  style={{
                    border: '1px solid #ccc',
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <strong>{user.userName}</strong>
                  <br />
                  Email: {user.userEmail}
                  <br />
                  Rating: {user.rating}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default OwnerDashboard;
