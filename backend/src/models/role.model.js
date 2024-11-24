import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  type: { type: String, enum: ['Read', 'Write', 'Delete'], required: true },
  resource: { type: String, required: true },
});

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [permissionSchema],
});

export const Role = mongoose.model('Role', roleSchema);
