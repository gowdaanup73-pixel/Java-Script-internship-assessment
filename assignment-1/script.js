const name = "Alice";
let age = 25;
var isEmployed = true;
let skills = ["HTML", "CSS", "JavaScript"];

console.log(`Name: ${name} (Type: ${typeof name})`);
console.log(`Age: ${age} (Type: ${typeof age})`);
console.log(`Is Employed: ${isEmployed} (Type: ${typeof isEmployed})`);
console.log(`Skills: [${skills.map(s => `"${s}"`).join(", ")}] (Type: ${typeof skills})`);
