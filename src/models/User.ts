import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
