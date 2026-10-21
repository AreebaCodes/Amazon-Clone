// ============================================================
// SHARED APP LAYER — icons, layout, cart store, auth session
// Loaded by every page after data.js
// ============================================================

// ---------- inline SVG icons (no external icon-font dependency) ----------
const ICONS = {
    location: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM1 2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 7 17h12v-2H7.42a.25.25 0 0 1-.22-.37L8.1 13h7.45a2 2 0 0 0 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2zM17 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/></svg>`,
    bars: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>`,
    caret: `<svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>`,
    user: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.34 0-10 1.67-10 5v2h20v-2c0-3.33-6.66-5-10-5z"/></svg>`
};

// ---------- cart store (persisted in localStorage) ----------
const CartStore = {
    KEY: "amazon_clone_cart",

    read() {
        try {
            const raw = localStorage.getItem(this.KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    },

    write(cart) {
        localStorage.setItem(this.KEY, JSON.stringify(cart));
        updateCartBadge();
    },

    items() {
        const cart = this.read();
        return Object.keys(cart)
            .filter(id => getProduct(id) && cart[id] > 0)
            .map(id => ({ product: getProduct(id), qty: cart[id] }));
    },

    count() {
        return this.items().reduce((sum, it) => sum + it.qty, 0);
    },

    subtotal() {
        return this.items().reduce((sum, it) => sum + it.product.price * it.qty, 0);
    },

    add(id, qty = 1) {
        const cart = this.read();
        cart[id] = (cart[id] || 0) + qty;
        this.write(cart);
    },

    setQty(id, qty) {
        const cart = this.read();
        if (qty <= 0) {
            delete cart[id];
        } else {
            cart[id] = qty;
        }
        this.write(cart);
    },

    remove(id) {
        const cart = this.read();
        delete cart[id];
        this.write(cart);
    },

    clear() {
        localStorage.removeItem(this.KEY);
        updateCartBadge();
    }
};

function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = CartStore.count();
}

// ---------- auth session (mock sign-in persisted in localStorage) ----------
const Auth = {
    KEY: "amazon_clone_user",

    getUser() {
        try {
            const raw = localStorage.getItem(this.KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    signIn(name, email) {
        localStorage.setItem(this.KEY, JSON.stringify({ name, email }));
        renderHeaderGreeting();
    },

    signOut() {
        localStorage.removeItem(this.KEY);
        renderHeaderGreeting();
    }
};

function renderHeaderGreeting() {
    const slot = document.querySelector("#site-header .nav-signin span");
    if (!slot) return;
    const user = Auth.getUser();
    slot.textContent = user ? `Hello, ${user.name.split(" ")[0]}` : "Hello, sign in";
}

// ---------- header & footer injected on every page ----------
function renderHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    const catOptions = CATEGORIES.map(c =>
        `<option${c === "All Departments" ? " selected" : ""}>${c}</option>`
    ).join("");

    mount.innerHTML = `
    <div class="navbar">
        <a class="nav-logo border" href="index.html" aria-label="Home">
            <img src="assets/logo.svg" alt="amazon clone" class="logo-img">
        </a>

        <div class="nav-address border" id="address-btn">
            <p class="add-first">Deliver to</p>
            <div class="add-icon">
                ${ICONS.location}
                <p class="add-second">Pakistan</p>
            </div>
        </div>

        <form class="nav-search" id="nav-search-form">
            <select class="search-select" id="search-category">${catOptions}</select>
            <input placeholder="Search Amazon Clone" class="search-input" type="text" id="search-input-field" autocomplete="off">
            <button class="search-icon" type="submit" aria-label="Search">${ICONS.search}</button>
        </form>

        <a class="nav-signin border plain-link" href="signin.html" id="signin-btn">
            <p><span>Hello, sign in</span></p>
            <p class="nav-second">Account &amp; Lists ${ICONS.caret}</p>
        </a>

        <a class="nav-return border plain-link" href="cart.html#orders">
            <p><span>Returns</span></p>
            <p class="nav-second">&amp; Orders</p>
        </a>

        <a class="nav-cart border plain-link" href="cart.html">
            <div class="cart-icon-container">
                <span id="cart-count">0</span>
                ${ICONS.cart}
            </div>
            <span class="cart-text">Cart</span>
        </a>
    </div>

    <div class="panel">
        <a class="panel-all border plain-link" href="search.html">${ICONS.bars} All</a>
        <div class="panel-ops">
            <a class="border clickable-panel plain-link" href="search.html?deals=1">Today's Deals</a>
            <a class="border clickable-panel plain-link" href="search.html?category=Electronics">Electronics</a>
            <a class="border clickable-panel plain-link" href="search.html?category=Gaming">Gaming</a>
            <a class="border clickable-panel plain-link" href="search.html?category=Home%20%26%20Kitchen">Home &amp; Kitchen</a>
            <a class="border clickable-panel plain-link" href="search.html?category=Fashion">Fashion</a>
        </div>
        <a class="panel-deals border plain-link" href="search.html?deals=1">Shop today's deals</a>
    </div>`;

    renderHeaderGreeting();
    updateCartBadge();
    wireHeaderSearch();
}

function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.innerHTML = `
    <div class="foot-panel1" id="backToTop">Back to top</div>
    <div class="foot-panel2">
        <ul>
            <p>Get to Know Us</p>
            <a href="#" class="footer-link">Careers</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">About Amazon Clone</a>
        </ul>
        <ul>
            <p>Make Money with Us</p>
            <a href="#" class="footer-link">Sell products on Amazon Clone</a>
            <a href="#" class="footer-link">Become an Affiliate</a>
            <a href="#" class="footer-link">Advertise Your Products</a>
        </ul>
        <ul>
            <p>Let Us Help You</p>
            <a href="cart.html" class="footer-link">Your Cart</a>
            <a href="signin.html" class="footer-link">Your Account</a>
            <a href="#" class="footer-link">Help</a>
        </ul>
    </div>
    <div class="foot-panel3">
        <img src="assets/logo.svg" alt="amazon clone" class="footer-logo">
    </div>`;

    document.getElementById("backToTop").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    mount.querySelectorAll(".footer-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            alert(`"${link.textContent.trim()}" is not available in this clone demo.`);
        });
    });
}

function wireHeaderSearch() {
    const form = document.getElementById("nav-search-form");
    const input = document.getElementById("search-input-field");
    const select = document.getElementById("search-category");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (input.value.trim()) params.set("q", input.value.trim());
        if (select.value !== "All Departments") params.set("category", select.value);
        const qs = params.toString();
        window.location.href = "search.html" + (qs ? "?" + qs : "");
    });
}

// ---------- shared bootstrap ----------
document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();

    // universal "Add to Cart" behaviour on any page (cards, product page, etc.)
    document.body.addEventListener("click", e => {
        const btn = e.target.closest("[data-add]");
        if (!btn) return;
        e.preventDefault();
        const id = btn.getAttribute("data-add");
        const qtyInput = document.getElementById("qty-select");
        const qty = btn.hasAttribute("data-use-qty") && qtyInput ? parseInt(qtyInput.value, 10) : 1;
        CartStore.add(id, qty);
        flashAdded(btn);
    });

    const addressBtn = document.getElementById("address-btn");
    if (addressBtn) {
        addressBtn.addEventListener("click", () => {
            alert("Delivery location selector is not available in this clone demo.");
        });
    }
});

function flashAdded(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = "✓ Added to Cart";
    btn.classList.add("added");
    setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove("added");
    }, 1200);
}
