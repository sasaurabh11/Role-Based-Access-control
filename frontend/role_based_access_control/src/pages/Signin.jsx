import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Signin.css';
import { AccountContext } from '../ContextApi/AccountProvider';
import { signupLocal, loginLocal } from '../services/api';

function AuthForm() {
  const { setLocalAccount, localAccount } = useContext(AccountContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('Admin');
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        // Handle login
        const data = { email, password };
        const responseLogin = await loginLocal(data);
        setLocalAccount(responseLogin.user);
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        // Handle signup
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);

        const responseSignup = await signupLocal(formData);
        setLocalAccount(responseSignup.user);
        alert('Signup successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle error and show alert
      alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              className="input-field"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input-field"
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} disabled className="input-field">
              <option value="Admin">Admin</option> {/* Only Admin option */}
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      <p className="toggle-account">
        <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
