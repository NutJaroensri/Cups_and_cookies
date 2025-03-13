import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role: user
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { 
        name, 
        email, 
        phone,  
        password, 
        role,  // Send role from state
        subscription: 'none'  
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert('Registration failed: ' + (error.response?.data?.msg || "Unknown error"));
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>☕ Cups & Cookies</h1>
      </div>
      <div className="form-box">
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input className="form-field" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input className="form-field" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input className="form-field" type="text" placeholder="1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input className="form-field" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Role</label>
            <select className="form-field" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="form-button" type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
