import React, { useState, useEffect } from 'react';
import './AdminPanel.css'; // Add a CSS file for styling

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [reports, setReports] = useState({});
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const usersResponse = await fetch('/admin/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const ridesResponse = await fetch('/admin/rides');
        const ridesData = await ridesResponse.json();
        setRides(ridesData);

        const reportsResponse = await fetch('/admin/reports');
        const reportsData = await reportsResponse.json();
        setReports(reportsData);

        const flaggedResponse = await fetch('/admin/flagged');
        const flaggedData = await flaggedResponse.json();
        setFlaggedContent(flaggedData);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resolveFlaggedContent = async (id) => {
    try {
      const response = await fetch(`/admin/flagged/${id}`, { method: 'DELETE' });
      const message = await response.text();
      alert(message);
      setFlaggedContent(flaggedContent.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to resolve flagged content. Please try again.');
    }
  };

  if (loading) {
    return <div className="admin-panel">Loading...</div>;
  }

  if (error) {
    return <div className="admin-panel error">{error}</div>;
  }

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      {/* Summary Section */}
      <section className="summary-section">
        <h2>Summary</h2>
        <p><strong>Total Rides:</strong> {rides.length}</p>
        <p><strong>Total Bookings:</strong> {reports.totalRides || 0}</p>
      </section>

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