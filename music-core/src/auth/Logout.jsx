import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  return (
    <button style={styles.removeButton} onClick={() => navigate('/login')}>
      Logout
    </button>
  );
}

const styles = {
    removeButton: {
    marginLeft: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.3rem 0.7rem',
    cursor: 'pointer',
  },
}

export default LogoutButton;