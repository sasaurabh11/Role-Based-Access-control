import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
import UserManagement from './components/Usermanagement';
import Rolemanagement from './components/Rolemanagement';
import PermissionManagement from './components/Permission_management';

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') ? true : false;
  };

  return (
    <Router>
      <div>
        <Navbar />

        {isAuthenticated() && <Navbar />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route
            path="/dashboard"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/" />
            }
          /> */}
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/rolemanagement" element={<Rolemanagement />} />
          <Route path="/permission_management" element={<PermissionManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
