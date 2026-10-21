// ============================================================
// PRODUCT CATALOG — single source of truth for the whole store
// ============================================================

const PRODUCTS = [
    {
        id: "p1",
        title: "AeroBook Pro 15 Laptop, 16GB RAM, 512GB SSD, 15.6\" FHD Display",
        category: "Electronics",
        price: 899.99,
        oldPrice: 1099.99,
        rating: 4.6,
        reviews: 2341,
        image: "assets/photos/laptop.jpg",
        deal: true,
        prime: true,
        bullets: [
            "15.6-inch Full HD IPS anti-glare display",
            "16GB DDR5 memory + 512GB NVMe solid state drive",
            "Up to 12 hours of battery life on a single charge",
            "Backlit keyboard, fingerprint reader, and webcam shutter",
            "Weighs just 1.4 kg with aluminium chassis"
        ],
        description: "The AeroBook Pro 15 balances portability with desktop-class power. A colour-accurate FHD panel and all-day battery make it the ideal companion for work, study, and streaming."
    },
    {
        id: "p2",
        title: "SoundMax ANC Wireless Over-Ear Headphones with Active Noise Cancelling",
        category: "Electronics",
        price: 199.99,
        oldPrice: 279.99,
        rating: 4.7,
        reviews: 8921,
        image: "assets/photos/headphones.jpg",
        deal: true,
        prime: true,
        bullets: [
            "Hybrid active noise cancelling blocks up to 95% of ambient noise",
            "40mm drivers deliver deep bass and crisp highs",
            "Up to 45 hours of playback with ANC enabled",
            "Multipoint Bluetooth 5.3 pairs with two devices at once",
            "Memory-foam ear cushions for all-day comfort"
        ],
        description: "Immerse yourself in music, calls, and movies without the world getting in the way. Quick charge gives you 5 hours of listening from just 10 minutes on the charger."
    },
    {
        id: "p3",
        title: "PulseFit Series 8 Smartwatch, AMOLED Display, Heart-Rate & SpO2 Tracking",
        category: "Electronics",
        price: 249.99,
        oldPrice: null,
        rating: 4.5,
        reviews: 5120,
        image: "assets/photos/smartwatch.jpg",
        deal: false,
        prime: true,
        bullets: [
            "1.9-inch always-on AMOLED touchscreen",
            "Continuous heart rate, SpO2 and sleep tracking",
            "120+ workout modes with built-in GPS",
            "Water resistant to 5 ATM — swim proof",
            "Up to 10 days of battery life"
        ],
        description: "Track every beat, step and lap with a watch that looks as good in the boardroom as it does in the pool. Compatible with Android and iOS."
    },
    {
        id: "p4",
        title: "Nova X5 Smartphone 128GB, 6.7\" 120Hz Display, 50MP Triple Camera",
        category: "Electronics",
        price: 699.0,
        oldPrice: 769.0,
        rating: 4.4,
        reviews: 3302,
        image: "assets/photos/smartphone.jpg",
        deal: false,
        prime: true,
        bullets: [
            "6.7-inch 120Hz AMOLED display with 1300 nits peak brightness",
            "50MP main camera with OIS plus 12MP ultrawide",
            "5000mAh battery with 65W fast charging",
            "Dual SIM 5G with eSIM support",
            "IP68 dust and water resistance"
        ],
        description: "Flagship performance without the flagship wait. The Nova X5 pairs a silky 120Hz screen with a camera system that stays sharp long after the sun goes down."
    },
    {
        id: "p5",
        title: "OptiCore D400 DSLR Camera Kit with 18-55mm Zoom Lens & Bag",
        category: "Electronics",
        price: 549.99,
        oldPrice: 649.99,
        rating: 4.6,
        reviews: 987,
        image: "assets/photos/camera.jpg",
        deal: false,
        prime: false,
        bullets: [
            "24.2MP APS-C CMOS sensor for detailed stills and Full HD video",
            "Includes 18-55mm image-stabilised zoom lens",
            "9-point autofocus with live view and articulating screen",
            "Comes with carry bag, 64GB card and spare battery",
            "Wi-Fi and Bluetooth for instant sharing"
        ],
        description: "Everything a new photographer needs in one box. Shoot sharp portraits, sweeping landscapes and buttery video straight out of the bag."
    },
    {
        id: "p6",
        title: "GlidePro Ergonomic Wireless Mouse, Silent Clicks, USB-C Rechargeable",
        category: "Electronics",
        price: 29.99,
        oldPrice: 39.99,
        rating: 4.3,
        reviews: 12043,
        image: "assets/photos/mouse.jpg",
        deal: true,
        prime: true,
        bullets: [
            "Ergonomic vertical design reduces wrist strain",
            "Silent micro-switches — click without the noise",
            "1600 DPI optical sensor with 3 adjustable levels",
            "USB-C rechargeable: 70 days per charge",
            "Bluetooth 5.0 + 2.4GHz USB receiver dual mode"
        ],
        description: "A mouse that works as hard as you do. Silent clicks keep meetings polite while the contoured shape keeps long sessions comfortable."
    },
    {
        id: "p7",
        title: "Xbox Series X/S Wireless Controller with Hall-Effect Joysticks and Back Paddles",
        category: "Gaming",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.7,
        reviews: 6543,
        image: "assets/controller.webp",
        deal: true,
        prime: true,
        bullets: [
            "Hall-effect joysticks — drift free for life",
            "Low-latency 2.4GHz wireless + Bluetooth 5.2",
            "Programmable back paddles and hair-trigger locks",
            "16-hour battery with USB-C fast charge",
            "Works with PC, Switch, mobile and tablet"
        ],
        description: "Tournament-grade control without the wired clutter. Anti-drift sticks and adjustable triggers give you the edge in fast-paced games."
    },
    {
        id: "p8",
        title: "MechKey RGB Mechanical Gaming Keyboard, Hot-Swappable, TKL Layout",
        category: "Gaming",
        price: 89.99,
        oldPrice: null,
        rating: 4.6,
        reviews: 3210,
        image: "assets/photos/keyboard.jpg",
        deal: false,
        prime: true,
        bullets: [
            "Hot-swappable sockets — change switches without soldering",
            "Pre-lubed linear switches for a smooth typing feel",
            "Per-key RGB with on-board memory profiles",
            "Aircraft-grade aluminium top plate, detachable USB-C cable",
            "NKRO over USB for perfect simultaneous key presses"
        ],
        description: "A compact tenkeyless layout that leaves more room for your mouse while keeping every keystroke fast, smooth and fully customisable."
    },
    {
        id: "p9",
        title: "BrewMaster 12-Cup Programmable Drip Coffee Maker with Thermal Carafe",
        category: "Home & Kitchen",
        price: 74.95,
        oldPrice: 94.95,
        rating: 4.5,
        reviews: 4521,
        image: "assets/photos/coffeemaker.jpg",
        deal: false,
        prime: true,
        bullets: [
            "12-cup double-walled thermal carafe keeps coffee hot for hours",
            "24-hour programmable timer — wake up to fresh coffee",
            "Strength selector from mild to bold",
            "Reusable gold-tone filter included",
            "Self-cleaning cycle and brew-pause feature"
        ],
        description: "Café-quality coffee at home without the café queue. Set it the night before and drift into a fresh pot every morning."
    },
    {
        id: "p10",
        title: "EchoNest Smart Bluetooth Speaker with 360° Sound and Voice Assistant",
        category: "Home & Kitchen",
        price: 49.99,
        oldPrice: 69.99,
        rating: 4.4,
        reviews: 9012,
        image: "assets/photos/speaker.jpg",
        deal: true,
        prime: true,
        bullets: [
            "360-degree room-filling sound with a passive bass radiator",
            "Built-in voice assistant for music, timers and smart home control",
            "Stereo pairing: link two speakers for wider sound",
            "Fabric-wrapped design in three living-room colours",
            "Bluetooth 5.3 and Wi-Fi streaming"
        ],
        description: "Ask for a song, a recipe or the weather — the EchoNest fills the whole room with sound while looking right at home on any shelf."
    },
    {
        id: "p11",
        title: "StrideFlow Men's Running Sneakers, Breathable Mesh, Cushioned Sole",
        category: "Fashion",
        price: 79.99,
        oldPrice: null,
        rating: 4.2,
        reviews: 2101,
        image: "assets/photos/sneakers.jpg",
        deal: false,
        prime: false,
        bullets: [
            "Engineered knit mesh keeps feet cool on long runs",
            "Responsive foam midsole with 8mm drop",
            "Durable rubber outsole with flex grooves",
            "Reflective heel detail for low-light visibility",
            "Available in sizes 39-46"
        ],
        description: "From first mile to marathon taper, the StrideFlow cushions every stride while the breathable upper keeps things light."
    },
    {
        id: "p12",
        title: "SummitShell Men's Water-Resistant Outdoor Jacket with Hood",
        category: "Fashion",
        price: 99.5,
        oldPrice: 129.0,
        rating: 4.5,
        reviews: 860,
        image: "assets/photos/jacket.jpg",
        deal: false,
        prime: true,
        bullets: [
            "Water-repellent ripstop shell with taped seams",
            "Adjustable storm hood with structured brim",
            "Two zip pockets + internal media pocket",
            "Packable into its own chest pocket",
            "Mesh lining for breathability"
        ],
        description: "Light enough for a breeze, tough enough for a downpour. The SummitShell layers over anything and packs away when the sky clears."
    },
    {
        id: "p13",
        title: "GlowLab Vitamin C Brightening Skincare Set — Cleanser, Serum & Cream",
        category: "Beauty",
        price: 34.99,
        oldPrice: 44.99,
        rating: 4.6,
        reviews: 1876,
        image: "assets/photos/skincare.jpg",
        deal: true,
        prime: true,
        bullets: [
            "15% stabilised Vitamin C serum brightens and evens skin tone",
            "Gentle foaming cleanser with hyaluronic acid",
            "Day cream with SPF 30 mineral protection",
            "Dermatologist tested, suitable for sensitive skin",
            "Cruelty free and paraben free"
        ],
        description: "A complete three-step routine that fades dark spots and boosts glow. Visible results in as little as four weeks."
    },
    {
        id: "p14",
        title: "IronGrip Adjustable Dumbbell Pair 5-40 lb with Quick-Select Dials",
        category: "Fitness",
        price: 129.99,
        oldPrice: 169.99,
        rating: 4.7,
        reviews: 1432,
        image: "assets/photos/dumbbells.jpg",
        deal: true,
        prime: true,
        bullets: [
            "Replaces 15 pairs of dumbbells — 5 to 40 lb per hand",
            "Turn the dial to change weight in under 2 seconds",
            "Anti-roll hex plates with steel selector rods",
            "Includes storage trays for clean reps and safe changes",
            "Great for home HIIT, strength and circuit training"
        ],
        description: "A full rack of weights in the space of one pair. Dial up your next set mid-circuit without ever stopping to load a plate."
    }
];

