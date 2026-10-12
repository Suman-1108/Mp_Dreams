import { Schema, models, model } from "mongoose";

const ProposalSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    associationName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: {
      type: String,
      default: "Apartment Shopping Expo & Carnival",
    },
    eventDate: { type: String, required: true },
    venue: { type: String, required: true },
    expectedAttendance: { type: String, default: "1,200+ Resident Families" },
    totalAmount: { type: Number, required: true },
    advanceRequired: { type: Number, required: true },
    scopeOfWork: [
      {
        item: { type: String, required: true },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    terms: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "approved", "changes_requested", "rejected"],
      default: "pending",
    },
    approverDetails: {
      name: { type: String },
      designation: { type: String },
      organization: { type: String },
      approvedAt: { type: Date },
      comments: { type: String },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "advance_paid", "fully_paid"],
      default: "pending",
    },
    version: { type: Number, default: 1 },
    revisionHistory: [
      {
        action: String,
        performedBy: String,
        timestamp: { type: Date, default: Date.now },
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

const Proposal = models.Proposal || model("Proposal", ProposalSchema);

export default Proposal;
