
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate(response.data.role === 'admin' ? '/admin-dashboard' : '/dashboard');
      }
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>☕ Cups & Cookies</h1>
      </div>
      <div className="form-box">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input className="form-field" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input className="form-field" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-options">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="form-button" type="submit">LOG IN</button>
          <p className="register-link">
            Don’t have an account? <a href="/register">SIGN UP</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
