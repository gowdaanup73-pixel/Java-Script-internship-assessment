// Inventory Manager - Capstone Project
// Demonstrates core JS: variables, operators, conditionals, loops, functions, and array methods.

const APP_NAME = "Inventory Manager";
let inventory = [];
var nextId = 1; // using var here to demonstrate legacy var vs modern let/const

// starter inventory data
const seedProducts = [
    { name: "Laptop", price: 899.99, qty: 5 },
    { name: "Wireless Mouse", price: 29.99, qty: 25 },
    { name: "Mechanical Keyboard", price: 74.50, qty: 12 },
    { name: "USB-C Hub", price: 45.00, qty: 18 },
    { name: "4K Monitor", price: 549.00, qty: 3 }
];

// mirrors logs to both the browser console and the on-screen console panel
const consoleBox = document.getElementById("console-box");

function logToScreen(message, type = "normal") {
    if (!consoleBox) {
        console.log(message);
        return;
    }
    const line = document.createElement("div");
    line.className = "log-line";
    if (type === "header") line.classList.add("log-header");
    if (type === "warn") line.classList.add("log-warn");
    if (type === "error") line.classList.add("log-error");
    line.textContent = message;
    consoleBox.appendChild(line);
    consoleBox.scrollTop = consoleBox.scrollHeight;
    console.log(message);
}

// calculates item subtotal and applies a 10% discount for orders of 10 or more units
function calculateLineTotal(price, qty) {
    let lineTotal = price * qty;
    let discount = 0;

    // bulk discount check
    if (qty >= 10) {
        discount = lineTotal * 0.10;
        lineTotal -= discount;
    }

    return { lineTotal, discount };
}

// categorizes items based on price tier using if/else and verified with a switch
function classifyProduct(price) {
    let category = "Budget";

    if (price >= 500) {
        category = "Premium";
    } else if (price >= 50) {
        category = "Standard";
    } else {
        category = "Budget";
    }

    // validating with a switch expression
    switch (true) {
        case price >= 500:
            category = "Premium";
            break;
        case price >= 50:
            category = "Standard";
            break;
        default:
            category = "Budget";
            break;
    }

    return category;
}

// ternary operator to determine badge CSS class
const getBadgeClass = (cat) =>
    cat === "Premium" ? "badge-premium" :
    cat === "Standard" ? "badge-standard" :
    "badge-budget";

// populate initial products using a for loop with continue guard
function seedInventory() {
    for (let i = 0; i < seedProducts.length; i++) {
        const item = seedProducts[i];

        // skip invalid/zero quantity entries
        if (item.qty <= 0) continue;

        inventory.push({
            id: nextId++,
            name: item.name,
            price: item.price,
            qty: item.qty,
            category: classifyProduct(item.price)
        });
    }

    logToScreen(`=== ${APP_NAME} Initialized ===`, "header");
    logToScreen(`Loaded ${inventory.length} initial items into inventory.`);
}

// adds a new product with default parameters and validation
function addProduct(name = "Unnamed", price = 0, qty = 1) {
    const cleanName = name.trim();
    const numPrice = parseFloat(price);
    const numQty = parseInt(qty, 10);

    if (!cleanName || isNaN(numPrice) || isNaN(numQty) || numPrice <= 0 || numQty <= 0) {
        showFeedback("Please enter a valid product name, price, and quantity.", "error");
        logToScreen(`[ERROR] Invalid product input: "${cleanName}", $${price}, qty:${qty}`, "error");
        return false;
    }

    // check for duplicate product name (case-insensitive)
    const duplicate = inventory.find(
        p => p.name.toLowerCase() === cleanName.toLowerCase()
    );
    if (duplicate) {
        showFeedback(`"${cleanName}" is already in inventory.`, "error");
        logToScreen(`[WARN] Duplicate prevented: "${cleanName}"`, "warn");
        return false;
    }

    const product = {
        id: nextId++,
        name: cleanName,
        price: numPrice,
        qty: numQty,
        category: classifyProduct(numPrice)
    };

    inventory.push(product);
    logToScreen(`[ADD] "${product.name}" | $${product.price} x ${product.qty} (${product.category})`);
    showFeedback(`Added "${product.name}" successfully!`, "success");
    return true;
}

// arrow function to remove an item by id
const removeProduct = (id) => {
    const index = inventory.findIndex(item => item.id === id);
    if (index === -1) return;

    const removed = inventory.splice(index, 1)[0];
    logToScreen(`[DELETE] Removed "${removed.name}" (ID #${removed.id})`);
    renderInventory();
    updateAnalytics();
};

