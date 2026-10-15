import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import {
  getAllFallbackInvoices,
  saveFallbackInvoice,
  deleteFallbackInvoice,
  initialSampleInvoices,
} from "@/lib/sampleInvoices";

export async function GET() {
  try {
    await connectDB();
    let invoices = await Invoice.find().sort({ createdAt: -1 }).lean();

    // Ensure sample invoices exist if DB is fresh
    if (invoices.length === 0) {
      for (const sample of initialSampleInvoices) {
        try {
          await Invoice.findOneAndUpdate(
            { invoiceNumber: sample.invoiceNumber },
            sample,
            { upsert: true, new: true }
          );
        } catch {}
      }
      invoices = await Invoice.find().sort({ createdAt: -1 }).lean();
    }

    // Merge in-memory fallback invoices if any were saved during offline
    if (globalThis.inMemoryInvoicesStore && globalThis.inMemoryInvoicesStore.length > 0) {
      for (const inv of globalThis.inMemoryInvoicesStore) {
        try {
          await Invoice.findOneAndUpdate(
            { invoiceNumber: inv.invoiceNumber },
            inv,
            { upsert: true, new: true }
          );
        } catch {}
      }
      invoices = await Invoice.find().sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json(
      { invoices },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching invoices from DB, falling back to memory store:", err);
    return NextResponse.json(
      { invoices: getAllFallbackInvoices() },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.clientName || !body.clientPhone || !body.grandTotal) {
      return NextResponse.json(
        { message: "Client name, phone, and total amount are required" },
        { status: 400 }
      );
    }

    // Generate invoice sequence if not provided
    const prefix = body.type === "receipt" ? "MPD-REC" : "MPD-INV";
    const year = new Date().getFullYear();
    const invoiceNumber =
      body.invoiceNumber && body.invoiceNumber.trim()
        ? body.invoiceNumber.trim().toUpperCase()
        : `${prefix}-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      ...body,
      invoiceNumber,
      invoiceDate: body.invoiceDate || new Date().toISOString().split("T")[0],
    };

    // Save in memory fallback first
    const savedFallback = saveFallbackInvoice(newRecord);

    try {
      await connectDB();
      const created = await Invoice.findOneAndUpdate(
        { invoiceNumber },
        newRecord,
        { upsert: true, new: true }
      );
      return NextResponse.json({ success: true, invoice: created }, { status: 201 });
    } catch (dbErr) {
      console.warn("MongoDB write failed, invoice kept in in-memory store:", dbErr);
      return NextResponse.json({ success: true, invoice: savedFallback }, { status: 201 });
    }
  } catch (err: unknown) {
    console.error("POST /api/invoices error:", err);
    const msg = err instanceof Error ? err.message : "Failed to create invoice";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { invoiceNumber, paymentStatus, amountPaid, balanceDue } = body;

    if (!invoiceNumber) {
      return NextResponse.json({ message: "invoiceNumber is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (amountPaid !== undefined) updates.amountPaid = amountPaid;
    if (balanceDue !== undefined) updates.balanceDue = balanceDue;

    try {
      await connectDB();
      const updated = await Invoice.findOneAndUpdate(
        { invoiceNumber },
        { $set: updates },
        { new: true }
      );
      return NextResponse.json({ success: true, invoice: updated });
    } catch {
      // In-memory fallback update
      const all = getAllFallbackInvoices();
      const found = all.find((i) => i.invoiceNumber === invoiceNumber);
      if (found) {
        Object.assign(found, updates);
        return NextResponse.json({ success: true, invoice: found });
      }
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update invoice";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const invoiceNumber = searchParams.get("invoiceNumber");

    if (!invoiceNumber) {
      return NextResponse.json({ message: "invoiceNumber is required" }, { status: 400 });
    }

    deleteFallbackInvoice(invoiceNumber);

    try {
      await connectDB();
      await Invoice.findOneAndDelete({ invoiceNumber });
    } catch (err) {
      console.warn("MongoDB delete warning:", err);
    }

    return NextResponse.json({ success: true, message: "Invoice deleted successfully" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete invoice";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
