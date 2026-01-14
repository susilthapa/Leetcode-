# Implement `callPolyfill` on All Functions (Without Using `Function.call`)

## Problem

Enhance all JavaScript functions by adding a method called **`callPolyfill`** to `Function.prototype`.

### Behavior Requirements

- `callPolyfill` accepts:
  - **First argument**: an object `obj` to be used as the `this` context
  - **Remaining arguments**: passed to the function normally
- The function should execute with `obj` as its `this` value
- **Do NOT use**:
  - `Function.call`
  - `Function.apply`
  - `Function.bind`

---

## Why This Is Needed

```js
function tax(price, taxRate) {
  const totalCost = price * (1 + taxRate);
  console.log(`The cost of ${this.item} is ${totalCost}`);
}
```


```
tax(10, 0.1);
 // The cost of undefined is 11
this is not defined.
```

```Using callPolyfill (✅ Correct this)
js
Copy code
tax.callPolyfill({ item: "salad" }, 10, 0.1);
// The cost of salad is 11
```



### Example 1:

**Input:**
```
fn = function add(b) {
  return this.a + b;
}
args = [{"a": 5}, 7]
Output: 12

Explanation:
fn.callPolyfill({"a": 5}, 7); // 12
callPolyfill sets the "this" context to {"a": 5}. 7 is passed as an argument.
```

### Example 2:

**Input:** 
```
fn = function tax(price, taxRate) { 
 return `The cost of the ${this.item} is ${price * taxRate}`; 
}
args = [{"item": "burger"}, 10, 1.1]
Output: "The cost of the burger is 11"

Explanation: callPolyfill sets the "this" context to {"item": "burger"}. 10 and 1.1 are passed as additional arguments.
```