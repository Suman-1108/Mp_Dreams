import { Schema, models, model } from "mongoose";

const ProposalSchema = new Schema(
  {
    token: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true },
    clientName: { type: String, default: "Apartment Resident Community" },
    associationName: { type: String, default: "Residents Welfare Association" },
    contactPerson: { type: String, default: "RWA Secretary / Committee" },
    email: { type: String, default: "mpdreameventssolutions@gmail.com" },
    phone: { type: String, default: "+91 73389 99723" },
    eventType: {
      type: String,
      default: "Apartment Shopping Expo & Carnival",
    },
    eventDate: { type: String, default: "Upcoming Weekend" },
    venue: { type: String, default: "Central Society Arena / Clubhouse" },
    expectedAttendance: { type: String, default: "1,200+ Resident Families" },
    totalAmount: { type: Number, default: 0 },
    advanceRequired: { type: Number, default: 0 },
    scopeOfWork: [
      {
        item: { type: String, default: "Event Service" },
        description: { type: String, default: "" },
        amount: { type: Number, default: 0 },
      },
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    terms: [{ type: String }],
    services: [{ type: String }],
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
    aliases: [{ type: String }],
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

ProposalSchema.index({ token: 1 });
ProposalSchema.index({ aliases: 1 });
ProposalSchema.index({ associationName: 1 });

const Proposal = models.Proposal || model("Proposal", ProposalSchema);

export default Proposal;
