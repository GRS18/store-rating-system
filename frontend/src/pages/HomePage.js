import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import '../styles/store-theme.css';

function HomePage() {
  return (
    <>
      <HomeNavBar />

      <div className="container">
        <h1>🏪 Store Rating System</h1>
        <p>
          Welcome! This platform lets you rate local stores, manage your business,
          and track customer feedback.
        </p>

        <hr />

        <h3>✨ Features</h3>
        <ul>
          <li>⭐ Submit & update ratings as a user</li>
          <li>📊 Store owners can view feedback</li>
          <li>🧑‍💼 Admins manage stores and users</li>
        </ul>

        <hr />

        <h3>📖 About Us</h3>
        <p>
          The Store Rating System is a web platform that helps users share and read reviews
          of local stores. It empowers store owners to manage their business reputation
          and allows administrators to oversee platform operations securely.
        </p>

        <ul>
          <li>💻 Frontend: ReactJS</li>
          <li>⚙️ Backend: ExpressJS</li>
          <li>🗃️ Database: MySQL</li>
        </ul>

        <p style={{ fontStyle: 'italic', color: '#666' }}>
          Built for transparency and better customer-business connection.
        </p>
      </div>
    </>
  );
}

export default HomePage;
