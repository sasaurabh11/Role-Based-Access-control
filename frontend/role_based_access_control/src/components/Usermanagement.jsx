import React, { useEffect, useState } from 'react';
import { getUser, AddUsers, deleteUser, updateUser, getRoles } from '../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [serverRole, setServerRole] = useState('');
  const [status, setStatus] = useState('Active');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const response = await getUser();
    setUsers(response);
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setServerRole(response);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleAddUser = async () => {
    if (!name || !email || !role) {
      alert('Please fill in all fields.');
      return;
    }
    const data = { name, email, role, status };
    await AddUsers(data);
    fetchUsers();
    resetForm();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    const data = { name, email, role, status };
    await updateUser(editingUser._id, data);
    fetchUsers();
    resetForm();
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setStatus('Active');
    setEditingUser(null);
  };

  return (
    <div className="user-management">
      <h2 className="heading">User Management</h2>

      <div className="form-container">
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="select-field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {serverRole && serverRole.length > 0 ? (
            serverRole.map((roleItem) => (
              <option key={roleItem._id} value={roleItem.name}>
                {roleItem.name}
              </option>
            ))
          ) : (
            <option disabled>Loading roles...</option>
          )}
        </select>

        <select
          className="select-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {editingUser ? (
          <button className="btn update" onClick={handleUpdateUser}>
            Update User
          </button>
        ) : (
          <button className="btn add" onClick={handleAddUser}>
            Add User
          </button>
        )}
        <button className="btn cancel" onClick={resetForm}>
          Cancel
        </button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn edit"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
