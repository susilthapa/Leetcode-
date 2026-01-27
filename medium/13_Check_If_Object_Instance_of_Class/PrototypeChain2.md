# Prototypal Inheritance in JavaScript

In JavaScript, the behavior you are observing is the fundamental mechanism of **Prototypal Inheritance**. When you use the `new` keyword, you are not just calling a function; you are triggering an internal process that links the new object to the constructor's prototype.

## The Internal Process of `new`

When you execute `const inst = new Ctor()`, the JavaScript engine performs these four steps:

1. **Creation**: It creates a brand-new, empty object.
2. **Linking (The Core Mechanism)**: It sets the internal `[[Prototype]]` (hidden link) of this new object to the object referenced by `Ctor.prototype`.
3. **Binding**: It binds `this` to the new object and executes the constructor code.
4. **Return**: It returns the newly created object.

## Breakdown of the Code Components

### 1. `Ctor.prototype`

- Every function in JavaScript (except arrow functions) has a property called `.prototype`.
- It is **not** the prototype of the function itself.
- It is an object that serves as a blueprint or shared storage for all instances created with that function.

### 2. `Object.getPrototypeOf(inst)`

- This method retrieves the actual prototype of an object (the hidden `[[Prototype]]` link).
- In your code, `Object.getPrototypeOf(inst)` returns the object that `inst` inherited from.

## Why the Result is `true`

Because of Step 2 mentioned above, the engine explicitly sets the instance's prototype to match the constructor's prototype property:

```javascript
function Ctor() {}
const inst = new Ctor();

// This is true because the 'new' keyword performed the link:
// inst.__proto__ === Ctor.prototype
console.log(Object.getPrototypeOf(inst) === Ctor.prototype); // true
```

## The Practical Outcome: The Prototype Chain

This link allows for memory efficiency. Instead of every instance having its own copy of a method, they all "look up" to the constructor's prototype to find it.

```javascript
Ctor.prototype.sayHi = function() { return "Hi!"; };

const inst1 = new Ctor();
const inst2 = new Ctor();

// Neither inst1 nor inst2 "own" sayHi, but they can both use it
// because it exists on the object they both share as a prototype.
console.log(inst1.sayHi()); // "Hi!"
console.log(inst2.sayHi()); // "Hi!"
```

## Summary

The statement "The constructor's prototype property becomes the resulting object's prototype" means that `Ctor.prototype` is the source of inheritance, and the instance `inst` is the recipient of that inheritance. For more technical details on this mechanism, you can refer to the [MDN documentation on the new operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new).



