import axios from "axios";

// const url = "http://localhost:8000";
const url = "https://role-based-access-control-5d85.onrender.com";

export const getUser = async () => {
  try {
    let response = await axios.get(`${url}/api/v1/users/`);
    return response.data;
  } catch (error) {
    console.error("error in getUser API", error.message);
  }
};

export const AddUsers = async (data) => {
  try {
    await axios.post(`${url}/api/v1/users/`, data);
  } catch (error) {
    console.error("error while calling AddUsers", error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${url}/api/v1/users/${id}`)
  } catch (error) {
    console.error("error while calling deleteUser api", error.message);
  }
}

export const updateUser = async(id, data) => {
  try {
    await axios.put(`${url}/api/v1/users/${id}`, data)
  } catch (error) {
    console.error("error while calling updateUser", error.message);
  }
}

export const getRoles = async () => {
  try {
    let response = await axios.get(`${url}/api/v1/roles/`);
    return response.data
  } catch (error) {
    console.error("error while calling getRole", error.message)
  }
}

export const AddRole = async (data) => {
  try {
    await axios.post(`${url}/api/v1/roles/`, data);
  } catch (error) {
    console.error("error while calling addRole, ", error.message);
  }
}

export const addPermission = async (roleId, data) => {
  try {
    await axios.post(`${url}/api/v1/roles/${roleId}/permissions`, data);
  } catch (error) {
    console.error("error while calling addPermission", error.message);
  }
};

export const updatePermission = async (roleId, permissionId, data) => {
  try {
    await axios.put(`${url}/api/v1/roles/${roleId}/permissions/${permissionId}`, data);
  } catch (error) {
    console.error("error while calling updatePermission", error.message);
  }
};

export const removePermission = async (roleId, permissionId) => {
  try {
    await axios.delete(`${url}/api/v1/roles/${roleId}/permissions/${permissionId}`);
  } catch (error) {
    console.error("error while calling removePermission", error.message);
  }
};