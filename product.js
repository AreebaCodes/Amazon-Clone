// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const product = getProduct(id);
    const page = document.getElementById("product-page");

    if (!product) {
        page.innerHTML = `
            <div class="empty-state">
                <h2>Sorry, we couldn't find that product</h2>
                <p>It may have been removed. <a href="search.html">Continue shopping</a>.</p>
            </div>`;
        return;
    }

    document.title = `${product.title} — Amazon Clone`;

    const oldPrice = product.oldPrice
        ? `<span class="pdp-old-price">${formatPrice(product.oldPrice)}</span>
           <span class="pdp-save">Save ${formatPrice(product.oldPrice - product.price)} (${Math.round((1 - product.price / product.oldPrice) * 100)}%)</span>`
        : "";

    const primeTag = product.prime
        ? `<div class="prime-line"><span class="prime-check">✓</span> <strong>Prime</strong> FREE delivery available</div>`
        : `<div class="delivery-line">FREE delivery in 5-7 days</div>`;

    const deliveryDate = new Date(Date.now() + 2 * 86400000)
        .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

    page.innerHTML = `
        <div class="breadcrumb"><a href="index.html">Home</a> &gt;
            <a href="search.html?category=${encodeURIComponent(product.category)}">${product.category}</a> &gt;
            <span>${product.title.split(",")[0]}</span>
        </div>

        <div class="pdp-layout">
            <!-- LEFT: image gallery -->
            <div class="pdp-gallery">
                <div class="pdp-main-img" style="background-image: url('${product.image}');"></div>
                <div class="pdp-thumbnails">
                    <div class="pdp-thumb active" style="background-image: url('${product.image}');"></div>
                    <div class="pdp-thumb" style="background-image: url('${product.image}'); transform: scale(0.85);"></div>
                    <div class="pdp-thumb" style="background-image: url('${product.image}'); filter: brightness(0.8);"></div>
                </div>
            </div>

            <!-- MIDDLE: title, rating, price -->
            <div class="pdp-info">
                <h1 class="pdp-title">${product.title}</h1>
                <a class="pdp-brand" href="search.html?q=${encodeURIComponent(product.title.split(" ")[0])}">Visit the ${product.title.split(" ")[0]} Store</a>
                <div class="pdp-rating">
                    ${starsHtml(product.rating)}
                    <span class="rating-count">${product.rating}</span>
                    <a href="#reviews" class="rating-link">${product.reviews.toLocaleString("en-US")} ratings</a>
                </div>
                <hr>
                <div class="pdp-price-block">
                    ${product.deal ? '<span class="deal-badge">Limited time deal</span>' : ""}
                    <div class="pdp-price-row">
                        <span class="pdp-current-price">${formatPrice(product.price)}</span>
                        ${oldPrice}
                    </div>
                </div>
                <hr>
                <ul class="pdp-bullets">
                    ${product.bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
                <div class="pdp-desc"><strong>About this item</strong><p>${product.description}</p></div>
            </div>

            <!-- RIGHT: buy box -->
            <div class="pdp-buybox">
                <div class="pdp-buybox-price">${formatPrice(product.price)}</div>
                <div class="delivery-line"><strong>FREE Returns</strong></div>
                ${primeTag}
                <div class="delivery-line">Order within <span class="countdown" id="countdown"></span> for <strong>delivery on ${deliveryDate}</strong></div>
                <div class="delivery-line ship-from">Ships from Amazon Clone · Sold by Amazon Clone</div>

                <select class="qty-select" id="qty-select">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<option value="${n}">Qty: ${n}</option>`).join("")}
                </select>

                <button class="add-to-cart-btn buybox-btn" data-add="${product.id}" data-use-qty>Add to Cart</button>
                <button class="buy-now-btn" id="buy-now-btn">Buy Now</button>

                <div class="delivery-line secure">🔒 Secure transaction</div>
                <hr>
                <table class="buybox-table">
                    <tr><td>Ships from</td><td>Amazon Clone</td></tr>
                    <tr><td>Sold by</td><td>Amazon Clone</td></tr>
                    <tr><td>Returns</td><td><a href="#" class="pdp-link">30-day refund</a></td></tr>
                </table>
            </div>
        </div>

        <div class="pdp-reviews" id="reviews">
            <h2>Customer reviews</h2>
            <div class="review-summary">
                ${starsHtml(product.rating)}
                <span class="rating-count">${product.rating} out of 5</span>
                <p>${product.reviews.toLocaleString("en-US")} global ratings</p>
                <div class="review-bars">
                    ${[5, 4, 3, 2, 1].map(star => {
                        const pct = star === 5 ? 68 : star === 4 ? 19 : star === 3 ? 7 : star === 2 ? 3 : 3;
                        return `<div class="review-bar-row">
                            <span>${star} star</span>
                            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
                            <span>${pct}%</span>
                        </div>`;
                    }).join("")}
                </div>
            </div>
        </div>
    `;

    // Buy Now → adds to cart and jumps straight to checkout
    document.getElementById("buy-now-btn").addEventListener("click", () => {
        const qty = parseInt(document.getElementById("qty-select").value, 10);
        CartStore.add(product.id, qty);
        window.location.href = "checkout.html";
    });

    // countdown to the 11pm same-day dispatch cutoff
    const countdownEl = document.getElementById("countdown");
    function tick() {
        const now = new Date();
        const cutoff = new Date(now);
        cutoff.setHours(23, 0, 0, 0);
        let diff = Math.max(0, cutoff - now);
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        countdownEl.textContent = `${h}h ${m}m ${s}s`;
    }
    tick();
    setInterval(tick, 1000);

    // related products from same category, then fill from others
    const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category);
    while (related.length < 5) {
        const extra = PRODUCTS.find(p => p.id !== product.id && !related.includes(p));
        if (!extra) break;
        related.push(extra);
    }
    document.getElementById("related-row").innerHTML =
        related.slice(0, 5).map(productCardHtml).join("");
});
