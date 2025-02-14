import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const subscription = localStorage.getItem('subscription');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Subscription:</strong> {subscription}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
