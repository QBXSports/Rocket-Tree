# ZYVO — Everything. Just Faster.
### Premium Quick-Commerce & On-Demand Local Services Platform

**Tagline:** Everything. Just Faster.  
**Theme Palette:** Electric Lime Green (`#C5FF55`), Midnight Black (`#101510`), Clean White (`#FFFFFF`), Emerald Green (`#16A34A`), and Dark Card Slate (`#161D16`).

---

## ⚡ Overview & Features

ZYVO is a complete, production-ready quick-commerce and on-demand local services platform inspired by modern dark-store speed, with custom branding, layout, database models, and order lifecycle management.

### Key Highlights
1. **Express Quick-Commerce Storefront**:
   - 15-25 minute lightning delivery promise for local dark store clusters.
   - Dynamic catalog with categories, variants (size, weight, pack, colour), MRP, selling price, and automatic discount calculation.
   - Real-time search with live dropdown suggestions and instant ADD/stepper buttons.
   - Local delivery PIN code selector (e.g., `226010`, `226001`, `110001`, `560001`, `400001`).
   - Coupon management system (`ZYVOFAST` for 20% OFF, `FIRST50` for flat ₹50 OFF).
   - Free delivery threshold calculation (Orders ₹499+ get free delivery).
   - Server-side authoritative price and stock validation (prevents client-side price manipulation).

2. **On-Demand Local Services**:
   - Booking for AC Jet Deep Cleaning, Electrician On-Demand, Plumbing & Leakage Repair, Home Deep Cleaning, and Appliance Repair.
   - Date & time slot picker with customer location details.
   - Instant booking dispatch and unique booking reference ID.

3. **MOST IMPORTANT: Automated WhatsApp Notifications**:
   - **Target Admin/Owner Phone**: `+91 8081529714` (normalized: `918081529714`).
   - Every single customer order automatically triggers a server-side notification containing complete customer details, itemized breakdown with variants, prices, delivery instructions, and payment status.
   - Service bookings similarly dispatch an immediate technician assignment notice.
   - **Multi-Provider Support**:
     1. Official Meta WhatsApp Cloud API (Graph API)
     2. Twilio WhatsApp API
     3. Custom Webhook / Gateway
   - **Quick-Start Direct Fallback**: Generates direct `wa.me` links populated with full formatted order text so customers or administrators can open WhatsApp with 1 tap.
   - Full notification audit log table with retry button in the admin panel. Orders are never lost or canceled if external WhatsApp network delivery encounters an issue.

4. **Customer Authentication & Verification**:
   - Indian mobile number (+91) with phone OTP verification flow.
   - Email and password login/registration.
   - Customer profile with saved delivery addresses.
   - Clear setup status messages if third-party SMS gateway is in test mode.

5. **Secure Administrator Control Panel (`/admin`)**:
   - Protected by role-based access control (`role === "ADMIN"`).
   - Real-time analytics: Total revenue, today's orders, pending/confirmed/delivered counts, low stock alerts, WhatsApp failure counts.
   - Searchable Orders Management table with order details modal, status updates, invoice printing, and **Retry WhatsApp Notification** button.
   - Products Catalog management with multi-image URLs, variants, SKU, price/MRP, stock, bestseller flags.
   - Local Services and Service Bookings manager.
   - Serviceable Delivery PIN Codes manager with delivery fee and minimum order value settings.
   - Promotional Hero Banners and Coupon manager.
   - WhatsApp Integration Center with live test message sender and audit logs.

---

## 🛠️ Tech Stack

- **Frontend & Server**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database & ORM**: Prisma ORM with SQLite (embedded `prisma/dev.db` ready out of the box, zero external setup needed; fully compatible with PostgreSQL / Supabase)
- **Icons & UI**: Lucide React + Canvas Confetti
- **Authentication**: JWT HTTP-only cookies + bcryptjs password hashing
- **WhatsApp Dispatch**: Meta WhatsApp Cloud API / Twilio / Direct `wa.me` fallback

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js v18+ (tested on Node v20/v24)
- npm

### 2. Installation
```bash
# Clone or navigate to the project directory
cd "my group website"

# Install dependencies (already pre-installed)
npm install
```

### 3. Initialize Database & Seed Demo Data
```bash
# Push Prisma schema to SQLite database (dev.db)
npx prisma db push

# Seed products, categories, services, delivery PIN codes, and initial sample order
node prisma/seed.js
```

### 4. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Default Credentials

### Store Administrator:
- **Email:** `admin@zyvo.com`
- **Password:** `admin123`
- **Phone:** `+918081529714`
- **Admin Dashboard URL:** [http://localhost:3000/admin](http://localhost:3000/admin)

### Demo Customer:
- **Email:** `customer@zyvo.com`
- **Password:** `customer123`
- **Phone:** `+919876543210`

---

## 📱 How to Configure Official WhatsApp Cloud API

To receive automatic background notifications directly on WhatsApp number **+91 8081529714**:

1. Go to [Meta for Developers](https://developers.facebook.com/) and log in with your Facebook account.
2. Click **My Apps** &gt; **Create App** &gt; Select **Other** &gt; Choose **Business**.
3. Under Add Products to Your App, click **Set up** on **WhatsApp**.
4. In the left navigation, go to **WhatsApp** &gt; **API Setup**:
   - Copy the **Phone number ID**.
   - Copy the **Temporary Access Token** (or create a permanent System User token in Business Manager &gt; System Users with `whatsapp_business_messaging` permission).
   - In the "To" field on Meta dashboard, add and verify your phone number **+91 8081529714**.
5. Open your ZYVO Admin Panel at **`/admin/whatsapp`**:
   - Set Provider to **Meta WhatsApp Cloud API**.
   - Paste your **Phone Number ID**.
   - Paste your **Access Token**.
   - Click **Save Configuration**.
   - Click **Send Test WhatsApp Message** to verify live delivery to `+91 8081529714`!

---

## 📦 Deployment Guide (Vercel / VPS / Cloud)

### Deploying to Vercel:
1. Push this repository to GitHub or GitLab.
2. In Vercel, import the repository.
3. If using Supabase / PostgreSQL:
   - Change `provider = "postgresql"` in `prisma/schema.prisma`.
   - Set environment variable `DATABASE_URL="postgres://..."`.
4. Add environment variables:
   - `JWT_SECRET`
   - `WHATSAPP_RECIPIENT_PHONE="+918081529714"`
   - `WHATSAPP_CLOUD_API_TOKEN` & `WHATSAPP_CLOUD_PHONE_NUMBER_ID` (if using Meta Cloud API)
5. Deploy! Vercel will automatically build the Next.js application.
