/* ═══════════════════════════════════════════════════════════════════════
   Inventory Manager — Capstone JavaScript
   ─────────────────────────────────────────
   This capstone project integrates every concept covered in Assignments 1-6:
     • Variables & Data Types      (const, let, var, typeof)
     • Operators                   (arithmetic, assignment, comparison)
     • Control Flow                (if/else, switch, ternary)
     • Loops                       (for, while, do…while, break, continue)
     • Functions                   (standard, arrow, default params, scope)
     • Array Methods               (forEach, filter, map, push)
   ═══════════════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────
//  1 · VARIABLES & DATA TYPES  (Assignment 1)
// ───────────────────────────────────────────────
const APP_NAME = "Inventory Manager";       // string  – immutable app name
let inventory = [];                         // array   – mutable product list
var nextId = 1;                             // number  – legacy var for auto-ID

// Seed data — demonstrates object literals inside an array
const seedProducts = [
    { name: "Laptop",          price: 899.99,  qty: 5  },
    { name: "Wireless Mouse",  price: 29.99,   qty: 25 },
    { name: "Mechanical Keyboard", price: 74.50, qty: 12 },
    { name: "USB-C Hub",       price: 45.00,   qty: 18 },
    { name: "4K Monitor",      price: 549.00,  qty: 3  }
];

// ───────────────────────────────────────────────
//  CONSOLE LOG MIRROR  (renders in-page console)
// ───────────────────────────────────────────────
const consoleEl = document.getElementById("console-output");

function logToPage(message, type = "normal") {
    const line = document.createElement("div");
    line.className = "log-line";
    if (type === "header") line.classList.add("log-header");
    if (type === "warn")   line.classList.add("log-warn");
    if (type === "error")  line.classList.add("log-error");
    line.textContent = message;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
    // Also mirror to browser console
    console.log(message);
}

// ───────────────────────────────────────────────
//  2 · OPERATORS  (Assignment 2)
// ───────────────────────────────────────────────

/**
 * Calculates the line-total for a product.
 * Demonstrates: arithmetic (*), comparison (>=), assignment (+=).
 */
function calculateLineTotal(price, qty) {
    let lineTotal = price * qty;            // arithmetic: multiplication
    let discount = 0;

    // Bulk discount: 10% off when qty >= 10 (comparison operator)
    if (qty >= 10) {
        discount = lineTotal * 0.10;        // arithmetic: percentage
        lineTotal -= discount;              // compound assignment: -=
    }

    return { lineTotal, discount };
}

// ───────────────────────────────────────────────
//  3 · CONTROL FLOW  (Assignment 3)
// ───────────────────────────────────────────────

/**
 * Classifies a product into a category.
 * Demonstrates: if/else, switch, and ternary operator.
 */
function classifyProduct(price) {
    let category;

    // if…else chain
    if (price >= 500) {
        category = "Premium";
    } else if (price >= 50) {
        category = "Standard";
    } else {
        category = "Budget";
    }

    // switch verification (mirrors the if/else above)
    switch (true) {
        case price >= 500: category = "Premium";  break;
        case price >= 50:  category = "Standard"; break;
        default:           category = "Budget";   break;
    }

    return category;
}

/** Returns the CSS badge class for a category (ternary chain). */
const getBadgeClass = (cat) =>
    cat === "Premium"  ? "badge-premium"
  : cat === "Standard" ? "badge-standard"
  :                      "badge-budget";

// ───────────────────────────────────────────────
//  4 · LOOPS  (Assignment 4)
// ───────────────────────────────────────────────

/**
 * Seeds the inventory array using a for-loop with continue.
 * Demonstrates: for, continue, break.
 */
function seedInventory() {
    for (let i = 0; i < seedProducts.length; i++) {
        const p = seedProducts[i];

        // continue: skip any product with qty of 0 (none here, but pattern shown)
        if (p.qty <= 0) continue;

        inventory.push({
            id: nextId++,       // post-increment operator
            name: p.name,
            price: p.price,
            qty: p.qty,
            category: classifyProduct(p.price)
        });
    }

    logToPage(`=== ${APP_NAME} Initialized ===`, "header");
    logToPage(`Loaded ${inventory.length} seed products via for-loop with continue guard.`);
}

