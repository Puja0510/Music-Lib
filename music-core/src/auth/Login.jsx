import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, role);
    navigate('/');
  };

  return (
    <div style={styles.container}>
       <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

const styles = {
  container: {
  display: "flex",
  justifyContent: "center", 
  alignItems: "center",    
  height: "100vh",
  width: "100vw"
  }
}

export default Login;