// ============================================================
// CART PAGE — line items, quantity controls, subtotal sidebar
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const page = document.getElementById("cart-page");

    function render() {
        const items = CartStore.items();

        if (items.length === 0) {
            page.innerHTML = `
                <div class="cart-panel">
                    <h1>Your Amazon Clone Cart</h1>
                    <p class="empty-cart-msg">Your cart is empty.</p>
                    <a href="search.html" class="continue-link">Continue shopping</a>
                </div>`;
            return;
        }

        const subtotal = CartStore.subtotal();
        const freeShip = subtotal >= 35;

        page.innerHTML = `
        <div class="cart-layout">
            <div class="cart-panel">
                <h1>Your Amazon Clone Cart</h1>
                <div class="cart-price-header">Price</div>
                ${items.map(({ product, qty }) => `
                    <div class="cart-item" data-id="${product.id}">
                        <div class="cart-item-img" style="background-image: url('${product.image}');"></div>
                        <div class="cart-item-info">
                            <a href="product.html?id=${product.id}" class="cart-item-title">${product.title}</a>
                            <div class="cart-item-stock in-stock">In Stock</div>
                            <div class="cart-item-actions">
                                <label>Qty:
                                    <select class="qty-select-inline" data-qty="${product.id}">
                                        ${[1,2,3,4,5,6,7,8,9,10].map(n =>
                                            `<option value="${n}"${n === qty ? " selected" : ""}>${n}</option>`).join("")}
                                    </select>
                                </label>
                                <span class="action-divider">|</span>
                                <button class="link-btn" data-remove="${product.id}">Delete</button>
                                <span class="action-divider">|</span>
                                <button class="link-btn" data-save="${product.id}">Save for later</button>
                            </div>
                        </div>
                        <div class="cart-item-price">${formatPrice(product.price * qty)}</div>
                    </div>`).join("")}
                <div class="cart-free-note">Eligible for FREE Shipping on orders over $35.00</div>
            </div>

            <div class="cart-side">
                <div class="cart-subtotal">
                    ${freeShip
                        ? '<p class="free-ship-ok">✓ Your order qualifies for FREE Shipping.</p>'
                        : `<p class="free-ship-note">Add <strong>${formatPrice(35 - subtotal)}</strong> of eligible items to qualify for FREE Shipping.</p>`}
                    <p class="subtotal-line">Subtotal (${CartStore.count()} item${CartStore.count() === 1 ? "" : "s"}): <strong>${formatPrice(subtotal)}</strong></p>
                    <button class="proceed-btn" id="proceed-btn">Proceed to checkout</button>
                </div>
            </div>
        </div>`;

        page.querySelectorAll("[data-qty]").forEach(sel => {
            sel.addEventListener("change", () => {
                CartStore.setQty(sel.getAttribute("data-qty"), parseInt(sel.value, 10));
                render();
            });
        });
        page.querySelectorAll("[data-remove]").forEach(btn => {
            btn.addEventListener("click", () => {
                CartStore.remove(btn.getAttribute("data-remove"));
                render();
            });
        });
        page.querySelectorAll("[data-save]").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-save");
                const saved = JSON.parse(localStorage.getItem("amazon_clone_saved") || "[]");
                if (!saved.includes(id)) saved.push(id);
                localStorage.setItem("amazon_clone_saved", JSON.stringify(saved));
                CartStore.remove(id);
                render();
            });
        });
        document.getElementById("proceed-btn").addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }

    render();
});