// ───────────────────────────────────────────────
//  5 · FUNCTIONS  (Assignment 5)
// ───────────────────────────────────────────────

/** Standard function with default parameters */
function addProduct(name = "Unnamed", price = 0, qty = 1) {
    // Scope demonstration: these variables are block-scoped to this function
    let trimmedName = name.trim();

    if (trimmedName === "" || price <= 0 || qty <= 0) {
        showMessage("Please fill in all fields with valid values.", "error");
        logToPage(`[ERROR] Invalid input: name="${trimmedName}", price=${price}, qty=${qty}`, "error");
        return false;
    }

    // Check for duplicate names (case-insensitive)
    const duplicate = inventory.find(
        item => item.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) {
        showMessage(`"${trimmedName}" already exists. Use a different name.`, "error");
        logToPage(`[WARN] Duplicate blocked: "${trimmedName}"`, "warn");
        return false;
    }

    const product = {
        id: nextId++,
        name: trimmedName,
        price: parseFloat(price),
        qty: parseInt(qty, 10),
        category: classifyProduct(price)
    };

    inventory.push(product);    // Array mutator: push

    logToPage(`[ADD] "${product.name}" | $${product.price} × ${product.qty} → Category: ${product.category}`);
    showMessage(`✅ "${product.name}" added successfully!`, "success");
    return true;
}

/** Arrow function — removes a product by ID */
const removeProduct = (id) => {
    const idx = inventory.findIndex(item => item.id === id);
    if (idx === -1) return;

    const removed = inventory.splice(idx, 1)[0];
    logToPage(`[DELETE] Removed "${removed.name}" (ID: ${removed.id})`);
    renderInventory();
    updateAnalytics();
};

// ───────────────────────────────────────────────
//  6 · ARRAY METHODS  (Assignment 6)
// ───────────────────────────────────────────────

/** Renders the inventory table — uses forEach */
function renderInventory() {
    const tbody = document.getElementById("inventory-body");
    const emptyState = document.getElementById("empty-state");
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filterCat  = document.getElementById("filter-category").value;

    // filter: narrow by search term and category
    const filtered = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = filterCat === "all" || item.category === filterCat;
        return matchesSearch && matchesCategory;
    });

    tbody.innerHTML = "";

    if (filtered.length === 0) {
        emptyState.classList.remove("hidden");
        emptyState.textContent = inventory.length === 0
            ? "No products in inventory. Add one above! 🚀"
            : "No products match your search/filter. 🔍";
        return;
    }

    emptyState.classList.add("hidden");

    // forEach: iterate and build table rows
    filtered.forEach((item, index) => {
        const { lineTotal, discount } = calculateLineTotal(item.price, item.qty);
        const badgeClass = getBadgeClass(item.category);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>$${lineTotal.toFixed(2)}${discount > 0 ? ` <small style="color:var(--green)">(-10%)</small>` : ""}</td>
            <td><span class="badge ${badgeClass}">${item.category}</span></td>
            <td><button class="btn btn-delete" data-id="${item.id}">✕ Remove</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Attach delete handlers
    tbody.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => removeProduct(Number(btn.dataset.id)));
    });
}

