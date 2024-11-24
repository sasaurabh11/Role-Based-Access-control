import React, { useState, useEffect } from 'react';
import { 
  getRoles, 
  AddRole, 
  addPermission, 
  updatePermission, 
  removePermission 
} from '../services/api';
import "./RoleManagement.css"

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState([{ type: '', resource: '' }]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleAddRole = async () => {
    const roleData = { name, permissions };
    try {
      await AddRole(roleData);
      fetchRoles();
      resetForm();
    } catch (err) {
      console.error('Error adding role:', err);
    }
  };

  const handlePermissionChange = (index, e) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index][e.target.name] = e.target.value;
    setPermissions(updatedPermissions);
  };

  const handleAddPermissionField = () => {
    setPermissions([...permissions, { type: '', resource: '' }]);
  };

  const handleRemovePermissionField = (index) => {
    const updatedPermissions = permissions.filter((_, i) => i !== index);
    setPermissions(updatedPermissions);
  };

  const resetForm = () => {
    setName('');
    setPermissions([{ type: '', resource: '' }]);
  };

  const handleAddPermissionToRole = async (roleId) => {
    try {
      await addPermission(roleId, permissions[0]);
      fetchRoles();
    } catch (err) {
      console.error('Error adding permission to role:', err);
    }
  };

  const handleRemovePermissionFromRole = async (roleId, permissionId) => {
    try {
      await removePermission(roleId, permissionId);
      fetchRoles();
    } catch (err) {
      console.error('Error removing permission from role:', err);
    }
  };

  return (
    <div className="role-management">
      <h2 className="heading">Role Management</h2>
      
      <div className="form-container">
        <h3>Create a New Role</h3>
        <input
          className="input-field"
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h4>Permissions</h4>
        {permissions.map((permission, index) => (
          <div key={index} className="permission-container">
            <select
              className="select-field"
              name="type"
              value={permission.type}
              onChange={(e) => handlePermissionChange(index, e)}
            >
              <option value="">Select Permission Type</option>
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Delete">Delete</option>
            </select>
            <input
              className="input-field"
              type="text"
              name="resource"
              placeholder="Resource (e.g., User)"
              value={permission.resource}
              onChange={(e) => handlePermissionChange(index, e)}
            />
            <button className="remove-permission-btn" onClick={() => handleRemovePermissionField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="add-permission-btn" onClick={handleAddPermissionField}>
          Add Permission Field
        </button>
        <button className="create-role-btn" onClick={handleAddRole}>
          Create Role
        </button>
      </div>

      <div className="role-list-container">
        <h3>Existing Roles</h3>
        <ul>
          {roles.map((role) => (
            <li key={role._id} className="role-item">
              <h4>{role.name}</h4>
              <ul>
                {role.permissions.map((perm) => (
                  <li key={perm._id} className="permission-item">
                    {perm.type} on {perm.resource}
                    <button onClick={() => handleRemovePermissionFromRole(role._id, perm._id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="add-permission-to-role-btn"
                onClick={() => setSelectedRole(role)}
              >
                Add Permission
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedRole && (
        <div>
          <h3>Add Permission to Role: {selectedRole.name}</h3>
          <div className="permission-container">
            <select
              className="select-field"
              name="type"
              value={permissions[0].type}
              onChange={(e) => handlePermissionChange(0, e)}
            >
              <option value="">Select Permission Type</option>
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Delete">Delete</option>
            </select>
            <input
              className="input-field"
              type="text"
              name="resource"
              placeholder="Resource (e.g., User)"
              value={permissions[0].resource}
              onChange={(e) => handlePermissionChange(0, e)}
            />
            <button
              className="add-permission-to-role-btn"
              onClick={() => handleAddPermissionToRole(selectedRole._id)}
              disabled={!permissions[0].type || !permissions[0].resource}
            >
              Add Permission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
