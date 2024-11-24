import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["Admin", "Editor", "Viewer"] },
    status: { type: String, required: true, enum: ["Active", "Inactive"] },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema)