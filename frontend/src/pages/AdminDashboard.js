import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/store-theme.css';

function AdminDashboard() {
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '' });

  const headers = {
    Authorization: `Bearer ${token}`
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/dashboard', { headers });
    setStats(res.data);
  };

  // Fetch users and stores
  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/users', { headers });
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/stores', { headers });
    setStores(res.data);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/user', newUser, { headers });
      alert("User added");
      setNewUser({ name: '', email: '', password: '', address: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/store', newStore, { headers });
      alert("Store added");
      setNewStore({ name: '', email: '', address: '' });
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding store");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  return (
     <>
    <NavBar />
    <div className="container">
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <h3>📊 Stats</h3>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>

      <hr />

      <h3>➕ Add New User</h3>
      <form onSubmit={handleAddUser}>
        <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required /><br />
        <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required /><br />
        <input placeholder="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required /><br />
        <input placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} /><br />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select><br />
        <button type="submit">Add User</button>
      </form>

      <h3>👤 Users List</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.role}) - {user.email}
          </li>
        ))}
      </ul>

      <hr />

      <h3>➕ Add New Store</h3>
      <form onSubmit={handleAddStore}>
        <input placeholder="Name" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} required /><br />
        <input placeholder="Email" value={newStore.email} onChange={(e) => setNewStore({ ...newStore, email: e.target.value })} required /><br />
        <input placeholder="Address" value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} required /><br />
        <button type="submit">Add Store</button>
      </form>

      <h3>🏪 Stores List</h3>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            {store.name} ({store.email}) - Rating: {store.rating}
          </li>
        ))}
      </ul>
    </div>
     </div>
  </>
  );
}

export default AdminDashboard;