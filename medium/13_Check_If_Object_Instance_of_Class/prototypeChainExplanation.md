# How Prototype Chain Comparison Works

## The Core Question

When we do:

```ts
obj instanceof Constructor
JavaScript asks:

“Is Constructor.prototype the exact same object (same memory reference) as any prototype in obj’s prototype chain?”

What === Means for Objects
In JavaScript, === for objects compares memory references, not contents.

// Same contents, different objects
{ a: 1 } === { a: 1 }   // false ❌ (different memory locations)

// Same reference
const obj1 = { a: 1 };
const obj2 = obj1;

obj1 === obj2           // true ✅ (same memory location)
Visual: Memory References
┌─────────────────────────────────────────────────────────────────┐
│                    MEMORY REFERENCES                            │
└─────────────────────────────────────────────────────────────────┘

When you create a class:

    class Dog {}

JavaScript creates these in memory:

    MEMORY: 0x001                 MEMORY: 0x002
    ┌─────────────────────┐       ┌─────────────────────┐
    │   Dog (function)    │       │   Dog.prototype     │
    │                     │       │                     │
    │  prototype ─────────┼──────►│ constructor ────────┼───┐
    └─────────────────────┘       └─────────────────────┘   │
              ▲                                              │
              └──────────────────────────────────────────────┘
Instances Share the Same Prototype
const dog1 = new Dog();
const dog2 = new Dog();
    MEMORY: 0x003              MEMORY: 0x004
    ┌─────────────┐            ┌─────────────┐
    │    dog1     │            │    dog2     │
    │ [[Proto]] ──┼──┐         │ [[Proto]] ──┼──┐
    └─────────────┘  │         └─────────────┘  │
                     │                           │
                     │    MEMORY: 0x002          │
                     │    ┌─────────────────┐    │
                     └───►│  Dog.prototype  │◄───┘
                          │   (SHARED!)     │
                          └─────────────────┘

Both instances point to the SAME prototype object in memory.
How the Comparison Works
class Dog {}
const dog1 = new Dog();

Object.getPrototypeOf(dog1) === Dog.prototype
┌─────────────────────────────────────────────────────────────────┐
│                    THE COMPARISON                               │
└─────────────────────────────────────────────────────────────────┘

Object.getPrototypeOf(dog1)          Dog.prototype
            │                              │
            ▼                              ▼
      ┌────────────────────────────────────────┐
      │           Dog.prototype                │
      │           (memory: 0x002)              │
      └────────────────────────────────────────┘
                     ▲
                     │
        Both references point to the SAME object

Result: true ✅
Inheritance Example
class Animal {}
class Dog extends Animal {}

const dog = new Dog();
Memory Layout
┌─────────────────────────────────────────────────────────────────┐
│                    INHERITANCE IN MEMORY                        │
└─────────────────────────────────────────────────────────────────┘

MEMORY: 0x001                 MEMORY: 0x002
┌─────────────────┐           ┌─────────────────────┐
│     Animal      │           │  Animal.prototype   │
│ prototype ──────┼──────────►│ (memory: 0x002)     │
└─────────────────┘           └──────────┬──────────┘
                                         │ [[Proto]]
                                         ▼
                              ┌─────────────────────┐
                              │ Object.prototype    │
                              │ (memory: 0x005)     │
                              └─────────────────────┘

MEMORY: 0x003                 MEMORY: 0x004
┌─────────────────┐           ┌─────────────────────┐
│      Dog        │           │   Dog.prototype     │
│ prototype ──────┼──────────►│ (memory: 0x004)     │
└─────────────────┘           └──────────┬──────────┘
                                         │ [[Proto]]
                                         ▼
                              ┌─────────────────────┐
                              │ Animal.prototype    │
                              │ (memory: 0x002)     │
                              └─────────────────────┘

MEMORY: 0x006
┌─────────────────┐
│      dog        │
│ [[Proto]] ──────┼──────────► Dog.prototype (0x004)
└─────────────────┘
Tracing dog instanceof Animal
dog instanceof Animal
┌─────────────────────────────────────────────────────────────────┐
│              TRACING: dog instanceof Animal                     │
└─────────────────────────────────────────────────────────────────┘

Step 1: Get target prototype
        Animal.prototype → 0x002

Step 2: Walk dog's prototype chain

dog (0x006)
  ↓
Dog.prototype (0x004)   → 0x004 === 0x002 ? ❌
  ↓
Animal.prototype (0x002) → 0x002 === 0x002 ? ✅

MATCH FOUND → return true
Why This Matters: Same Object vs Same Shape
// Same structure, different objects
const proto1 = { bark() {} };
const proto2 = { bark() {} };

proto1 === proto2   // false ❌

// Same prototype object
class Dog {}
const dog1 = new Dog();
const dog2 = new Dog();

Object.getPrototypeOf(dog1) === Object.getPrototypeOf(dog2)
// true ✅ (same Dog.prototype)
Manual Verification Code
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

const p1 = Object.getPrototypeOf(dog);
console.log(p1 === Dog.prototype); // true ✅

const p2 = Object.getPrototypeOf(p1);
console.log(p2 === Animal.prototype); // true ✅

const p3 = Object.getPrototypeOf(p2);
console.log(p3 === Object.prototype); // true ✅

const p4 = Object.getPrototypeOf(p3);
console.log(p4 === null); // true ✅
The Full Picture
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE CHAIN COMPARISON                    │
└─────────────────────────────────────────────────────────────────┘

dog instanceof Animal

dog                                   Animal
 │                                      │
 │ walk prototype chain                 │ get .prototype
 ▼                                      ▼

Dog.prototype (0x004)   ≠   Animal.prototype (0x002)
        │
        ▼
Animal.prototype (0x002) === Animal.prototype (0x002)  ✅ MATCH

Result: true
Summary
Concept	Explanation
What’s compared	Memory references, not object contents
=== for objects	True only if same object in memory
Prototype chain	Objects link to shared prototype objects
instanceof	Walks the chain and compares references
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   obj instanceof Constructor                                    │
│                                                                 │
│   = "Does any prototype in obj's chain point to the              │
│      EXACT SAME memory location as Constructor.prototype?"      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## How Prototype Chain Works for Built-in Objects

**(Array, Object, Map)**

### Array Example

When you create an array, JavaScript sets up this prototype chain:

```js
const arr = [1, 2, 3];