// renders table using array filter and forEach
function renderInventory() {
    const tableBody = document.getElementById("table-body");
    const emptyMsg = document.getElementById("empty-msg");
    const searchInput = document.getElementById("search-box");
    const categoryFilter = document.getElementById("category-filter");

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const filterCat = categoryFilter ? categoryFilter.value : "all";

    const filtered = inventory.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query);
        const matchesCategory = filterCat === "all" || item.category === filterCat;
        return matchesQuery && matchesCategory;
    });

    tableBody.innerHTML = "";

    if (filtered.length === 0) {
        emptyMsg.classList.remove("hidden");
        emptyMsg.textContent = inventory.length === 0
            ? "No products in inventory yet. Add one above!"
            : "No products matched your search.";
        return;
    }

    emptyMsg.classList.add("hidden");

    filtered.forEach((item, index) => {
        const { lineTotal, discount } = calculateLineTotal(item.price, item.qty);
        const badgeClass = getBadgeClass(item.category);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>$${lineTotal.toFixed(2)}${discount > 0 ? ' <small style="color:var(--green)">(-10%)</small>' : ""}</td>
            <td><span class="badge ${badgeClass}">${item.category}</span></td>
            <td><button class="btn-del" data-id="${item.id}">Remove</button></td>
        `;
        tableBody.appendChild(tr);
    });

    // attach delete button events
    tableBody.querySelectorAll(".btn-del").forEach(btn => {
        btn.addEventListener("click", () => {
            removeProduct(Number(btn.dataset.id));
        });
    });
}

// recalculates statistics using loops and array methods
function updateAnalytics() {
    const totalCount = inventory.length;

    // extract line totals with map
    const totals = inventory.map(item => {
        const { lineTotal } = calculateLineTotal(item.price, item.qty);
        return lineTotal;
    });

    // sum totals using a standard loop
    let totalValue = 0;
    for (let i = 0; i < totals.length; i++) {
        totalValue += totals[i];
    }

    // find most expensive item using a while loop
    let topItemName = "-";
    if (inventory.length > 0) {
        let highestPrice = 0;
        let i = 0;
        while (i < inventory.length) {
            if (inventory[i].price > highestPrice) {
                highestPrice = inventory[i].price;
                topItemName = inventory[i].name;
            }
            i++;
        }
    }

    const averagePrice = totalCount > 0 ? totalValue / totalCount : 0;

    // update stats in UI
    const statItems = document.getElementById("stat-items");
    const statValue = document.getElementById("stat-value");
    const statAvg = document.getElementById("stat-avg");
    const statExpensive = document.getElementById("stat-expensive");

    if (statItems) statItems.textContent = totalCount;
    if (statValue) statValue.textContent = `$${totalValue.toFixed(2)}`;
    if (statAvg) statAvg.textContent = `$${averagePrice.toFixed(2)}`;
    if (statExpensive) statExpensive.textContent = topItemName;

    logToScreen(`[STATS] Total Items: ${totalCount} | Inventory Value: $${totalValue.toFixed(2)} | Avg: $${averagePrice.toFixed(2)}`);
}

// temporary alert message helper
function showFeedback(text, type) {
    const msg = document.getElementById("form-msg");
    if (!msg) return;

    msg.textContent = text;
    msg.className = `msg ${type}`;
    msg.classList.remove("hidden");

    setTimeout(() => {
        msg.classList.add("hidden");
    }, 3000);
}

// demonstrates variable scope (let vs var vs block scoping)
function runScopeDemo() {
    logToScreen("--- Scope Demonstration ---", "header");
    try {
        {
            let localScope = "Block-scoped let variable";
            logToScreen(`Inside block: ${localScope}`);
        }
        // localScope is not accessible here
        logToScreen(localScope);
    } catch (err) {
        logToScreen(`Expected error caught outside block: ${err.message}`, "warn");
    }

    var functionScope = "Function-scoped var variable";
    logToScreen(`Inside function: ${functionScope}`);
}

// demonstrates do-while loop
function runDoWhileDemo() {
    logToScreen("--- Do-While Loop Demonstration ---", "header");
    let count = 0;
    do {
        count++;
        if (count % 2 === 0) {
            logToScreen(`Count ${count}: (even) skipped with continue`);
            continue;
        }
        logToScreen(`Count ${count}: (odd) processed`);
    } while (count < 4);
}

// initialize everything once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    seedInventory();
    runScopeDemo();
    runDoWhileDemo();
    renderInventory();
    updateAnalytics();

    // form submission
    const form = document.getElementById("product-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameEl = document.getElementById("product-name");
            const priceEl = document.getElementById("product-price");
            const qtyEl = document.getElementById("product-qty");

            const wasAdded = addProduct(nameEl.value, priceEl.value, qtyEl.value);

            if (wasAdded) {
                nameEl.value = "";
                priceEl.value = "";
                qtyEl.value = "";
                nameEl.focus();

                renderInventory();
                updateAnalytics();
            }
        });
    }

    // search & filter listeners
    const searchBox = document.getElementById("search-box");
    if (searchBox) {
        searchBox.addEventListener("input", renderInventory);
    }

    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderInventory);
    }

    logToScreen(`Ready! ${APP_NAME} is active.`);
});
