# 📦 JavaScript Internship Assessment

> A comprehensive collection of **6 progressive assignments** and a **capstone project** demonstrating core JavaScript fundamentals — built as part of a JavaScript internship programme.

---

## 🗂️ Project Structure

```
javascript-internship/
├── assignment-1/   → Variables & Data Types
├── assignment-2/   → Operators & Expressions
├── assignment-3/   → Control Flow (if/else, switch, ternary)
├── assignment-4/   → Loops (for, while, do…while, break, continue)
├── assignment-5/   → Functions (standard, arrow, default params, scope)
├── assignment-6/   → Array Methods (forEach, filter, map)
├── capstone/       → 🏆 Inventory Management System (integrates all concepts)
└── README.md
```

---

## 📝 Assignment Summaries

### Assignment 1 — Variables & Data Types
Declares variables using `const`, `let`, and `var` for different data types (string, number, boolean, array) and logs each value along with its `typeof`.

**Concepts:** `const` / `let` / `var`, template literals, `typeof`, arrays

### Assignment 2 — Operators & Expressions
A **Tip Calculator** that accepts a bill amount and tip percentage via `prompt()`, then computes the tip and total using arithmetic and compound assignment operators.

**Concepts:** Arithmetic (`*`, `/`), compound assignment (`+=`), `Number()`, `prompt()`

### Assignment 3 — Control Flow
A **Grade Classifier** that takes a numeric score, assigns a letter grade using `if…else`, confirms it with a `switch` statement, and determines pass/fail status with a ternary operator.

**Concepts:** `if…else if…else`, `switch…case`, ternary (`? :`), template literals

### Assignment 4 — Loops
Demonstrates all three loop types: a `for` loop to print a multiplication table, a `while` loop that finds the first number above 10 divisible by 6, and a `do…while` loop with `continue` to skip even iterations.

**Concepts:** `for`, `while`, `do…while`, `break`, `continue`

### Assignment 5 — Functions & Scope
Compares a **standard function** and an **arrow function** (both with default parameters) for area calculation. Includes a `try…catch` block that proves `let` is block-scoped by catching the `ReferenceError` when accessing it outside its block.

**Concepts:** Function declarations, arrow functions, default parameters, block scope (`let`), `try…catch`

### Assignment 6 — Array Methods
Works with a `products` array of objects to demonstrate `forEach` (printing each item), `filter` (items under $50), and `map` (formatted uppercase labels).

**Concepts:** `forEach`, `filter`, `map`, object arrays, template literals

---

## 🏆 Capstone Project — Inventory Management System

The capstone is a **fully interactive, browser-based Inventory Management System** that integrates every JavaScript concept from Assignments 1–6 into a single, polished application.

### ✨ Features

| Feature | JS Concepts Used |
|---|---|
| Add products via form | Variables, operators, functions (default params) |
| Auto-categorization (Premium / Standard / Budget) | `if…else`, `switch…case`, ternary |
| Inventory table rendering | `forEach`, DOM manipulation |
| Live search & category filter | `filter`, event listeners |
| Analytics dashboard (totals, averages, most expensive) | `map`, `for` loop, `while` loop, arithmetic operators |
| Delete products | Arrow functions, `splice`, `findIndex` |
| Duplicate detection | `find`, string comparison |
| Bulk discount (10% off when qty ≥ 10) | Comparison operators, compound assignment |
| Scope & do…while demonstrations | `try…catch`, block scope, `do…while`, `continue` |
| In-page console log output | DOM manipulation, `setTimeout` |

### 🖥️ Screenshots

Open `capstone/index.html` in any modern browser to see the app in action. No build tools or dependencies required.

### 🏗️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, grid layout, glassmorphism, animations
- **Vanilla JavaScript** — Zero dependencies, pure JS

---

## 🚀 How to Run

### Console-based Assignments (1, 3–6)
```bash
# Navigate into any assignment folder and run with Node.js
cd assignment-1
node script.js
```

### Browser-based (Assignment 2 & Capstone)
Simply open the HTML file in your browser:
- `assignment-2/script.js` → Uses `prompt()`, run in browser console or wrap in an HTML file
- `capstone/index.html` → Open directly in any modern browser

> **No dependencies. No build step. No npm install.** Just pure JavaScript.

---

## 🧠 JavaScript Concepts Covered

| # | Concept | Assignment | Capstone |
|---|---------|:----------:|:--------:|
| 1 | `const`, `let`, `var` & Data Types | ✅ | ✅ |
| 2 | Arithmetic & Assignment Operators | ✅ | ✅ |
| 3 | `if…else`, `switch`, Ternary | ✅ | ✅ |
| 4 | `for`, `while`, `do…while`, `break`, `continue` | ✅ | ✅ |
| 5 | Functions (standard, arrow, default params) | ✅ | ✅ |
| 6 | Block Scope & `try…catch` | ✅ | ✅ |
| 7 | `forEach`, `filter`, `map` | ✅ | ✅ |
| 8 | DOM Manipulation & Event Handling | — | ✅ |
| 9 | Template Literals | ✅ | ✅ |
| 10 | Object & Array Destructuring | — | ✅ |

---

## 👤 Author

**Anup Gowda**
JavaScript Internship Assessment · 2026

---

## 📄 License

This project is submitted as part of an internship assessment and is for educational purposes.
