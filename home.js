// ============================================================
// HOME PAGE — category shortcuts + product rows
// ============================================================

// Category tiles shown on the home grid
const HOME_CATEGORIES = [
    { name: "Gaming Accessories", category: "Gaming", image: "assets/controller.webp" },
    { name: "Laptops & Tablets", category: "Electronics", image: "assets/photos/laptop.jpg" },
    { name: "Smart Watches", category: "Electronics", image: "assets/photos/smartwatch.jpg" },
    { name: "Headphones & Audio", category: "Electronics", image: "assets/photos/headphones.jpg" },
    { name: "Home & Kitchen", category: "Home & Kitchen", image: "assets/photos/coffeemaker.jpg" },
    { name: "Men's Fashion", category: "Fashion", image: "assets/photos/jacket.jpg" },
    { name: "Beauty & Skincare", category: "Beauty", image: "assets/photos/skincare.jpg" },
    { name: "Home Fitness Gear", category: "Fitness", image: "assets/photos/dumbbells.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    // --- category tiles ---
    const grid = document.getElementById("category-grid");
    grid.innerHTML = HOME_CATEGORIES.map(c => `
        <div class="box category-card">
            <div class="box-content">
                <h2>${c.name}</h2>
                <a href="search.html?category=${encodeURIComponent(c.category)}">
                    <div class="box-img" style="background-image: url('${c.image}');"></div>
                </a>
                <a class="see-more-link" href="search.html?category=${encodeURIComponent(c.category)}">Shop now</a>
            </div>
        </div>
    `).join("");

    // --- today's deals row ---
    const deals = PRODUCTS.filter(p => p.deal);
    document.getElementById("deals-row").innerHTML =
        deals.map(productCardHtml).join("");

    // --- recommended row (a spread of categories) ---
    const recommended = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[8], PRODUCTS[10], PRODUCTS[12]];
    document.getElementById("recommended-row").innerHTML =
        recommended.map(productCardHtml).join("");
});
