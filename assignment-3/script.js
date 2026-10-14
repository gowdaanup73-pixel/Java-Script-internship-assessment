let score = 85;
let grade;

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}

switch (grade) {
    case 'A':
        console.log("Excellent! Outstanding performance.");
        break;
    case 'B':
        console.log("Good job! Above average performance.");
        break;
    case 'C':
        console.log("Satisfactory. Meets expectations.");
        break;
    default:
        console.log("Needs improvement. Consider retaking the course.");
        break;
}

let status = score >= 70 ? "Passed" : "Failed";

console.log(`Score: ${score}`);
console.log(`Grade: ${grade}`);
console.log(`Status: ${status}`);
