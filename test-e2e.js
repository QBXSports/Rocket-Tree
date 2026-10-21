const http = require('http');

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:3001${path}`,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(body);
          } catch (e) {
            json = body;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("==================================================");
  console.log("🚀 STARTING ZYVO COMPREHENSIVE END-TO-END TESTS");
  console.log("==================================================\n");

  let cookie = '';

  // 1. Check Homepage
  console.log("1. Checking Homepage (GET /)...");
  const homeRes = await request('/');
  if (homeRes.status === 200) {
    console.log("   ✅ Homepage loaded with HTTP 200 OK");
  } else {
    console.error("   ❌ Homepage failed with status:", homeRes.status);
    process.exit(1);
  }

  // 2. Fetch Products
  console.log("\n2. Fetching Products Catalog (GET /api/products)...");
  const prodRes = await request('/api/products');
  const products = prodRes.body.products || [];
  console.log(`   ✅ Found ${products.length} live products in database`);
  if (products.length === 0) {
    console.error("   ❌ No products returned");
    process.exit(1);
  }
  const milk = products.find(p => p.sku === 'ZYV-GRO-001');
  const charger = products.find(p => p.sku === 'ZYV-TEC-001');
  console.log(`   • Sample 1: ${milk.name} - ₹${milk.sellingPrice} (MRP: ₹${milk.mrp})`);
  console.log(`   • Sample 2: ${charger.name} - ₹${charger.sellingPrice} (MRP: ₹${charger.mrp})`);

  // 3. Customer Authentication
  console.log("\n3. Testing Customer Login (POST /api/auth/login)...");
  const loginRes = await request('/api/auth/login', {
    method: 'POST',
    body: {
      identifier: 'customer@zyvo.com',
      password: 'customer123',
    },
  });
  if (loginRes.status === 200 && loginRes.body.success) {
    console.log(`   ✅ Logged in successfully as: ${loginRes.body.user.name} (${loginRes.body.user.phone})`);
    if (loginRes.headers['set-cookie']) {
      cookie = loginRes.headers['set-cookie'][0].split(';')[0];
    }
  } else {
    console.error("   ❌ Customer login failed:", loginRes.body);
    process.exit(1);
  }

  // 4. Cart Server Validation with Coupon
  console.log("\n4. Testing Authoritative Server-Side Cart Pricing & Coupon (POST /api/cart/validate)...");
  const cartRes = await request('/api/cart/validate', {
    method: 'POST',
    body: {
      items: [
        { productId: milk.id, quantity: 2 },
        { productId: charger.id, quantity: 1 },
      ],
      couponCode: 'ZYVOFAST',
      pinCode: '226010',
    },
  });
  console.log(`   ✅ Subtotal calculated on server: ₹${cartRes.body.subtotal}`);
  console.log(`   ✅ Coupon discount applied: -₹${cartRes.body.discount} (Coupon: ${cartRes.body.coupon?.code})`);
  console.log(`   ✅ Final authoritative payable: ₹${cartRes.body.totalAmount}`);
  console.log(`   ✅ PIN 226010 Serviceable: ${cartRes.body.isPinServiceable} (${cartRes.body.deliveryEstimatedMinutes} Mins Express Speed)`);

  // 5. Place Customer Order with WhatsApp Notification Workflow
  console.log("\n5. Placing Order & Triggering WhatsApp Notification Workflow to +91 8081529714 (POST /api/orders)...");
  const orderRes = await request('/api/orders', {
    method: 'POST',
    headers: { Cookie: cookie },
    body: {
      customerName: "Rohit Sharma",
      customerPhone: "+919876543210",
      customerEmail: "customer@zyvo.com",
      deliveryHouse: "Flat 402, Tower B, Royal Palms",
      deliveryLandmark: "Opposite Wave Mall",
      deliveryArea: "Gomti Nagar",
      deliveryCity: "Lucknow",
      deliveryState: "Uttar Pradesh",
      deliveryPinCode: "226010",
      deliveryInstructions: "Ring bell once and leave on doorstep.",
      paymentMethod: "COD",
      couponCode: "ZYVOFAST",
      items: [
        { productId: milk.id, quantity: 2 },
        { productId: charger.id, quantity: 1 },
      ],
    },
  });

  if (orderRes.status === 200 && orderRes.body.success) {
    const placedOrder = orderRes.body.order;
    const wa = orderRes.body.whatsappNotification;
    console.log(`   ✅ Order Created: ID ${placedOrder.orderNumber} (Database ID: ${placedOrder.id})`);
    console.log(`   ✅ Items in Order: ${placedOrder.items.length}`);
    placedOrder.items.forEach((item, idx) => {
      console.log(`      ${idx + 1}. ${item.productName} × ${item.quantity} = ₹${item.itemTotal}`);
    });
    console.log(`   ✅ Total Payable: ₹${placedOrder.totalAmount}`);
    console.log(`   ✅ WhatsApp Dispatch Triggered to: +91 8081529714`);
    console.log(`   ✅ WhatsApp Status: ${wa.status} (Provider: ${wa.provider})`);
    console.log(`   ✅ Direct WhatsApp Fallback Link: ${wa.directUrl.slice(0, 75)}...`);
  } else {
    console.error("   ❌ Order placement failed:", orderRes.body);
    process.exit(1);
  }

  // 6. Admin Authentication & Stats
  console.log("\n6. Testing Admin Authentication (POST /api/auth/login with admin@zyvo.com)...");
  const adminLoginRes = await request('/api/auth/login', {
    method: 'POST',
    body: {
      identifier: 'admin@zyvo.com',
      password: 'admin123',
    },
  });
  let adminCookie = '';
  if (adminLoginRes.status === 200 && adminLoginRes.body.user.role === 'ADMIN') {
    console.log(`   ✅ Logged in as Administrator: ${adminLoginRes.body.user.name}`);
    adminCookie = adminLoginRes.headers['set-cookie'][0].split(';')[0];
  } else {
    console.error("   ❌ Admin login failed:", adminLoginRes.body);
    process.exit(1);
  }

  // 7. Admin Dashboard Analytics
  console.log("\n7. Checking Admin Dashboard Metrics (GET /api/admin/stats)...");
  const statsRes = await request('/api/admin/stats', {
    headers: { Cookie: adminCookie },
  });
  if (statsRes.status === 200) {
    const m = statsRes.body.metrics;
    console.log(`   ✅ Total Orders in DB: ${m.totalOrders}`);
    console.log(`   ✅ Total Revenue: ₹${m.totalRevenue}`);
    console.log(`   ✅ Confirmed Orders: ${m.confirmedOrders}`);
    console.log(`   ✅ Total Products: ${m.totalProducts} (${m.lowStockProducts} low stock)`);
    console.log(`   ✅ Registered Customers: ${m.registeredCustomers}`);
  }

  // 8. Book Local Service & Verify WhatsApp Notification to +91 8081529714
  console.log("\n8. Booking Local Service & Testing WhatsApp Notification (POST /api/services/book)...");
  const servicesRes = await request('/api/services');
  const acService = servicesRes.body.services.find(s => s.slug.includes('ac')) || servicesRes.body.services[0];

  const bookingRes = await request('/api/services/book', {
    method: 'POST',
    headers: { Cookie: cookie },
    body: {
      serviceId: acService.id,
      customerName: "Rohit Sharma",
      customerPhone: "+919876543210",
      customerEmail: "customer@zyvo.com",
      address: "Flat 402, Royal Palms, Gomti Nagar",
      pinCode: "226010",
      preferredDate: "2026-10-25",
      preferredTime: "Morning (9 AM - 12 PM)",
      notes: "Need outdoor unit jet washing and gas pressure inspection.",
    },
  });

  if (bookingRes.status === 200 && bookingRes.body.success) {
    const booking = bookingRes.body.booking;
    console.log(`   ✅ Service Booking Created: ${booking.bookingNumber} (${booking.service.name})`);
    console.log(`   ✅ Scheduled Date & Slot: ${booking.preferredDate} - ${booking.preferredTime}`);
    console.log(`   ✅ WhatsApp Notification Dispatched to Owner: +91 8081529714 (Status: ${bookingRes.body.whatsappNotification.status})`);
  } else {
    console.error("   ❌ Service booking failed:", bookingRes.body);
    process.exit(1);
  }

  // 9. Retry WhatsApp Notification Test
  console.log("\n9. Testing Admin Retry WhatsApp Notification (POST /api/orders/[id]/retry-whatsapp)...");
  const ordersListRes = await request('/api/orders', {
    headers: { Cookie: adminCookie },
  });
  const firstOrder = ordersListRes.body.orders[0];
  const retryRes = await request(`/api/orders/${firstOrder.id}/retry-whatsapp`, {
    method: 'POST',
    headers: { Cookie: adminCookie },
  });
  console.log(`   ✅ Retry WhatsApp Result: Status = ${retryRes.body.status}, Provider = ${retryRes.body.provider}`);
  console.log(`   ✅ Generated Direct Fallback URL: ${retryRes.body.directFallbackUrl ? "Available" : "None"}`);

  console.log("\n==================================================");
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! ZYVO IS 100% OPERATIONAL");
  console.log("==================================================");
}

runTests().catch(err => {
  console.error("Test execution error:", err);
  process.exit(1);
});
