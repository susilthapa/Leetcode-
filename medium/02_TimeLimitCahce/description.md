# Time Limited Cache

Write a class that allows getting and setting key-value pairs, where each key has an associated time until expiration.

The class has **three public methods**:

## Methods

### `set(key, value, duration)`

- Accepts an integer `key`, an integer `value`, and a `duration` in milliseconds.
- Once the duration has elapsed, the key should be inaccessible.
- Returns:
  - `true` if the same **un-expired** key already exists
  - `false` otherwise
- If the key already exists, **both the value and duration are overwritten**.

### `get(key)`

- If an **un-expired** key exists, returns the associated value.
- Otherwise, returns `-1`.

### `count()`

- Returns the count of **un-expired** keys.

---

## Example 1

### Input

```text
actions    = ["TimeLimitedCache", "set", "get", "count", "get"]
values     = [[], [1, 42, 100], [1], [], [1]]
timeDelays = [0, 0, 50, 50, 150]
```

### Output

```
[null, false, 42, 1, -1]
```
