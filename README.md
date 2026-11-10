# ROCKETTREE – Everything. One Destination.

Official digital all-in-one marketplace website engineered for Indian semi-urban and rural commerce, bridging consumers and local businesses with direct **WhatsApp Ordering** (+91 9565305601).

---

## 🚀 1. Brand Identity & Colours

- **Brand:** ROCKETTREE
- **Tagline:** Everything. One Destination.
- **Brand Colours:**
  - Navy Blue: `#102A43`
  - Orange: `#FF7A1A`
  - Green: `#20A464`
  - White: `#FFFFFF`
  - Background: `#F5F7FA`
  - Text: `#182230`

Official logo embedded from user assets to `/public/images/rockettree-logo.jpg`.

---

## 📱 2. Universal WhatsApp Ordering System

- **Official WhatsApp Business Hotline:** `+91 9565305601`
- **Link Protocol:** `https://wa.me/919565305601?text=ENCODED_MESSAGE`
- **Enforced Official Acceptance Notice:**
  > *"Your order request will be sent to ROCKETTREE. Our team will confirm availability, final charges and order acceptance."*
- Every product card, cart checkout, restaurant dish, technician booking, worker hire, job application, and manpower demand has direct WhatsApp link generation and backend database persistence.

---

## 📍 3. Initial Operational Hub

- **PIN Code:** `221101`
- **Village:** Dharsauna
- **Block:** Cholapur
- **District:** Varanasi
- **State:** Uttar Pradesh
- **Country:** India
- Dynamic PIN verification modal with serviceable indicators for PIN 221101 & 221104, and *"ROCKETTREE is coming soon to your location!"* for unserved PIN codes.

---

## 🛒 4. Marketplace Modules

1. **Shopping Mall (`/shopping`):** Men's fashion, women's fashion, electronics, smartwatches, home & kitchen, mobile accessories.
2. **Fresh Grocery (`/grocery`):** Dharsauna Kisan Mandi & Fresh Mart (milk, curd, paneer, vegetables, atta, pulses).
3. **Food Delivery (`/food`):** Varanasi Dhaba & Family Restaurant, Banaras Biryani & Kebabs with Veg/Non-Veg badges.
4. **Home Services (`/services`):** Electrician, plumber, split/window AC repair, RO servicing, house painting.
5. **Labour & Workers (`/labour`):** Masons (Mistri), construction helpers, carpenters, drivers, electricians with daily wage cards.
6. **Local Jobs (`/jobs`):** Warehouse supervisors, bike delivery riders, billing executives with instant WhatsApp apply.
7. **Bulk Manpower (`/manpower`):** Enterprise recruitment requisition form.
8. **Digital Services (`/digital-services`):** Freelance logos, website development, video editing, ATS resumes, SEO.
9. **Cart & WhatsApp Checkout (`/cart`):** Unified cart with free delivery calculation above ₹499.
10. **Central Admin Panel (`/admin`):** Live dashboard, order status tracking, PIN code management, WhatsApp settings.
11. **Customer Account (`/account`):** Live order tracking, default address.
12. **Legal Trust Pages:** `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`.

---

## 🔑 5. Demo Credentials

- **Central Admin:**
  - Email: `admin@rockettree.in`
  - Password: `admin123`
- **Customer Account:**
  - Email: `rahul.varanasi@gmail.com`
  - Password: `customer123`

---

## 🛠️ 6. Technology Stack & Running Locally

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Lucide React Icons
- **Database:** Prisma ORM with SQLite (`prisma/dev.db`) — seamlessly switchable to PostgreSQL by updating `DATABASE_URL` in `.env`.
- **Authentication:** Bcrypt password hashing + JWT tokens.

```bash
# Install dependencies
npm.cmd install

# Sync database
npx.cmd prisma db push

# Seed initial hub data
node prisma/seed.js

# Build production bundle
npm.cmd run build

# Start live server
npm.cmd start
```

Website running live at: **http://localhost:3000**
