// ============================================================
// CHECKOUT PAGE — address/payment form, order summary, place order
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const page = document.getElementById("checkout-page");

    // order confirmation view (after placing an order)
    const params = new URLSearchParams(window.location.search);
    if (params.get("placed") === "1") {
        const order = JSON.parse(sessionStorage.getItem("amazon_clone_last_order") || "{}");
        page.innerHTML = `
            <div class="order-confirmed">
                <div class="order-check">✓</div>
                <h1>Order placed, thank you!</h1>
                <p>Confirmation number: <strong>${order.id || "N/A"}</strong></p>
                <p>A confirmation email has been sent to <strong>${order.email || "your email"}</strong>.</p>
                <p class="delivery-eta">Estimated delivery: <strong>${order.eta || "in a few days"}</strong></p>
                <a href="index.html" class="continue-link">Continue shopping</a>
            </div>`;
        return;
    }

    const items = CartStore.items();
    if (items.length === 0) {
        page.innerHTML = `
            <div class="cart-panel">
                <h1>Your cart is empty — nothing to check out</h1>
                <a href="search.html" class="continue-link">Continue shopping</a>
            </div>`;
        return;
    }

    const subtotal = CartStore.subtotal();
    const shipping = subtotal >= 35 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const user = Auth.getUser();

    page.innerHTML = `
        <div class="checkout-steps">
            <span class="step">1 Shipping address</span>
            <span class="step">2 Payment method</span>
            <span class="step active">3 Review items</span>
        </div>

        <div class="checkout-layout">
            <div class="checkout-main">
                <div class="checkout-block">
                    <h2>1. Shipping address</h2>
                    ${user ? `<p class="checkout-user">Delivering to <strong>${user.name}</strong></p>` : ""}
                    <form id="address-form" class="checkout-form">
                        <input type="text" id="full-name" placeholder="Full name" required value="${user ? user.name : ""}">
                        <input type="text" id="address-line" placeholder="Address line 1" required>
                        <input type="text" id="city" placeholder="City" required>
                        <input type="text" id="postal" placeholder="Postal code" required>
                    </form>
                </div>

                <div class="checkout-block">
                    <h2>2. Payment method</h2>
                    <div class="pay-options">
                        <label class="pay-option"><input type="radio" name="pay" value="cod" checked> Cash on Delivery</label>
                        <label class="pay-option"><input type="radio" name="pay" value="card"> Credit / Debit card</label>
                    </div>
                    <div id="card-fields" hidden>
                        <form class="checkout-form">
                            <input type="text" id="card-number" placeholder="Card number (demo — any digits)" inputmode="numeric">
                            <div class="form-row">
                                <input type="text" id="card-exp" placeholder="MM/YY">
                                <input type="text" id="card-cvc" placeholder="CVC">
                            </div>
                        </form>
                    </div>
                </div>

                <div class="checkout-block">
                    <h2>3. Review items and shipping</h2>
                    <div class="checkout-items">
                        ${items.map(({ product, qty }) => `
                            <div class="checkout-item">
                                <div class="cart-item-img" style="background-image: url('${product.image}');"></div>
                                <div class="checkout-item-info">
                                    <div class="cart-item-title">${product.title}</div>
                                    <div class="cart-item-stock in-stock">In Stock</div>
                                    <div class="cart-item-actions">Qty: ${qty}</div>
                                </div>
                                <div class="cart-item-price">${formatPrice(product.price * qty)}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>

            <div class="checkout-side">
                <button class="place-order-btn" id="place-order-btn">Place your order</button>
                <div class="checkout-summary">
                    <div class="summary-row"><span>Items (${CartStore.count()}):</span><span>${formatPrice(subtotal)}</span></div>
                    <div class="summary-row"><span>Shipping:</span><span>${shipping === 0 ? '<span class="free">FREE</span>' : formatPrice(shipping)}</span></div>
                    <div class="summary-row"><span>Estimated tax:</span><span>${formatPrice(tax)}</span></div>
                    <div class="summary-row total"><span>Order total:</span><span>${formatPrice(total)}</span></div>
                </div>
            </div>
        </div>
    `;

    // toggle card fields
    document.querySelectorAll('input[name="pay"]').forEach(radio => {
        radio.addEventListener("change", () => {
            document.getElementById("card-fields").hidden =
                document.querySelector('input[name="pay"]:checked').value !== "card";
        });
    });

    // place order
    document.getElementById("place-order-btn").addEventListener("click", () => {
        const name = document.getElementById("full-name").value.trim();
        const address = document.getElementById("address-line").value.trim();
        const city = document.getElementById("city").value.trim();
        const postal = document.getElementById("postal").value.trim();

        if (!name || !address || !city || !postal) {
            alert("Please fill in every shipping address field before placing your order.");
            return;
        }
        const payMethod = document.querySelector('input[name="pay"]:checked').value;
        if (payMethod === "card") {
            const cardNo = document.getElementById("card-number").value.replace(/\s/g, "");
            if (cardNo.length < 12) {
                alert("Please enter a valid-looking card number (this is a demo — any 12+ digits work).");
                return;
            }
        }

        // build the order record
        const eta = new Date(Date.now() + 3 * 86400000)
            .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
        const order = {
            id: "D-" + Math.floor(100000000 + Math.random() * 900000000),
            email: user ? user.email : "guest@amazon-clone.demo",
            total: total,
            eta: eta
        };
        sessionStorage.setItem("amazon_clone_last_order", JSON.stringify(order));

        // tally order history, then empty the cart
        const history = JSON.parse(localStorage.getItem("amazon_clone_orders") || "[]");
        history.push({ ...order, placedAt: new Date().toISOString(), items: CartStore.items().map(i => ({ id: i.product.id, qty: i.qty })) });
        localStorage.setItem("amazon_clone_orders", JSON.stringify(history));
        CartStore.clear();

        window.location.href = "checkout.html?placed=1";
    });
});
