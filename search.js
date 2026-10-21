// ============================================================
// SEARCH PAGE — filtering, sorting, result rendering
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const state = {
        q: (params.get("q") || "").trim().toLowerCase(),
        category: params.get("category") || "All Departments",
        dealsOnly: params.get("deals") === "1",
        minRating: 0,
        primeOnly: false,
        sort: "featured"
    };

    // ---- category filter list ----
    const catBox = document.getElementById("category-filters");
    catBox.innerHTML = CATEGORIES.map(c => `
        <label class="filter-row">
            <input type="radio" name="category" value="${c}"${c === state.category ? " checked" : ""}> ${c}
        </label>
    `).join("");

    // ---- sync control state from URL ----
    document.getElementById("deal-only").checked = state.dealsOnly;

    // ---- wire controls ----
    catBox.addEventListener("change", e => {
        state.category = e.target.value;
        apply();
    });
    document.getElementById("rating-filters").addEventListener("change", e => {
        state.minRating = parseFloat(e.target.value);
        apply();
    });
    document.getElementById("deal-only").addEventListener("change", e => {
        state.dealsOnly = e.target.checked;
        apply();
    });
    document.getElementById("prime-only").addEventListener("change", e => {
        state.primeOnly = e.target.checked;
        apply();
    });
    document.getElementById("sort-select").addEventListener("change", e => {
        state.sort = e.target.value;
        apply();
    });

    function filterProducts() {
        let list = PRODUCTS.slice();

        if (state.q) {
            list = list.filter(p =>
                p.title.toLowerCase().includes(state.q) ||
                p.category.toLowerCase().includes(state.q) ||
                p.description.toLowerCase().includes(state.q)
            );
        }
        if (state.category !== "All Departments") {
            list = list.filter(p => p.category === state.category);
        }
        if (state.dealsOnly) list = list.filter(p => p.deal);
        if (state.primeOnly) list = list.filter(p => p.prime);
        if (state.minRating > 0) list = list.filter(p => p.rating >= state.minRating);

        switch (state.sort) {
            case "price-asc": list.sort((a, b) => a.price - b.price); break;
            case "price-desc": list.sort((a, b) => b.price - a.price); break;
            case "rating": list.sort((a, b) => b.rating - a.rating); break;
            case "reviews": list.sort((a, b) => b.reviews - a.reviews); break;
        }
        return list;
    }

    function apply() {
        const list = filterProducts();

        // banner text mirrors the classic results header
        const bits = [];
        if (state.q) bits.push(`"${state.q}"`);
        if (state.category !== "All Departments") bits.push(`in ${state.category}`);
        if (state.dealsOnly) bits.push("(Today's Deals)");
        document.getElementById("results-banner").innerHTML =
            `<span>1-${list.length}</span> of over ${Math.max(list.length * 1487, list.length)} results${bits.length ? " for " + bits.join(" ") : ""}`;

        document.getElementById("result-count").textContent =
            `${list.length} result${list.length === 1 ? "" : "s"}`;

        document.getElementById("results-grid").innerHTML =
            list.map(productCardHtml).join("");
        document.getElementById("empty-state").hidden = list.length > 0;
    }

    apply();
});
