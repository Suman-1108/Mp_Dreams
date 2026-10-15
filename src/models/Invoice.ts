import { Schema, models, model } from "mongoose";

const InvoiceItemSchema = new Schema({
  description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const InvoiceSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["invoice", "receipt"],
      default: "invoice",
    },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String, default: "" },
    clientAddress: { type: String, default: "" },
    clientGst: { type: String, default: "" },
    eventName: { type: String, default: "" },
    invoiceDate: { type: String, required: true },
    dueDate: { type: String, default: "" },
    paymentDate: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["paid", "partial", "pending", "cancelled"],
      default: "pending",
    },
    paymentMode: {
      type: String,
      enum: ["upi", "bank_transfer", "cash", "cheque", "card"],
      default: "upi",
    },
    transactionRef: { type: String, default: "" },
    items: [InvoiceItemSchema],
    subtotal: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 }, // e.g. 0 or 18%
    taxAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },
    amountInWords: { type: String, default: "" },
    notes: { type: String, default: "" },
    terms: [{ type: String }],
    bankDetails: {
      bankName: { type: String, default: "HDFC Bank" },
      accountName: { type: String, default: "MP DREAM EVENTS & SOLUTIONS" },
      accountNumber: { type: String, default: "50200088991234" },
      ifsc: { type: String, default: "HDFC0001234" },
      upiId: { type: String, default: "7338999723@upi" },
    },
  },
  { timestamps: true }
);

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);

export default Invoice;
