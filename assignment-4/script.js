// Assignment 4: Loops

// for loop - multiplication table of 5
console.log("Multiplication Table of 5:");
for (let i = 1; i <= 10; i++) {
    console.log("5 x " + i + " = " + (5 * i));
}

// while loop - find the first number greater than 10 that is divisible by 6
console.log("\nFinding first number > 10 divisible by 6:");
let num = 11;
while (true) {
    if (num % 6 === 0) {
        console.log("Found: " + num);
        break;
    }
    num++;
}

// do while loop with continue - print odd numbers from 1 to 5
console.log("\nOdd numbers from 1 to 5:");
let count = 0;
do {
    count++;
    if (count % 2 === 0) {
        continue; // skip even numbers
    }
    console.log(count);
} while (count < 5);
