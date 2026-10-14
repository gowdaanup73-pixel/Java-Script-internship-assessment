// Assignment 2: Operators (Tip Calculator)

let billAmount = typeof prompt === "function" ? Number(prompt("Enter bill amount:")) : 50;
let tipPercentage = typeof prompt === "function" ? Number(prompt("Enter tip percentage:")) : 15;

let calculatedTip = billAmount * (tipPercentage / 100);
let totalAmount = billAmount;
totalAmount += calculatedTip;

console.log("Subtotal: $" + billAmount);
console.log("Tip Percentage: " + tipPercentage + "%");
console.log("Calculated Tip: $" + calculatedTip);
console.log("Total Amount to Pay: $" + totalAmount);
