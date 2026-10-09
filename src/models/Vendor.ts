import { Schema, models, model } from "mongoose";

const VendorSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stallType: {
      type: String,
      default: "Standard Stall",
    },
    targetEvent: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      default: "Chennai",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const Vendor = models.Vendor || model("Vendor", VendorSchema);

export default Vendor;
