import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    profileImage: "",
  });
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Handle updating phone number
  const updatePhone = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/api/users/${userId}`, { phone: newPhone }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData({ ...userData, phone: newPhone });
      alert("Phone number updated successfully!");
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

  // ✅ Handle updating password
  const updatePassword = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/api/users/${userId}`, { password: newPassword }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  // ✅ Handle updating profile image
  const updateProfileImage = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profileImage", image);

      await axios.put(`http://localhost:5000/api/users/${userId}/profile-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <div className="personal-info-container">
      {/* 🔙 Back Button - Now Aligned */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>←</button>

      <div className="info-card">
        <h2>Personal Info</h2>
        <div className="profile-image">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="Profile" />
          ) : (
            <span>Profile</span>
          )}
        </div>
        <p><strong>Name:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Role:</strong> {userData.role}</p>

        {/* 🖼 Update Profile Image */}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={updateProfileImage}>Update Profile Image</button>

        {/* 📱 Update Phone Number */}
        <input type="text" placeholder="New phone number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        <button onClick={updatePhone}>Update Phone Number</button>

        {/* 🔑 Update Password */}
        <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={updatePassword}>Update Password</button>
      </div>
    </div>
  );
};

export default PersonalInfo;