// Departments shown in the search dropdown / filters
const CATEGORIES = [
    "All Departments",
    "Electronics",
    "Gaming",
    "Home & Kitchen",
    "Fashion",
    "Beauty",
    "Fitness"
];

// ---------- helpers built on top of the catalog ----------

function getProduct(id) {
    return PRODUCTS.find(p => p.id === id) || null;
}

function formatPrice(value) {
    return "$" + Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function starsHtml(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let html = '<span class="stars">';
    for (let i = 0; i < 5; i++) {
        if (i < full) {
            html += '<i class="fa-solid fa-star"></i>';
        } else if (i === full && half) {
            html += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            html += '<i class="fa-regular fa-star"></i>';
        }
    }
    html += "</span>";
    return html;
}

// Card markup shared by home rows and search results
function productCardHtml(p) {
    const oldPrice = p.oldPrice
        ? `<span class="card-old-price">${formatPrice(p.oldPrice)}</span>`
        : "";
    const dealBadge = p.deal ? '<span class="deal-badge">Limited time deal</span>' : "";
    const primeTag = p.prime
        ? '<div class="prime-line"><span class="prime-check">✓</span> Prime</div>'
        : "";
    return `
        <div class="box product-card" data-id="${p.id}">
            <div class="box-content">
                ${dealBadge}
                <a class="product-link" href="product.html?id=${p.id}">
                    <div class="box-img" style="background-image: url('${p.image}');"></div>
                    <h2 class="card-title">${p.title}</h2>
                </a>
                <div class="card-rating">${starsHtml(p.rating)} <span class="rating-count">${p.reviews.toLocaleString("en-US")}</span></div>
                <div class="card-price">
                    <span class="card-current-price">${formatPrice(p.price)}</span> ${oldPrice}
                </div>
                ${primeTag}
                <button class="add-to-cart-btn" data-add="${p.id}">Add to Cart</button>
            </div>
        </div>`;
}
