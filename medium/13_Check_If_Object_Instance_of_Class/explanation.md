# JavaScript Concepts Explained

A comprehensive guide covering time-limited functions, prototype chains, constructors, and prototype methods.

## Table of Contents

1. [Understanding `checkIfInstanceOf`](#1-understanding-checkifinstanceof)
   - [The Goal](#the-goal)
   - [What is a Constructor?](#what-is-a-constructor)
   - [What is the Prototype Chain?](#what-is-the-prototype-chain)
   - [How the Function Works](#how-the-function-works)
   - [Simple Analogy: Family Tree](#simple-analogy-family-tree)
   - [The Loop Visualized](#the-loop-visualized)
2. [Understanding `Object.getPrototypeOf()`](#2-understanding-objectgetprototypeof)
   - [What It Actually Returns](#what-it-actually-returns)
   - [What is a Prototype?](#what-is-a-prototype)
   - [Objects vs Prototypes Diagram](#objects-vs-prototypes-diagram)
3. [Calling Methods from Prototype](#3-calling-methods-from-prototype)
   - [Can We Call Them?](#can-we-call-them)
   - [The Problem with Direct Calls](#the-problem-with-direct-calls)
   - [Fixing It with `.call()`](#fixing-it-with-call)
   - [Reading vs Calling](#reading-vs-calling)
   - [Practical Use Cases](#practical-use-cases)
4. [Summary](#4-summary)

---

# 1. Understanding `checkIfInstanceOf`

## The Goal

We want to check: **"Is this object made from this class (or its parent classes)?"**

```typescript
class Animal {}
class Dog extends Animal {}

const myDog = new Dog();

// Is myDog a Dog? → YES
// Is myDog an Animal? → YES (because Dog extends Animal)
// Is myDog a String? → NO
```

## The Code

```typescript
function checkIfInstanceOf(obj: any, classFunction: any): boolean {
  while (obj != null) {
    if (obj.constructor === classFunction) {
      return true;
    }
    obj = Object.getPrototypeOf(obj);
  }
  return false;
}
```

---

## What is a Constructor?

When you create an object using `new`, the class/function that created it is stored as the **constructor**:

```typescript
class Dog {}
const myDog = new Dog();

// JavaScript remembers who created myDog:
console.log(myDog.constructor); // [Function: Dog]
console.log(myDog.constructor === Dog); // true ✅
```

Think of it like a birth certificate — every object knows "who made me."

---

## What is the Prototype Chain?

In JavaScript, objects are connected in a chain. Each object has a prototype it inherits from.

```
┌─────────────────────────────────────────────────────────────────┐
│                     THE PROTOTYPE CHAIN                         │
└─────────────────────────────────────────────────────────────────┘

When you create: const myDog = new Dog();

JavaScript builds this chain:

    myDog
      │
      │  Object.getPrototypeOf(myDog)
      ▼
┌──────────────────┐
│  Dog.prototype   │  ← constructor = Dog
└────────┬─────────┘
         │
         │  Object.getPrototypeOf(...)
         ▼
┌──────────────────┐
│ Animal.prototype │  ← constructor = Animal
└────────┬─────────┘
         │
         │  Object.getPrototypeOf(...)
         ▼
┌──────────────────┐
│ Object.prototype │  ← constructor = Object
└────────┬─────────┘
         │
         ▼
       null          ← END OF CHAIN
```

---

## How the Function Works

Let's trace through step by step:

### Example 1: `checkIfInstanceOf(myDog, Dog)`

```
Step 1: obj = myDog
        Is myDog.constructor === Dog?
        YES! ✅ Return true

┌─────────┐
│  myDog  │ ◄── We check here. constructor = Dog. MATCH!
└─────────┘
```

### Example 2: `checkIfInstanceOf(myDog, Animal)`

```
Step 1: obj = myDog
        Is myDog.constructor === Animal?
        NO (it's Dog, not Animal)

        Move up: obj = Object.getPrototypeOf(myDog)

┌─────────┐
│  myDog  │ ◄── constructor = Dog. Not Animal. Keep going...
└────┬────┘
     │
     ▼
Step 2: obj = Dog.prototype
        Is obj.constructor === Animal?
        NO (it's still Dog)

        Move up: obj = Object.getPrototypeOf(obj)

┌────────────────┐
│ Dog.prototype  │ ◄── constructor = Dog. Not Animal. Keep going...
└───────┬────────┘
        │
        ▼
Step 3: obj = Animal.prototype
        Is obj.constructor === Animal?
        YES! ✅ Return true

┌─────────────────┐
│ Animal.prototype │ ◄── constructor = Animal. MATCH!
└─────────────────┘
```

### Example 3: `checkIfInstanceOf(myDog, String)`

```
┌─────────┐
│  myDog  │ ◄── constructor = Dog. Not String.
└────┬────┘
     ▼
┌────────────────┐
│ Dog.prototype  │ ◄── constructor = Dog. Not String.
└───────┬────────┘
        ▼
┌─────────────────┐
│ Animal.prototype │ ◄── constructor = Animal. Not String.
└────────┬────────┘
         ▼
┌─────────────────┐
│ Object.prototype │ ◄── constructor = Object. Not String.
└────────┬────────┘
         ▼
       null         ◄── End of chain. Return false ❌
```

---

## Simple Analogy: Family Tree

Think of it like checking if someone is related to a family:

```
Is myDog part of the "Dog" family?
→ Check myDog's birth certificate: "Made by Dog" ✅ YES!

Is myDog part of the "Animal" family?
→ Check myDog: "Made by Dog" (not Animal, check parent)
→ Check Dog's parent: "Animal" ✅ YES!

Is myDog part of the "String" family?
→ Walk up entire family tree...
→ Never find "String" anywhere ❌ NO
```

---

## The Loop Visualized

```
┌─────────────────────────────────────────────────────────┐
│                    THE ALGORITHM                        │
└─────────────────────────────────────────────────────────┘

                    START
                      │
                      ▼
              ┌───────────────┐
              │ Is obj null?  │
              └───────┬───────┘
                      │
           ┌─────────┴─────────┐
           │ YES               │ NO
           ▼                   ▼
    ┌─────────────┐    ┌──────────────────────────┐
    │ Return FALSE│    │ Is obj.constructor       │
    └─────────────┘    │ === classFunction?       │
                       └────────────┬─────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │ YES                 │ NO
                         ▼                     ▼
                  ┌─────────────┐    ┌─────────────────────┐
                  │ Return TRUE │    │ obj = getPrototypeOf│
                  └─────────────┘    │       (obj)         │
                                     └──────────┬──────────┘
                                                │
                                                │ (go back to top)
                                                ▼
                                        ┌───────────────┐
                                        │ Is obj null?  │
                                        └───────────────┘
                                              ...
```

---

## Quick Summary

| Concept                      | What it means                                             |
| ---------------------------- | --------------------------------------------------------- |
| `obj.constructor`            | "Who created this object?"                                |
| `Object.getPrototypeOf(obj)` | "What's the prototype of this object?"                    |
| The loop                     | Keep checking prototypes until we find a match or run out |
| Return `true`                | Found the class somewhere in the chain                    |
| Return `false`               | Reached the end (`null`) without finding it               |

---

# 2. Understanding `Object.getPrototypeOf()`

## What It Actually Returns

It returns the **prototype** of the object, not a "parent object" in the traditional sense.

```typescript
class Animal {}
class Dog extends Animal {}

const myDog = new Dog();

// Let's see what getPrototypeOf returns at each step:

console.log(Object.getPrototypeOf(myDog));
// → Dog.prototype (an object that all Dogs share)

console.log(Object.getPrototypeOf(Object.getPrototypeOf(myDog)));
// → Animal.prototype (an object that all Animals share)

console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(myDog))),
);
// → Object.prototype (an object that ALL objects share)

console.log(
  Object.getPrototypeOf(
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(myDog))),
  ),
);
// → null (end of chain)
```

---

## What is a Prototype?

A **prototype** is a shared object that contains methods and properties for all instances of a class.

```typescript
class Dog {
  bark() {
    console.log("Woof!");
  }
}

const dog1 = new Dog();
const dog2 = new Dog();

// Both dogs share the SAME prototype object:
Object.getPrototypeOf(dog1) === Object.getPrototypeOf(dog2); // true ✅

// The bark method lives on the prototype, not on each dog:
Object.getPrototypeOf(dog1).bark; // [Function: bark]
```

---

## Objects vs Prototypes Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                  OBJECTS vs PROTOTYPES                          │
└─────────────────────────────────────────────────────────────────┘

When you create two dogs:

    const dog1 = new Dog();
    const dog2 = new Dog();


       dog1                         dog2
    ┌────────────┐               ┌────────────┐
    │ (instance) │               │ (instance) │
    │            │               │            │
    │ name: "Rex"│               │ name: "Max"│
    └─────┬──────┘               └──────┬─────┘
          │                             │
          │  getPrototypeOf             │  getPrototypeOf
          │                             │
          └──────────────┬──────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │    Dog.prototype    │  ← SHARED by all dogs
              │                     │
              │  bark: function()   │
              │  constructor: Dog   │  ← This is what we check!
              └──────────┬──────────┘
                         │
                         │  getPrototypeOf
                         ▼
              ┌─────────────────────┐
              │  Animal.prototype   │  ← SHARED by all animals
              │                     │
              │  eat: function()    │
              │  constructor: Animal│
              └──────────┬──────────┘
                         │
                         │  getPrototypeOf
                         ▼
              ┌─────────────────────┐
              │  Object.prototype   │  ← SHARED by ALL objects
              │                     │
              │  toString: function │
              │  constructor: Object│
              └──────────┬──────────┘
                         │
                         ▼
                       null
```

---

## Key Insight

`Object.getPrototypeOf(obj)` doesn't give you a "parent instance."

It gives you the **prototype object** — a shared blueprint that contains:

- Methods defined in the class
- A `constructor` property pointing back to the class

```typescript
// Simplified mental model:
dog.constructor === Dog; // Dog
Object.getPrototypeOf(dog).constructor === Dog; // Dog.prototype
Object.getPrototypeOf(Object.getPrototypeOf(dog)).constructor === Animal; // Animal.prototype
```

---

# 3. Calling Methods from Prototype

## Can We Call Them?

**Yes, you can absolutely call methods directly from the prototype!**

```typescript
class Dog {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const dog1 = new Dog("Buddy");

// Normal way to call:
dog1.bark(); // "Buddy says Woof!"

// Calling from prototype directly:
Object.getPrototypeOf(dog1).bark(); // "undefined says Woof!"
```

### Why Does It Print "undefined"?

When you call the method from the prototype directly, `this` refers to the **prototype object**, not `dog1`. The prototype doesn't have a `name` property, so `this.name` is `undefined`.

---

## The Problem with Direct Calls

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALLING METHODS                              │
└─────────────────────────────────────────────────────────────────┘


NORMAL CALL: dog1.bark()
══════════════════════════

    dog1
    ┌─────────────────┐
    │ name: "Buddy"   │ ◄── "this" points here
    └────────┬────────┘
             │
             │ JavaScript looks for bark() here.
             │ Not found, so goes to prototype.
             ▼
    ┌─────────────────┐
    │  Dog.prototype  │
    │                 │
    │  bark() ────────┼──► Runs with this = dog1
    └─────────────────┘    So this.name = "Buddy" ✅



PROTOTYPE CALL: Object.getPrototypeOf(dog1).bark()
══════════════════════════════════════════════════

    dog1
    ┌─────────────────┐
    │ name: "Buddy"   │    (completely ignored!)
    └─────────────────┘

    ┌─────────────────┐
    │  Dog.prototype  │ ◄── "this" points here now
    │                 │
    │  bark() ────────┼──► Runs with this = Dog.prototype
    └─────────────────┘    So this.name = undefined ❌
```

### How `this` Binding Works

| How You Call       | What `this` Becomes |
| ------------------ | ------------------- |
| `dog1.bark()`      | `dog1`              |
| `prototype.bark()` | `prototype`         |
| `bark.call(dog1)`  | `dog1`              |
| `bark.apply(dog1)` | `dog1`              |

---

## Fixing It with `.call()`

You can manually set `this` using `.call()` or `.apply()`:

```typescript
const dog1 = new Dog("Buddy");
const proto = Object.getPrototypeOf(dog1);

// Manually set "this" to dog1:
proto.bark.call(dog1); // "Buddy says Woof!" ✅

// Using apply (same result):
proto.bark.apply(dog1); // "Buddy says Woof!" ✅
```

### How `.call()` Works

```
┌─────────────────────────────────────────────────────────────────┐
│              USING .call() TO FIX "this"                        │
└─────────────────────────────────────────────────────────────────┘

proto.bark.call(dog1)

    Step 1: Get the bark function from prototype

    ┌─────────────────┐
    │  Dog.prototype  │
    │                 │
    │  bark() ◄───────┼── Get this function
    └─────────────────┘

    Step 2: Call it, but force "this" to be dog1

    ┌─────────────────┐
    │     dog1        │
    │                 │
    │  name: "Buddy"  │ ◄── "this" points here now!
    └─────────────────┘

    Result: "Buddy says Woof!" ✅
```

---

## Reading vs Calling

There's a difference between **reading** a property and **calling** it:

```typescript
const dog1 = new Dog("Buddy");
const proto = Object.getPrototypeOf(dog1);

// READING: Just get the property (returns the function itself)
console.log(proto.bark); // [Function: bark]
console.log(typeof proto.bark); // "function"

// CALLING: Execute the function (with parentheses)
proto.bark(); // "undefined says Woof!"
```

### Comparison Table

| Code                    | What It Does              | Result                     |
| ----------------------- | ------------------------- | -------------------------- |
| `proto.bark`            | Returns the function      | `[Function: bark]`         |
| `typeof proto.bark`     | Checks the type           | `"function"`               |
| `proto.bark()`          | Calls the function        | Executes with wrong `this` |
| `proto.bark.call(dog1)` | Calls with correct `this` | Executes properly          |

---

## Practical Use Cases

### 1. Checking if a Method Exists

```typescript
const dog1 = new Dog("Buddy");
const proto = Object.getPrototypeOf(dog1);

if (typeof proto.bark === "function") {
  console.log("Dogs can bark!");
}
```

### 2. Calling Parent Method When Overriding

```typescript
class Puppy extends Dog {
  bark() {
    console.log("Small woof first!");

    // Call the parent's bark method:
    Object.getPrototypeOf(Object.getPrototypeOf(this)).bark.call(this);
  }
}

const puppy = new Puppy("Max");
puppy.bark();
// Output:
// "Small woof first!"
// "Max says Woof!"
```

### 3. Better Way: Using `super`

In modern JavaScript, use `super` instead:

```typescript
class Puppy extends Dog {
  bark() {
    console.log("Small woof first!");
    super.bark(); // Much cleaner! ✅
  }
}
```

---

# 4. Summary

## Time Limited Function

- Use `Promise.race()` to race between the function and a timeout
- Whichever settles first wins
- Clean up timeout if function resolves first (optional optimization)

## Prototype Chain Concepts

| Concept                      | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `obj.constructor`            | The function/class that created the object           |
| `Object.getPrototypeOf(obj)` | The prototype object that `obj` inherits from        |
| Prototype                    | A shared object containing methods for all instances |
| Prototype Chain              | Linked list of prototypes from object to `null`      |

## Calling Prototype Methods

| Code                                          | What Happens                          |
| --------------------------------------------- | ------------------------------------- |
| `dog1.bark()`                                 | Calls bark with `this = dog1` ✅      |
| `Object.getPrototypeOf(dog1).bark`            | Returns the function itself           |
| `Object.getPrototypeOf(dog1).bark()`          | Calls bark with `this = prototype` ⚠️ |
| `Object.getPrototypeOf(dog1).bark.call(dog1)` | Calls bark with `this = dog1` ✅      |

## The Golden Rule

```typescript
// ❌ Don't do this (unless you have a specific reason):
Object.getPrototypeOf(dog1).bark();

// ✅ Just do this:
dog1.bark();
```

JavaScript automatically walks up the prototype chain for you!
