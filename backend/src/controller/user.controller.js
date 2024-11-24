import { User } from "../models/user.model.js";

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const newUser = new User({ name, email, role, status });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, role, status } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, role, status },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };
  

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

export { getUser, postUser, updateUser, deleteUser };
