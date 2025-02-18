import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch {
      alert('Registration failed');
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
            <label>Password</label>
            <input className="form-field" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="form-button" type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}
export default Register;
