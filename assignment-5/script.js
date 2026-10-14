function standardArea(length = 5, width = 4) {
    return length * width;
}

const arrowArea = (length = 5, width = 4) => length * width;

console.log(`Standard Function Area (Default 5x4): ${standardArea()}`);
console.log(`Arrow Function Area (Custom 10x3): ${arrowArea(10, 3)}`);

try {
    {
        let blockVar = "I am block scoped";
    }
    console.log(blockVar);
} catch (error) {
    console.log(`Scope Test Error: ${error.name}: ${error.message} (when accessed outside block)`);
}
