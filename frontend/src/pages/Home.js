
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      backgroundImage: "url('/images/coffee_beans.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: 'white',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '52px',
      fontWeight: 'bold',
      textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
    },
    box: {
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      padding: '55px',
      borderRadius: '25px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
      width: '470px',
      textAlign: 'center',
      color: '#f8f8f8',
    },
    subtitle: {
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '18px',
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
    },
    description: {
      fontSize: '17px',
      marginBottom: '28px',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
    },
    button: {
      padding: '14px 30px',
      margin: '10px',
      fontSize: '17px',
      fontWeight: 'bold',
      borderRadius: '25px',
      border: 'none',
      backgroundColor: '#5a3428',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>☕ Cups & Cookies</h1>
      </div>
      <div style={styles.box}>
        <h2 style={styles.subtitle}>Welcome to Cups & Cookies ☕🍪</h2>
        <p style={styles.description}>Browse our delicious recipes and products!</p>
        <Link to="/login"><button style={styles.button}>Login</button></Link>
        <Link to="/register"><button style={styles.button}>Register</button></Link>
      </div>
    </div>
  );
}

export default Home;
