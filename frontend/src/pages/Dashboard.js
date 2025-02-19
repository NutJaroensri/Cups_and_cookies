import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsername(response.data.username);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate('/mainpage')}>←</button>

      <div className="profile-card">
        <div className="profile-image">
          <img src="default-profile.png" alt="Profile" />
        </div>
        <h2 className="username">{username}</h2> 
        <h3 className="role-label">{role === 'admin' ? 'Admin' : 'User'}</h3> {/* ✅ Display Role */}

        <div className="menu-options">
        <button className="menu-item" onClick={() => navigate('/personal-info')}>👤 Personal Info</button>
          {role === 'admin' && <button className="menu-item">🛠 Admin Settings</button>} {/* ✅ Admin Only */}
          <button className="menu-item">💜 Favourite</button>
          <button className="menu-item">🔔 Notifications</button>
          <button className="menu-item">💳 Payment Method</button>
          <button className="menu-item logout" onClick={handleLogout}>🚪 Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
