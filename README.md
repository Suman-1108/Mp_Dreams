# 🌟 MP DREAM EVENTS & SOLUTIONS

> **Chennai's Premier Event Management, Apartment Expos & Stall Solutions Platform**

![MP Dream Events & Solutions](public/images/logo-transparent.png)

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

## 📖 Overview

**MP DREAM EVENTS & SOLUTIONS** is a state-of-the-art web application engineered for Chennai's leading event management, luxury wedding staging, gated community apartment flea markets, vendor stall bookings, and business services provider.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **MongoDB**, the platform provides a seamless experience for event clients, stall vendors, visitors, and administrators.

---

## ✨ Key Features

### 🏢 Public Platform
* **⚡ Dynamic Hero Banner**: High-impact luxury showcase featuring 3D brand emblem, ambient glow effects, live statistics, and clear action triggers.
* **📅 Interactive Events Calendar**: Filter and search upcoming music concerts, apartment expos, cultural galas, and corporate conferences across Chennai.
* **🛍️ Apartment Expo Hub**: Specialized landing page for gated community flea markets, stall availability calculator, and vendor ROI insights.
* **📝 Multi-Step Vendor Registration**: Seamless online booking application for craft, food, apparel, and lifestyle vendors to reserve stall spaces.
* **🖼️ Rich Media Gallery**: Filterable photo gallery categorized into Weddings, Concerts, Apartment Expos, Corporate Stages, and Lighting.
* **📞 Instant Contact & WhatsApp**: Integrated direct phone calls, interactive inquiry forms, and click-to-chat WhatsApp features.

### 🔐 Admin Management Portal (`/admin`)
* **📊 Dashboard Analytics**: Real-time counter of total events, pending vendor applications, client enquiries, and stall reservations.
* **🎪 Event Management**: Complete CRUD interface to publish, edit, or archive upcoming expos and grand events.
* **🏬 Vendor Application Approval**: Review vendor details, products, stall requirements, and update application status (Pending / Approved / Rejected).
* **✉️ Client Enquiries Manager**: Track, answer, and manage customer service inquiries directly from the control panel.
* **📸 Gallery Asset Management**: Upload and organize high-resolution event portfolio images.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Utility System
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) with Mongoose ORM
- **Authentication**: JWT Token & BCrypt Password Hashing
- **Email System**: Nodemailer with SMTP integration

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18.0 or later) installed on your system.

### 2. Installation
Clone the repository and install project dependencies:

```bash
git clone https://github.com/Suman-1108/Mp_Dreams.git
cd Mp_Dreams
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_connection_string

# Admin Security
ADMIN_EMAIL=admin@mpdreamevents.com
ADMIN_PASSWORD_HASH=your_bcrypt_hash
JWT_SECRET=your_jwt_secret_key

# Site & Contact Settings
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WHATSAPP_NUMBER=917338999723
NEXT_PUBLIC_WHATSAPP_NUMBER=917338999723
```

### 4. Running Locally
Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the live application.

---

## 📁 Project Structure

```
mp-dream-events/
├── public/                  # Static assets & brand logos
│   ├── images/              # Event banners & high-res logo badges
│   └── favicon.ico          # App icon
├── src/
│   ├── app/                 # Next.js 15 App Router pages & API routes
│   │   ├── (website)/       # Public pages (Home, About, Services, Expo, Gallery, Contact)
│   │   ├── admin/           # Admin login & dashboard portal
│   │   └── api/             # Backend REST API routes (Events, Vendors, Enquiries, Auth)
│   ├── components/          # Modular React components
│   │   ├── admin/           # Admin dashboard widgets & sidebar
│   │   ├── forms/           # Vendor registration & contact forms
│   │   ├── home/            # Hero banner, feature grids, stats counter
│   │   └── layout/          # Navbar, Footer, Floating WhatsApp trigger
│   ├── lib/                 # Database connection & utility helpers
│   └── models/              # Mongoose database schemas
├── .env.example             # Environment template
├── .gitignore               # Git ignored patterns
├── next.config.ts           # Next.js configuration
├── package.json             # NPM dependencies & scripts
└── README.md                # Project documentation
```

---

## 📞 Contact & Support

**MP DREAM EVENTS & SOLUTIONS**  
📍 Chennai, Tamil Nadu, India  
📞 Phone: [+91 73389 99723](tel:+917338999723)  
📧 Email: [mpdreameventssolutions@gmail.com](mailto:mpdreameventssolutions@gmail.com)  

---

© 2026 **MP Dream Events & Solutions**. All rights reserved.
