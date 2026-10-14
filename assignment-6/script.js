// Assignment 6: Array Methods

const products = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 45 }
];

// forEach - print each product
console.log("All Products:");
products.forEach(function (product) {
    console.log("  " + product.name + " - $" + product.price);
});

// filter - get products under $50
console.log("\nProducts under $50:");
let affordable = products.filter(function (product) {
    return product.price < 50;
});
affordable.forEach(function (product) {
    console.log("  " + product.name + " - $" + product.price);
});

// map - create an array of formatted strings
console.log("\nProduct Tags:");
let tags = products.map(function (product) {
    return product.name.toUpperCase() + " costs $" + product.price;
});
console.log(tags);