// Where do methods like .map(), .filter(), .push() come from?
```

```js
┌─────────────────────────────────────────────────────────────────┐
│                   ARRAY PROTOTYPE CHAIN                         │
└─────────────────────────────────────────────────────────────────┘

    const arr = [1, 2, 3];

    MEMORY: 0x001
    ┌─────────────────────┐
    │        arr          │
    │                     │
    │  0: 1               │
    │  1: 2               │   ← Your data lives here
    │  2: 3               │
    │  length: 3          │
    │                     │
    │  [[Proto]]: ────────┼────────┐
    └─────────────────────┘        │
                                   │
                                   ▼
    MEMORY: 0x002
    ┌─────────────────────────────────────────┐
    │          Array.prototype                │
    │                                         │
    │  map: function() {...}                  │
    │  filter: function() {...}               │
    │  reduce: function() {...}               │   ← Shared methods
    │  push: function() {...}                 │
    │  pop: function() {...}                  │
    │  forEach: function() {...}              │
    │  ...                                    │
    │                                         │
    │  [[Proto]]: ────────────────────────────┼────────┐
    └─────────────────────────────────────────┘        │
                                                       │
                                                       ▼
    MEMORY: 0x003
    ┌─────────────────────────────────────────┐
    │          Object.prototype               │
    │                                         │
    │  toString: function() {...}             │
    │  hasOwnProperty: function() {...}       │
    │  valueOf: function() {...}              │
    │  ...                                    │
    │                                         │
    │  [[Proto]]: null                        │ ← End
    └─────────────────────────────────────────┘
```

### How arr.map() Works

```js

const arr = [1, 2, 3];
arr.map(x => x \* 2); // [2, 4, 6]

```

```js
┌─────────────────────────────────────────────────────────────────┐
│ FINDING .map() METHOD │
└─────────────────────────────────────────────────────────────────┘

Step 1: Look for "map" on arr itself

    ┌─────────────────────┐
    │        arr          │
    │                     │
    │  0: 1               │
    │  1: 2               │
    │  2: 3               │
    │  length: 3          │
    │                     │
    │  map: ???           │ ← Not found ❌
    └─────────────────────┘

    → Go up the chain

Step 2: Look for "map" on Array.prototype

    ┌─────────────────────────────┐
    │      Array.prototype        │
    │                             │
    │  map: function() {...} ◄── FOUND ✅
    │  filter: function() {...}   │
    └─────────────────────────────┘

    → Call with this = arr
```

### Multiple Arrays Share the Same Prototype

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

Object.getPrototypeOf(arr1) === Object.getPrototypeOf(arr2); // true
Object.getPrototypeOf(arr2) === Object.getPrototypeOf(arr3); // true
Object.getPrototypeOf(arr1) === Array.prototype; // true
```

```js
┌─────────────────────────────────────────────────────────────────┐
│                   SHARED PROTOTYPE                              │
└─────────────────────────────────────────────────────────────────┘

    arr1              arr2              arr3
    [1,2,3]           [4,5,6]           [7,8,9]
       │                 │                 │
       └──────────────┬──┴─────────────────┘
                      │
                      ▼
              ┌─────────────────────┐
              │   Array.prototype   │
              │                     │
              │ map()               │
              │ filter()            │
              │ reduce()            │
              └─────────────────────┘

    ✔ One shared object → memory efficient

```

