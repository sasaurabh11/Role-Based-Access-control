import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UserManagement from './components/Usermanagement';
import Rolemanagement from './components/Rolemanagement';
import PermissionManagement from './components/Permission_management';
import SignIn from './pages/Signin';
import AccountProvider, { AccountContext } from './ContextApi/AccountProvider';

const ProtectedRoute = ({ children }) => {
  const { localAccount } = useContext(AccountContext);

  console.log(localAccount)
  if (!localAccount) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <AccountProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<SignIn />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usermanagement"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rolemanagement"
              element={
                <ProtectedRoute>
                  <Rolemanagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/permission_management"
              element={
                <ProtectedRoute>
                  <PermissionManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AccountProvider>
  );
};

export default App;
