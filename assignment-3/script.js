// Assignment 3: Control Flow (Grade Classifier)

let score = 85;
let grade;

// using if else to assign grade
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "F";
}

// using switch to give feedback based on grade
switch (grade) {
    case "A":
        console.log("Excellent! Outstanding performance.");
        break;
    case "B":
        console.log("Good job! Above average.");
        break;
    case "C":
        console.log("Satisfactory. Keep improving.");
        break;
    default:
        console.log("Needs improvement.");
        break;
}

// ternary operator for pass/fail
let status = score >= 70 ? "Passed" : "Failed";

console.log("Score: " + score);
console.log("Grade: " + grade);
console.log("Status: " + status);
