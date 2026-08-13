// ============================================================================
// MOCK DATA — placeholder only.
// Replace these arrays with real reads from Firebase Firestore collections:
//   products  -> collection("products")
//   orders    -> collection("orders")
//   customers -> collection("customers")
// See src/context/StoreContext.jsx for where these are consumed.
// ============================================================================

export const initialProducts = [
  { id: 1, name: "Midnight Gold Embroidered Sherwani", category: "Men", price: 340.00, originalPrice: 400.00, isSale: true, stock: 12, scheduleStatus: "Active", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800", desc: "Hand-crafted royal sherwani featuring delicate gold zari embroidery on premium silk fabric." },
  { id: 2, name: "Velvet Silk Evening Gown", category: "Women", price: 290.00, originalPrice: null, isSale: false, stock: 8, scheduleStatus: "Active", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800", desc: "Flowing black and gold accented evening gown designed with modern silhouette and regal drape." },
  { id: 3, name: "Heritage Brocade Tuxedo Blazer", category: "Men", price: 220.00, originalPrice: 260.00, isSale: true, stock: 14, scheduleStatus: "Active", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", desc: "Sophisticated tailored blazer with subtle metallic sheen and custom brass button details." },
  { id: 4, name: "Royal Organza Festive Ensemble", category: "Women", price: 310.00, originalPrice: null, isSale: false, stock: 0, scheduleStatus: "Finished", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800", desc: "Lightweight organza 3-piece festive wear featuring intricate threadwork and matching dupatta." },
  { id: 5, name: "Classic Gold-Trimmed Kurta Set", category: "Men", price: 160.00, originalPrice: 190.00, isSale: true, stock: 20, scheduleStatus: "Active", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800", desc: "Pristine cotton-silk blend kurta paired with designer churidar for timeless elegance." },
  { id: 6, name: "Signature Silk Wrap Dress", category: "Women", price: 240.00, originalPrice: null, isSale: false, stock: 5, scheduleStatus: "Coming Soon", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800", desc: "Luxurious pure silk wrap dress featuring adjustable waist tie and graceful asymmetric hem." },
  { id: 7, name: "Artisan Zari Pocket Square & Scarf", category: "Unisex", price: 65.00, originalPrice: null, isSale: false, stock: 25, scheduleStatus: "Active", img: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800", desc: "Hand-woven silk pocket square accented with signature gold thread motifs." },
  { id: 8, name: "Handcrafted Luxury Brooch Pin", category: "Unisex", price: 85.00, originalPrice: 100.00, isSale: true, stock: 18, scheduleStatus: "Pre-Order", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", desc: "Statement lapel pin fashioned in antique gold finish with embedded onyx crystal." },
  { id: 9, name: "Ivory Pearl-Embellished Sherwani", category: "Men", price: 380.00, originalPrice: null, isSale: false, stock: 10, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-ivory-sherwani/800/1000", desc: "Regal ivory sherwani hand-finished with pearl detailing and a structured Nehru collar." },
  { id: 10, name: "Crimson Silk Bridal Lehenga", category: "Women", price: 520.00, originalPrice: 600.00, isSale: true, stock: 6, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-crimson-lehenga/800/1000", desc: "Opulent bridal lehenga in deep crimson silk with hand-embroidered gold borders." },
  { id: 11, name: "Charcoal Slim-Fit Nehru Jacket", category: "Men", price: 145.00, originalPrice: null, isSale: false, stock: 22, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-nehru-jacket/800/1000", desc: "Tailored charcoal Nehru jacket in brushed wool blend, perfect for evening events." },
  { id: 12, name: "Emerald Anarkali Gown", category: "Women", price: 275.00, originalPrice: 320.00, isSale: true, stock: 9, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-emerald-anarkali/800/1000", desc: "Floor-length emerald Anarkali with flared silhouette and delicate thread embroidery." },
  { id: 13, name: "Woven Silk Formal Necktie", category: "Unisex", price: 45.00, originalPrice: null, isSale: false, stock: 30, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-silk-necktie/800/1000", desc: "Pure silk necktie woven with a subtle jacquard pattern, finished by hand." },
  { id: 14, name: "Rose Gold Statement Clutch", category: "Women", price: 95.00, originalPrice: null, isSale: false, stock: 16, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-rose-gold-clutch/800/1000", desc: "Metallic rose gold clutch with beaded trim, an elegant finishing touch for eveningwear." },
  { id: 15, name: "Navy Pinstripe Wedding Suit", category: "Men", price: 410.00, originalPrice: 460.00, isSale: true, stock: 7, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-navy-suit/800/1000", desc: "Sharp navy pinstripe three-piece suit tailored for weddings and formal occasions." },
  { id: 16, name: "Blush Chiffon Saree", category: "Women", price: 195.00, originalPrice: null, isSale: false, stock: 13, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-blush-saree/800/1000", desc: "Airy blush chiffon saree with a hand-finished gold border and matching blouse." },
  { id: 17, name: "Leather Embossed Cufflinks Set", category: "Unisex", price: 55.00, originalPrice: 70.00, isSale: true, stock: 24, scheduleStatus: "Active", img: "https://picsum.photos/seed/andaaz-cufflinks/800/1000", desc: "Refined cufflinks with embossed leather inlay set in a brushed gold finish." },
  { id: 18, name: "Sapphire Beaded Mermaid Dress", category: "Women", price: 330.00, originalPrice: null, isSale: false, stock: 4, scheduleStatus: "Coming Soon", img: "https://picsum.photos/seed/andaaz-sapphire-dress/800/1000", desc: "Sapphire mermaid gown hand-beaded from bodice to hem for a striking evening look." },

  // ---- Men's tailoring ----
  { id: 19, name: "Burgundy Slim-Fit Street Suit", category: "Men", price: 285.00, originalPrice: 320.00, isSale: true, stock: 11, scheduleStatus: "Active", img: "/products/men-burgundy-street-suit.jpg", desc: "Modern burgundy two-piece suit cut in a sharp slim fit, styled with a classic black tie." },
  { id: 20, name: "Sand Co-ord Shirt & Trouser Set", category: "Men", price: 165.00, originalPrice: null, isSale: false, stock: 17, scheduleStatus: "Active", img: "/products/men-sand-coord-set.jpg", desc: "Relaxed sand-toned camp-collar shirt and matching trouser set for warm-weather ease." },
  { id: 21, name: "Classic Black Shalwar Kameez", category: "Men", price: 120.00, originalPrice: null, isSale: false, stock: 19, scheduleStatus: "Active", img: "/products/men-black-shalwar-kameez.jpg", desc: "Timeless black shalwar kameez in a smooth, breathable fabric with a mandarin collar." },
  { id: 22, name: "Espresso Brown Kurta Shalwar", category: "Men", price: 130.00, originalPrice: 150.00, isSale: true, stock: 15, scheduleStatus: "Active", img: "/products/men-brown-kurta-shalwar.jpg", desc: "Rich espresso-brown kurta shalwar with a button placket, tailored for a refined silhouette." },
  { id: 23, name: "Navy Tailored Two-Piece Suit", category: "Men", price: 360.00, originalPrice: null, isSale: false, stock: 9, scheduleStatus: "Active", img: "/products/men-navy-two-piece-suit.jpg", desc: "Sharply tailored navy suit in a soft wool blend, equally at home in the boardroom or evening out." },

  // ---- Bags ----
  { id: 24, name: "Bamboo-Handle Onyx Tote", category: "Unisex", price: 135.00, originalPrice: null, isSale: false, stock: 14, scheduleStatus: "Active", img: "/products/bag-bamboo-handle-onyx.jpg", desc: "Structured onyx tote finished with a natural bamboo top handle for a refined everyday carry." },
  { id: 25, name: "Natural Canvas Tote Bag", category: "Unisex", price: 65.00, originalPrice: null, isSale: false, stock: 26, scheduleStatus: "Active", img: "/products/bag-canvas-tote-natural.jpg", desc: "Durable natural canvas tote, roomy enough for daily essentials with a relaxed, casual finish." },
  { id: 26, name: "Colourblock Rose & Ash Tote", category: "Unisex", price: 110.00, originalPrice: 130.00, isSale: true, stock: 12, scheduleStatus: "Active", img: "/products/bag-colourblock-rose-ash.jpg", desc: "Two-tone rose and ash leather tote with clean structured lines and a spacious interior." },
  { id: 27, name: "Olive Leather Crossbody Bag", category: "Unisex", price: 95.00, originalPrice: null, isSale: false, stock: 20, scheduleStatus: "Active", img: "/products/bag-crossbody-olive.jpg", desc: "Compact olive leather crossbody with an adjustable strap, made for hands-free days." },
  { id: 28, name: "Sandstone Everyday Tote", category: "Unisex", price: 89.00, originalPrice: null, isSale: false, stock: 18, scheduleStatus: "Active", img: "/products/bag-everyday-tote-sandstone.jpg", desc: "Soft sandstone tote built for daily use, with reinforced handles and a wide, easy-access opening." },
  { id: 29, name: "Espresso Leather Shoulder Bag", category: "Unisex", price: 145.00, originalPrice: 170.00, isSale: true, stock: 10, scheduleStatus: "Active", img: "/products/bag-leather-shoulder-espresso.jpg", desc: "Rich espresso leather shoulder bag with polished gold hardware and a structured silhouette." },
  { id: 30, name: "Blush Quilted Tote", category: "Unisex", price: 118.00, originalPrice: null, isSale: false, stock: 13, scheduleStatus: "Active", img: "/products/bag-quilted-tote-blush.jpg", desc: "Softly quilted blush tote with a feminine finish and a roomy, well-organized interior." },
  { id: 31, name: "Structured Charcoal Handbag", category: "Unisex", price: 125.00, originalPrice: null, isSale: false, stock: 15, scheduleStatus: "Active", img: "/products/bag-structured-charcoal.jpg", desc: "Sharp, structured charcoal handbag designed to hold its shape through a busy day." },
  { id: 32, name: "Ivory Studio Tote", category: "Unisex", price: 105.00, originalPrice: null, isSale: false, stock: 16, scheduleStatus: "Active", img: "/products/bag-studio-tote-ivory.jpg", desc: "Clean ivory studio tote in smooth vegan leather, a versatile everyday neutral." },
  { id: 33, name: "Teal Turquoise Handbag", category: "Unisex", price: 99.00, originalPrice: 120.00, isSale: true, stock: 11, scheduleStatus: "Active", img: "/products/bag-turquoise-handbag-teal.jpg", desc: "Bold turquoise handbag with a compact silhouette, a statement piece for any outfit." },

  // ---- Shoes ----
  { id: 34, name: "Beige Block Heel Sandals", category: "Unisex", price: 78.00, originalPrice: null, isSale: false, stock: 21, scheduleStatus: "Active", img: "/products/shoe-block-heels-beige.jpg", desc: "Comfortable beige block heels with a versatile strap design, built for all-day wear." },
  { id: 35, name: "Black Boutique Heels", category: "Unisex", price: 92.00, originalPrice: 110.00, isSale: true, stock: 14, scheduleStatus: "Active", img: "/products/shoe-boutique-black.jpg", desc: "Sleek black boutique heels with a pointed toe, perfectly at home from desk to dinner." },
  { id: 36, name: "Sandstone Embellished Heels", category: "Unisex", price: 88.00, originalPrice: null, isSale: false, stock: 12, scheduleStatus: "Active", img: "/products/shoe-embellished-sandstone.jpg", desc: "Sandstone heels finished with delicate embellishment across the strap for evening shine." },
  { id: 37, name: "Rose Gold Flats", category: "Unisex", price: 62.00, originalPrice: null, isSale: false, stock: 24, scheduleStatus: "Active", img: "/products/shoe-flat-rose-gold.jpg", desc: "Metallic rose gold flats offering effortless polish without sacrificing comfort." },
  { id: 38, name: "Espresso Glitter Heels", category: "Unisex", price: 96.00, originalPrice: 115.00, isSale: true, stock: 9, scheduleStatus: "Active", img: "/products/shoe-glitter-heels-espresso.jpg", desc: "Espresso-toned glitter heels that catch the light beautifully for evening occasions." },
  { id: 39, name: "White Peep-Toe Heels", category: "Unisex", price: 84.00, originalPrice: null, isSale: false, stock: 15, scheduleStatus: "Active", img: "/products/shoe-peep-toe-white.jpg", desc: "Crisp white peep-toe heels with a clean silhouette, an easy pairing for warm-weather looks." },
  { id: 40, name: "Ivory Strappy Sandals", category: "Unisex", price: 70.00, originalPrice: null, isSale: false, stock: 19, scheduleStatus: "Active", img: "/products/shoe-strappy-sandals-ivory.jpg", desc: "Delicate ivory strappy sandals with a slim heel, light enough for all-day events." },
  { id: 41, name: "Charcoal Strappy Walking Sandals", category: "Unisex", price: 74.00, originalPrice: null, isSale: false, stock: 17, scheduleStatus: "Active", img: "/products/shoe-strappy-walking-charcoal.jpg", desc: "Charcoal strappy sandals built with a low, stable heel for comfortable all-day walking." },
  { id: 42, name: "Blue Studded Heels", category: "Unisex", price: 102.00, originalPrice: 125.00, isSale: true, stock: 8, scheduleStatus: "Active", img: "/products/shoe-studded-blue.jpg", desc: "Vivid blue heels finished with polished stud detailing for a bold evening statement." },

  // ---- Wraps, stoles & dupattas ----
  { id: 43, name: "Sage Digital-Print Stole", category: "Unisex", price: 48.00, originalPrice: null, isSale: false, stock: 22, scheduleStatus: "Active", img: "/products/wrap-digital-stole-sage.jpg", desc: "Lightweight sage stole in a modern digital print, a versatile finishing layer." },
  { id: 44, name: "Ochre Embellished Wrap", category: "Unisex", price: 58.00, originalPrice: 70.00, isSale: true, stock: 16, scheduleStatus: "Active", img: "/products/wrap-embellished-ochre.jpg", desc: "Warm ochre wrap finished with delicate embellished trim along both edges." },
  { id: 45, name: "Gold Trellis Embroidered Dupatta", category: "Unisex", price: 72.00, originalPrice: null, isSale: false, stock: 14, scheduleStatus: "Active", img: "/products/wrap-embroidered-gold-trellis.jpg", desc: "Fine trellis embroidery in gold thread elevates this classic occasion dupatta." },
  { id: 46, name: "Midnight Net Dupatta", category: "Unisex", price: 55.00, originalPrice: null, isSale: false, stock: 18, scheduleStatus: "Active", img: "/products/wrap-net-dupatta-midnight.jpg", desc: "Sheer midnight net dupatta with a delicate scalloped border, made for eveningwear." },
  { id: 47, name: "Ivory Printed Chiffon Scarf", category: "Unisex", price: 42.00, originalPrice: null, isSale: false, stock: 25, scheduleStatus: "Active", img: "/products/wrap-printed-chiffon-ivory.jpg", desc: "Airy ivory chiffon scarf in a soft printed pattern, light enough for year-round wear." },
  { id: 48, name: "Slate Printed Silk Scarf", category: "Unisex", price: 60.00, originalPrice: 75.00, isSale: true, stock: 13, scheduleStatus: "Active", img: "/products/wrap-printed-silk-slate.jpg", desc: "Slate-toned silk scarf finished in a refined printed motif, a versatile wardrobe layer." },
  { id: 49, name: "Blush Silk Stole", category: "Unisex", price: 52.00, originalPrice: null, isSale: false, stock: 20, scheduleStatus: "Active", img: "/products/wrap-silk-stole-blush.jpg", desc: "Pure blush silk stole with a soft drape, an elegant layer for any occasion." },
  { id: 50, name: "Dusty Rose Woven Shawl", category: "Unisex", price: 68.00, originalPrice: null, isSale: false, stock: 15, scheduleStatus: "Active", img: "/products/wrap-woven-shawl-dusty-rose.jpg", desc: "Dusty rose woven shawl with a soft, textured finish, cozy enough for cooler evenings." }
];

export const initialOrders = [
  { id: "AND-2026-7821", customer: "Alex Morgan", email: "alex@example.com", date: "August 10, 2026", total: 340.00, status: "Delivered", items: [{ name: "Midnight Gold Embroidered Sherwani", qty: 1, price: 340.00, size: "L" }] },
  { id: "AND-2026-8942", customer: "Sophia Vance", email: "sophia@example.com", date: "August 12, 2026", total: 290.00, status: "Processing", items: [{ name: "Velvet Silk Evening Gown", qty: 1, price: 290.00, size: "M" }] }
];

export const initialCustomers = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", ordersCount: 2, totalSpent: 630.00 },
  { id: 2, name: "Sophia Vance", email: "sophia@example.com", ordersCount: 1, totalSpent: 290.00 },
  { id: 3, name: "Liam Sterling", email: "liam@example.com", ordersCount: 4, totalSpent: 1120.00 }
];

export const salesChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  data: [4200, 5100, 6800, 7400, 8900, 9600, 11200, 12450]
};

export const dashboardBaseStats = {
  baseRevenue: 12450,
  baseCustomers: 1237
};
