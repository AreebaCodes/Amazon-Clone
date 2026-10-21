// ============================================================
// SIGN IN PAGE — mock auth persisted in localStorage
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("signin-box");
    const user = Auth.getUser();

    document.getElementById("backToTop").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    if (user) {
        // signed in: account hub
        const orders = JSON.parse(localStorage.getItem("amazon_clone_orders") || "[]");
        const saved = JSON.parse(localStorage.getItem("amazon_clone_saved") || "[]");
        box.innerHTML = `
            <h1>Your Account</h1>
            <div class="account-hub">
                <div class="account-card">
                    <h2>Hello, ${user.name}</h2>
                    <p>${user.email}</p>
                    <p class="account-meta">Orders: ${orders.length} · Saved for later: ${saved.length} items · Cart: ${CartStore.count()} items</p>
                </div>
                <div class="account-card">
                    <h2>Your Orders</h2>
                    ${orders.length === 0
                        ? "<p>You haven't placed any orders yet.</p>"
                        : orders.slice().reverse().map(o => `
                            <div class="account-order">
                                <span>Order <strong>${o.id}</strong></span>
                                <span>${formatPrice(o.total)}</span>
                            </div>`).join("")}
                </div>
                <button class="signout-btn" id="signout-btn">Sign out</button>
            </div>`;
        document.getElementById("signout-btn").addEventListener("click", () => {
            Auth.signOut();
            location.reload();
        });
        return;
    }

    // signed out: login form
    box.innerHTML = `
        <h1>Sign in</h1>
        <form id="signin-form">
            <label for="signin-email">Email or mobile phone number</label>
            <input type="text" id="signin-email" autocomplete="username" required>

            <label for="signin-name">Your name (for the welcome message)</label>
            <input type="text" id="signin-name" autocomplete="name" required>

            <button class="signin-submit" type="submit">Continue</button>
        </form>
        <p class="signin-legal-text">By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice. This is a demo — no real account is created and nothing is sent anywhere.</p>
        <hr>
        <p class="signin-new">New to Amazon Clone?</p>
        <button class="signin-create-btn" id="create-account-btn">Create your Amazon Clone account</button>
    `;

    function doSignIn(e) {
        e.preventDefault();
        const email = document.getElementById("signin-email").value.trim();
        const name = document.getElementById("signin-name").value.trim();
        if (!email || !name) {
            alert("Please fill in both fields.");
            return;
        }
        Auth.signIn(name, email);
        window.location.href = "index.html";
    }

    document.getElementById("signin-form").addEventListener("submit", doSignIn);
    document.getElementById("create-account-btn").addEventListener("click", doSignIn);
});
