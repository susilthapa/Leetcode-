// Solution 1

class TimeLimitedCache {
  private cache: Record<number, { value: number; expiryDate: number }> = {};
  constructor() {}

  set(key: number, value: number, duration: number): boolean {
    if (key in this.cache) {
      this.cache[key] = {
        value,
        expiryDate: Date.now() + duration,
      };
      return true;
    }

    this.cache[key] = { value, expiryDate: Date.now() + duration };
    return false;
  }

  get(key: number): number {
    console.log({ cache: this.cache, isThrere: key in this.cache });
    if (key in this.cache && Date.now() < this.cache[key].expiryDate) {
      return this.cache[key].value;
    }
    return -1;
  }

  count(): number {
    const unExpiredCacheItems = Object.values(this.cache).filter(
      ({ expiryDate }) => Date.now() < expiryDate
    );
    return unExpiredCacheItems.length;
  }
}

const timeLimitedCache = new TimeLimitedCache();
console.log(timeLimitedCache.set(1, 42, 1000)); // false
console.log(timeLimitedCache.get(1)); // 42

// Solution 2: using prototype

interface CacheEntry {
  value: number;
  ref: ReturnType<typeof setTimeout>;
}

interface TimeLimitedCacheInstance {
  cache: Map<number, CacheEntry>;
}

const TimeLimitedCache_ = function (this: TimeLimitedCacheInstance) {
  this.cache = new Map(); // Using Map so we don't need a size variable
};

TimeLimitedCache_.prototype.set = function (
  key: number,
  value: number,
  duration: number
) {
  let found = this.cache.has(key);
  if (found) clearTimeout(this.cache.get(key).ref); // Cancel previous timeout
  this.cache.set(key, {
    value, // Equivalent to `value: value`
    ref: setTimeout(() => this.cache.delete(key), duration),
  });
  return found;
};

TimeLimitedCache_.prototype.get = function (key: number) {
  return this.cache.has(key) ? this.cache.get(key).value : -1;
};

TimeLimitedCache_.prototype.count = function () {
  return this.cache.size;
};
