import React, { useEffect, useState } from 'react';
import { getRoles, addPermission, removePermission } from '../services/api';
import "./Permission_management.css"

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);
  const [newPermission, setNewPermission] = useState({ type: '', resource: '' });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await getRoles();
    setRoles(response);
  };

  const fetchRolePermissions = async (roleId) => {
    if (!roleId) return;
    const selected = roles.find((role) => role._id === roleId);
    setRolePermissions(selected ? selected.permissions : []);
  };

  const handleAddPermission = async () => {
    if (!selectedRole || !newPermission.type || !newPermission.resource) {
      alert('Please fill all fields before adding a permission.');
      return;
    }
    try {
      await addPermission(selectedRole, newPermission);
      setNewPermission({ type: '', resource: '' });
      fetchRoles();
      fetchRolePermissions(selectedRole);
    } catch (err) {
      console.error('Error adding permission:', err);
    }
  };

  const handleRemovePermission = async (permissionId) => {
    try {
      await removePermission(selectedRole, permissionId);
      fetchRoles();
      fetchRolePermissions(selectedRole);
    } catch (err) {
      console.error('Error removing permission:', err);
    }
  };

  return (
    <div className="permission-management-container">
      <h2 className="heading">Permission Management</h2>

      {/* Assign permissions to roles */}
      <div className="role-assignment">
        <h3 className="section-title">Assign Permissions to Roles</h3>
        <div className="form-group">
          <label className="label">Select Role:</label>
          <select
            className="select"
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              fetchRolePermissions(e.target.value);
            }}
          >
            <option value="">-- Select Role --</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {selectedRole && (
          <div className="permissions-section">
            <h4 className="permissions-title">Role Permissions</h4>
            <ul className="permissions-list">
              {rolePermissions.map((permission) => (
                <li key={permission._id} className="permission-item">
                  <span>{permission.type} - {permission.resource}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemovePermission(permission._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="add-permission-section">
              <h4 className="add-permission-title">Add New Permission</h4>
              <div className="form-group">
                <label className="label">Type:</label>
                <select
                  className="select"
                  value={newPermission.type}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, type: e.target.value })
                  }
                >
                  <option value="">-- Select Type --</option>
                  <option value="Read">Read</option>
                  <option value="Write">Write</option>
                  <option value="Delete">Delete</option>
                </select>
              </div>
              <div className="form-group">
                <label className="label">Resource:</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Resource Name"
                  value={newPermission.resource}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, resource: e.target.value })
                  }
                />
              </div>
              <button
                className="add-btn"
                onClick={handleAddPermission}
                disabled={!newPermission.type || !newPermission.resource}
              >
                Add Permission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionManagement;
