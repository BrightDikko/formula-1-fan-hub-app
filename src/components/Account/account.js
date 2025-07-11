import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
// custom CSS file to handle display of this page
import './Account.css'; 

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // logout user and redirect
  const handleLogout = async () => {
    try {
      await logout();    
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  // delete account then logout and redirect
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to permanently delete your account?'
    );
    if (!confirmDelete) return;

    try {
      // delete from Parse backend
      await user.destroy();
      // clear session and state  
      await logout();  
       // go to home or login       
      navigate('/');         
    } catch (err) {
      console.error('Account deletion failed:', err.message);
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>Account Overview</h2>
        <div className="account-field">
          <label>First Name:</label>
          <span>{user?.get('firstName')}</span>
        </div>
        <div className="account-field">
          <label>Last Name:</label>
          <span>{user?.get('lastName')}</span>
        </div>
        <div className="account-field">
          <label>Email:</label>
          <span>{user?.get('email')}</span>
        </div>
        <div className="account-field">
          <label>Username:</label>
          <span>{user?.getUsername()}</span>
        </div>

        <div className="account-actions">
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
          <button onClick={handleDeleteAccount} className="delete-btn">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
