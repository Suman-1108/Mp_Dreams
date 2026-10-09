import { Schema, models, model } from "mongoose";

const StallBookingSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    eventTitle: { type: String, required: true },
    vendorName: { type: String, required: true },
    vendorEmail: { type: String, required: true },
    vendorPhone: { type: String, required: true },
    stallNumber: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["requested", "reserved", "confirmed", "cancelled"],
      default: "requested",
    },
    amountPaid: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "refunded"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const StallBooking = models.StallBooking || model("StallBooking", StallBookingSchema);

export default StallBooking;
