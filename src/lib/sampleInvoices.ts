export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceRecord {
  _id?: string;
  invoiceNumber: string;
  type: "invoice" | "receipt";
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientAddress?: string;
  clientGst?: string;
  eventName?: string;
  invoiceDate: string;
  dueDate?: string;
  paymentDate?: string;
  paymentStatus: "paid" | "partial" | "pending" | "cancelled";
  paymentMode: "upi" | "bank_transfer" | "cash" | "cheque" | "card";
  transactionRef?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  amountInWords?: string;
  notes?: string;
  terms?: string[];
  bankDetails?: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifsc: string;
    upiId: string;
  };
  createdAt?: string;
}

export const DEFAULT_INVOICE_TERMS = [
  "Stall booking is officially reserved only upon receipt of advance payment.",
  "Full balance clearance is strictly required 24 hours prior to event load-in.",
  "In case of event postponement due to natural rain or RWA regulations, booking is adjusted to rescheduled date.",
  "All transactions are non-refundable once allocated. Subject to Chennai jurisdiction.",
];

export const DEFAULT_BANK_DETAILS = {
  bankName: "HDFC Bank",
  accountName: "MP DREAM EVENTS & SOLUTIONS",
  accountNumber: "50200088991234",
  ifsc: "HDFC0001234",
  upiId: "7338999723@upi",
};

export function numberToWordsIndian(num: number): string {
  if (num === 0) return "Zero Rupees Only";
  if (!num || isNaN(num)) return "";

  const a = [
    "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ",
    "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen ",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const formatNumber = (n: number): string => {
    let str = "";
    if (n > 99) {
      str += a[Math.floor(n / 100)] + "Hundred ";
      n %= 100;
    }
    if (n > 19) {
      str += b[Math.floor(n / 10)] + " " + a[n % 10];
    } else {
      str += a[n];
    }
    return str;
  };

  const whole = Math.floor(Math.abs(num));
  let result = "";

  const crore = Math.floor(whole / 10000000);
  const lakh = Math.floor((whole % 10000000) / 100000);
  const thousand = Math.floor((whole % 100000) / 1000);
  const remainder = whole % 1000;

  if (crore > 0) result += formatNumber(crore) + "Crore ";
  if (lakh > 0) result += formatNumber(lakh) + "Lakh ";
  if (thousand > 0) result += formatNumber(thousand) + "Thousand ";
  if (remainder > 0) result += formatNumber(remainder);

  return result.trim() + " Rupees Only";
}

export const initialSampleInvoices: InvoiceRecord[] = [
  {
    _id: "inv-001",
    invoiceNumber: "MPD-INV-2026-001",
    type: "invoice",
    clientName: "Chennai Traditional Sweets & Savouries",
    clientPhone: "+91 98412 87654",
    clientEmail: "orders@chennaitsweets.in",
    clientAddress: "Shop 14, T. Nagar, Chennai - 600017",
    eventName: "TVS Emerald Peninsula Mega Shopping Carnival 2026",
    invoiceDate: "2026-10-10",
    dueDate: "2026-10-18",
    paymentDate: "2026-10-10",
    paymentStatus: "paid",
    paymentMode: "upi",
    transactionRef: "UPI/329482910482/GPAY",
    items: [
      {
        description: "Commercial Food Stall (10x10 ft Canopy) with 2 Tables, 2 Chairs, Power point (2 Days)",
        quantity: 1,
        rate: 8500,
        amount: 8500,
      },
      {
        description: "Additional 15A Heavy Power Distribution Junction Line for Fryer",
        quantity: 1,
        rate: 1500,
        amount: 1500,
      },
    ],
    subtotal: 10000,
    taxRate: 0,
    taxAmount: 0,
    discount: 500,
    grandTotal: 9500,
    amountPaid: 9500,
    balanceDue: 0,
    amountInWords: "Nine Thousand Five Hundred Rupees Only",
    notes: "Full payment received for Stall #08 at TVS Emerald Peninsula Carnival.",
    terms: DEFAULT_INVOICE_TERMS,
    bankDetails: DEFAULT_BANK_DETAILS,
    createdAt: "2026-10-10T10:30:00.000Z",
  },
  {
    _id: "rec-002",
    invoiceNumber: "MPD-REC-2026-002",
    type: "receipt",
    clientName: "Narayana Hyundai Auto Dealership",
    clientPhone: "+91 98844 11223",
    clientEmail: "corporate@narayanahyundai.com",
    clientAddress: "Anna Salai, Mount Road, Chennai - 600002",
    clientGst: "33AAACN1234F1Z8",
    eventName: "TVS Emerald Peninsula Grand Auto Display Expo",
    invoiceDate: "2026-10-12",
    dueDate: "2026-10-15",
    paymentDate: "2026-10-12",
    paymentStatus: "partial",
    paymentMode: "bank_transfer",
    transactionRef: "HDFCN2610129841",
    items: [
      {
        description: "Car Display Promotion Package (4-Seater Display Promenade Prime Frontage + Resident Brochures)",
        quantity: 1,
        rate: 10000,
        amount: 10000,
      },
      {
        description: "Audio Announcement & LED Standee Placement Space",
        quantity: 1,
        rate: 2000,
        amount: 2000,
      },
    ],
    subtotal: 12000,
    taxRate: 18,
    taxAmount: 2160,
    discount: 0,
    grandTotal: 14160,
    amountPaid: 7000,
    balanceDue: 7160,
    amountInWords: "Fourteen Thousand One Hundred Sixty Rupees Only",
    notes: "50% Booking advance received. Balance due prior to car vehicle entry to venue.",
    terms: DEFAULT_INVOICE_TERMS,
    bankDetails: DEFAULT_BANK_DETAILS,
    createdAt: "2026-10-12T14:15:00.000Z",
  },
];

declare global {
  // eslint-disable-next-line no-var
  var inMemoryInvoicesStore: InvoiceRecord[] | undefined;
}

export function getAllFallbackInvoices(): InvoiceRecord[] {
  if (!globalThis.inMemoryInvoicesStore) {
    globalThis.inMemoryInvoicesStore = [...initialSampleInvoices];
  }
  return globalThis.inMemoryInvoicesStore;
}

export function saveFallbackInvoice(invoice: InvoiceRecord): InvoiceRecord {
  if (!globalThis.inMemoryInvoicesStore) {
    globalThis.inMemoryInvoicesStore = [...initialSampleInvoices];
  }
  const idx = globalThis.inMemoryInvoicesStore.findIndex(
    (i) => i.invoiceNumber === invoice.invoiceNumber || (invoice._id && i._id === invoice._id)
  );
  const now = new Date().toISOString();
  const recordWithDates = {
    ...invoice,
    _id: invoice._id || `inv-${Date.now()}`,
    createdAt: invoice.createdAt || now,
  };
  if (idx >= 0) {
    globalThis.inMemoryInvoicesStore[idx] = recordWithDates;
  } else {
    globalThis.inMemoryInvoicesStore.unshift(recordWithDates);
  }
  return recordWithDates;
}

export function deleteFallbackInvoice(invoiceNumber: string): boolean {
  if (!globalThis.inMemoryInvoicesStore) {
    globalThis.inMemoryInvoicesStore = [...initialSampleInvoices];
  }
  const initialLen = globalThis.inMemoryInvoicesStore.length;
  globalThis.inMemoryInvoicesStore = globalThis.inMemoryInvoicesStore.filter(
    (i) => i.invoiceNumber !== invoiceNumber
  );
  return globalThis.inMemoryInvoicesStore.length < initialLen;
}