/** Updates analytics cards — uses map, filter, reduce */
function updateAnalytics() {
    const totalItems = inventory.length;

    // map: extract line totals
    const lineTotals = inventory.map(item => {
        const { lineTotal } = calculateLineTotal(item.price, item.qty);
        return lineTotal;
    });

    // reduce (via for-loop for clarity & Assignment 4 demonstration)
    let totalValue = 0;
    for (let i = 0; i < lineTotals.length; i++) {
        totalValue += lineTotals[i];
    }

    // while loop: find the most expensive product
    let mostExpensive = "—";
    if (inventory.length > 0) {
        let maxPrice = 0;
        let idx = 0;
        while (idx < inventory.length) {
            if (inventory[idx].price > maxPrice) {
                maxPrice = inventory[idx].price;
                mostExpensive = inventory[idx].name;
            }
            idx++;
        }
    }

    // Average price (ternary)
    const avgPrice = totalItems > 0 ? totalValue / totalItems : 0;

    // Update DOM
    document.getElementById("val-total-items").textContent = totalItems;
    document.getElementById("val-total-value").textContent = `$${totalValue.toFixed(2)}`;
    document.getElementById("val-avg-price").textContent = `$${avgPrice.toFixed(2)}`;
    document.getElementById("val-most-expensive").textContent = mostExpensive;

    // Log analytics
    logToPage("--- Financial Analytics ---", "header");
    logToPage(`Total Items: ${totalItems} | Total Value: $${totalValue.toFixed(2)} | Avg: $${avgPrice.toFixed(2)} | Top: ${mostExpensive}`);

    // map: build formatted report
    const report = inventory.map(item => `${item.name.toUpperCase()}: $${item.price}`);
    logToPage(`Report: [${report.map(r => `"${r}"`).join(", ")}]`);
}

// ───────────────────────────────────────────────
//  UI HELPERS
// ───────────────────────────────────────────────

/** Shows a temporary success/error message */
function showMessage(text, type) {
    const msgEl = document.getElementById("form-message");
    msgEl.textContent = text;
    msgEl.className = `message ${type}`;
    msgEl.classList.remove("hidden");

    // Auto-hide after 3 seconds — demonstrates setTimeout (bonus)
    setTimeout(() => {
        msgEl.classList.add("hidden");
    }, 3000);
}

// ───────────────────────────────────────────────
//  SCOPE DEMONSTRATION  (Assignment 5 bonus)
// ───────────────────────────────────────────────

function demonstrateScope() {
    logToPage("--- Scope Demonstration ---", "header");

    try {
        {
            let blockScoped = "I am block-scoped (let)";
            logToPage(`Inside block: ${blockScoped}`);
        }
        // Accessing blockScoped outside its block throws ReferenceError
        // noinspection JSUnresolvedVariable
        logToPage(blockScoped);     // eslint-disable-line no-undef
    } catch (error) {
        logToPage(`Scope Test: ${error.name}: ${error.message}`, "warn");
    }

    // var vs let
    var funcScoped = "I am function-scoped (var)";
    logToPage(`Function scope: ${funcScoped}`);
}

// ───────────────────────────────────────────────
//  DO…WHILE DEMONSTRATION  (Assignment 4 bonus)
// ───────────────────────────────────────────────

function demonstrateDoWhile() {
    logToPage("--- Do…While Loop ---", "header");
    let count = 0;
    do {
        count++;
        if (count % 2 === 0) {
            logToPage(`  Count ${count}: even — skipping via continue logic`);
            continue;
        }
        logToPage(`  Count ${count}: odd — processing`);
    } while (count < 5);
}

// ───────────────────────────────────────────────
//  EVENT LISTENERS & INITIALISATION
// ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    // Seed inventory
    seedInventory();

    // Run demonstrations
    demonstrateScope();
    demonstrateDoWhile();

    // Initial render
    renderInventory();
    updateAnalytics();

    // Form submit
    document.getElementById("product-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput  = document.getElementById("product-name");
        const priceInput = document.getElementById("product-price");
        const qtyInput   = document.getElementById("product-qty");

        const success = addProduct(nameInput.value, priceInput.value, qtyInput.value);

        if (success) {
            // Reset form
            nameInput.value  = "";
            priceInput.value = "";
            qtyInput.value   = "";
            nameInput.focus();

            renderInventory();
            updateAnalytics();
        }
    });

    // Live search
    document.getElementById("search-input").addEventListener("input", renderInventory);

    // Category filter
    document.getElementById("filter-category").addEventListener("change", renderInventory);

    logToPage(`\n✅ ${APP_NAME} is ready.`, "header");
});
