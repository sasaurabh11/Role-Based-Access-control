import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AccountContext } from '../ContextApi/AccountProvider';

const Navbar = () => {

  const { localAccount, setLocalAccount } = useContext(AccountContext);
  
  const handleLogout = () => {
    setLocalAccount("");
  }

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <h3>RBAC Dashboard</h3>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
        <li><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
        <li onClick={handleLogout}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
