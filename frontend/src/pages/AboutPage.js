import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import '../styles/store-theme.css';

function AboutPage() {
  return (
    <>
      <HomeNavBar />

      <div className="container">
        <h2>About Store Rating System</h2>
        <p>
          The Store Rating System is a web-based platform designed to:
        </p>

        <ul>
          <li>✅ Help users share and read reviews of local stores</li>
          <li>✅ Allow store owners to track ratings and feedback</li>
          <li>✅ Give admins control to manage users and stores</li>
        </ul>

        <p>
          It’s built using:
        </p>
        <ul>
          <li>💻 Frontend: ReactJS</li>
          <li>⚙️ Backend: ExpressJS</li>
          <li>🗃️ Database: MySQL</li>
        </ul>

        <p style={{ fontStyle: 'italic', color: '#666' }}>
          This system is ideal for local businesses, admins, and customers to collaborate transparently.
        </p>
      </div>
    </>
  );
}

export default AboutPage;
