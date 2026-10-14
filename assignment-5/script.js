// Assignment 5: Functions and Scope

// standard function with default parameters
function calculateArea(length = 5, width = 4) {
    return length * width;
}

// arrow function doing the same thing
const calcArea = (length = 5, width = 4) => length * width;

console.log("Standard function (default 5x4): " + calculateArea());
console.log("Arrow function (custom 10x3): " + calcArea(10, 3));

// block scope demonstration using try-catch
try {
    {
        let blockVar = "I am block scoped";
        console.log("Inside block: " + blockVar);
    }
    // this will throw an error because blockVar is not accessible here
    console.log(blockVar);
} catch (error) {
    console.log("Caught error: " + error.name + " - " + error.message);
}
