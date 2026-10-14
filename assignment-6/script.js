const products = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 45 }
];

console.log("-- All Products (forEach) --");
products.forEach(p => {
    console.log(`Item: ${p.name} - Price: $${p.price}`);
});

console.log("\n-- Filtered Products (Price < $50) --");
const filtered = products.filter(p => p.price < 50);
filtered.forEach(p => console.log(`  ${p.name}: $${p.price}`));

console.log("\n-- Mapped Product Tags (map) --");
const mapped = products.map(p => `${p.name.toUpperCase()} costs $${p.price}`);
console.log(`[ ${mapped.map(m => `"${m}"`).join(", ")} ]`);
