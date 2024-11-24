import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';  // Make sure to add this CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="button-container">
        <button 
          className="dashboard-btn" 
          onClick={() => navigate('/usermanagement')}
        >
          User Management
        </button>
        <button 
          className="dashboard-btn" 
          onClick={() => navigate('/rolemanagement')}
        >
          Role Management
        </button>
        <button 
          className="dashboard-btn" 
          onClick={() => navigate('/permission_management')}
        >
          Permission Management
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
