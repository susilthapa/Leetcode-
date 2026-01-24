# Check if Object Instance of Class

## Problem Statement

Write a function that checks if a given value is an instance of a given class or superclass.

For this problem, an object is considered an instance of a given class **if that object has access to that class's methods**.

There are **no constraints** on the data types that can be passed to the function.  
For example, the value or the class could be `undefined`.

---

## Examples

### Example 1

**Input:**

```js
func = () => checkIfInstanceOf(new Date(), Date);

true;
```

### Example 2

**Input:**

```js
func = () => {
  class Animal {}
  class Dog extends Animal {}
  return checkIfInstanceOf(new Dog(), Animal);
};

true;
```
