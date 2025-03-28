import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [reports, setReports] = useState({});
  const [flaggedContent, setFlaggedContent] = useState([]);

  useEffect(() => {
    fetch('/admin/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch('/admin/rides')
      .then((res) => res.json())
      .then((data) => setRides(data));

    fetch('/admin/reports')
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  const resolveFlaggedContent = (id) => {
    fetch(`/admin/flagged/${id}`, { method: 'DELETE' })
      .then((res) => res.text())
      .then((message) => {
        alert(message);
        setFlaggedContent(flaggedContent.filter((item) => item.id !== id));
      });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>User Activity</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Ride Bookings</h2>
        <ul>
          {rides.map((ride, index) => (
            <li key={index}>{ride}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>System Reports</h2>
        <p>Total Users: {reports.totalUsers}</p>
        <p>Total Rides: {reports.totalRides}</p>
        <p>Flagged Content: {reports.flaggedContent}</p>
      </section>

      <section>
        <h2>Flagged Content</h2>
        <ul>
          {flaggedContent.map((content) => (
            <li key={content.id}>
              {content.description}
              <button onClick={() => resolveFlaggedContent(content.id)}>Resolve</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminPanel;