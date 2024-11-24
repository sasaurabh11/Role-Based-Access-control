import { Role } from "../models/role.model.js";

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

// Create a new role
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create role' });
  }
};

// Update an existing role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};

const addPermission = async (req, res) => {
    try {
      const { roleId } = req.params;
      const { type, resource } = req.body;
  
      const role = await Role.findById(roleId);
      if (!role) return res.status(404).json({ error: 'Role not found' });
  
      role.permissions.push({ type, resource });
      await role.save();
      res.status(200).json(role);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add permission' });
    }
  };
  
  // Update a specific permission for a role
  export const updatePermission = async (req, res) => {
    try {
      const { roleId, permissionId } = req.params;
      const { type, resource } = req.body;
  
      const role = await Role.findById(roleId);
      if (!role) return res.status(404).json({ error: 'Role not found' });
  
      const permission = role.permissions.id(permissionId);
      if (!permission) return res.status(404).json({ error: 'Permission not found' });
  
      permission.type = type;
      permission.resource = resource;
      await role.save();
  
      res.status(200).json(role);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update permission' });
    }
  };
  
  // Remove a permission from a role
  const removePermission = async (req, res) => {
    try {
      const { roleId, permissionId } = req.params;

      const role = await Role.findById(roleId);
      if (!role) return res.status(404).json({ error: 'Role not found' });
  
      const permissionIndex = role.permissions.findIndex(
        (perm) => String(perm._id) === permissionId
      );
  
      if (permissionIndex === -1) {
        return res.status(404).json({ error: 'Permission not found' });
      }

      role.permissions.splice(permissionIndex, 1);
      console.log("Permissions after removal:", role.permissions);

      await role.save();

      res.status(200).json(role);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: 'Failed to remove permission' });
    }
  };  

export { getRoles, createRole, updateRole, deleteRole, removePermission, addPermission };