### Object Example

```js
const obj = { name: "John", age: 30 };
```

```js
┌─────────────────────────────────────────────────────────────────┐
│                   OBJECT PROTOTYPE CHAIN                        │
└─────────────────────────────────────────────────────────────────┘

    MEMORY: 0x001
    ┌─────────────────────┐
    │        obj          │
    │                     │
    │  name: "John"       │
    │  age: 30            │
    │                     │
    │  [[Proto]]: ────────┼────────┐
    └─────────────────────┘        │
                                   ▼
    MEMORY: 0x002
    ┌─────────────────────────────────────────┐
    │          Object.prototype               │
    │                                         │
    │  toString()                             │
    │  hasOwnProperty()                      │
    │  valueOf()                             │
    │  ...                                   │
    │                                         │
    │  [[Proto]]: null                        │
    └─────────────────────────────────────────┘
```

### Map Example

```ts
const map = new Map();
map.set("a", 1);
map.get("a"); // 1
```

```js
┌─────────────────────────────────────────────────────────────────┐
│                  MAP PROTOTYPE CHAIN                            │
└─────────────────────────────────────────────────────────────────┘

    MEMORY: 0x001
    ┌─────────────────────┐
    │        map          │
    │                     │
    │  [[MapData]]        │ ← Internal storage
    │                     │
    │  [[Proto]]: ────────┼────────┐
    └─────────────────────┘        │
                                   ▼
    MEMORY: 0x002
    ┌─────────────────────────────────────────┐
    │          Map.prototype                  │
    │                                         │
    │  set()                                  │
    │  get()                                  │
    │  has()                                  │
    │  delete()                               │
    │  clear()                                │
    │  forEach()                              │
    │  ...                                    │
    │                                         │
    │  [[Proto]]: ────────────────────────────┼────────┐
    └─────────────────────────────────────────┘        │
                                                       ▼
    MEMORY: 0x003
    ┌─────────────────────────────────────────┐
    │          Object.prototype               │
    │                                         │
    │  toString()                             │
    │  ...                                    │
    │                                         │
    │  [[Proto]]: null                        │
    └─────────────────────────────────────────┘
```

## Comparing Prototype Chains

```js
┌─────────────────────────────────────────────────────────────────┐
│                    CHAIN COMPARISON                             │
└─────────────────────────────────────────────────────────────────┘

    ARRAY                    OBJECT                   MAP
    [1,2,3]                 {a:1}                  new Map()
        │                       │                       │
        ▼                       ▼                       ▼
 Array.prototype         Object.prototype         Map.prototype
        │                       │                       │
        └───────────────┬───────┴───────────────┬───────┘
                        ▼                       ▼
                  Object.prototype        Object.prototype
                        │
                        ▼
                      null

```

All roads lead to `Object.prototype`.

### Proving It with Code

```js
Object.getPrototypeOf(arr) === Array.prototype; // true
Object.getPrototypeOf(Array.prototype) === Object.prototype; // true

Object.getPrototypeOf(obj) === Object.prototype; // true

Object.getPrototypeOf(map) === Map.prototype; // true
Object.getPrototypeOf(Map.prototype) === Object.prototype; // true

Object.getPrototypeOf(Object.prototype) === null; // true
```

### Why Arrays Have Object Methods

```js
const arr = [1, 2, 3];

arr.map(x => x \* 2); // Array.prototype
arr.toString(); // Object.prototype
arr.hasOwnProperty(0); // Object.prototype

arr → Array.prototype → Object.prototype → null
```

#### Adding Your Own Methods

```js
Array.prototype.first = function () {
  return this[0];
};

[1, 2, 3].first(); // 1
[4, 5, 6].first(); // 4
```

```
✔ Added once
✔ Available to all arrays
✔ Memory efficient
```

### Summary Table

| Type         | Prototype Chain                                   | Methods                            |
| ------------ | ------------------------------------------------- | ---------------------------------- |
| `[]`         | arr → Array.prototype → Object.prototype → null   | map, filter, push + Object methods |
| `{}`         | obj → Object.prototype → null                     | toString, hasOwnProperty           |
| `new Map()`  | map → Map.prototype → Object.prototype → null     | get, set, has                      |
| `new Set()`  | set → Set.prototype → Object.prototype → null     | add, delete                        |
| `new Date()` | date → Date.prototype → Object.prototype → null   | getTime                            |
| `function()` | fn → Function.prototype → Object.prototype → null | call, bind                         |

### Key Takeaway

```
When you call arr.map():

1️⃣ JS checks arr itself
2️⃣ Goes to Array.prototype
3️⃣ Finds map()
4️⃣ Executes with this = arr

✔ Methods live on prototypes
✔ Instances stay lightweight
✔ One method serves all objects
```
