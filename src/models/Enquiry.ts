import { Schema, models, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    eventTitle: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);

export default Enquiry;
