type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

interface Function {
    callPolyfill(context: Record<string, JSONValue>, ...args: JSONValue[]): JSONValue;
}


/**
 * We use a Symbol as a temporary property key.
 *
 * WHY Symbol?
 * - Zero risk of property name collision
 * - Non-enumerable by default
 * - Faster than Object.defineProperty
 */
const CALL_POLYFILL_FN = Symbol("callPolyfillFn");

// declare global {
//   interface Function {
//     callPolyfill(this: AnyFn, context: unknown, ...args: JSONValue[]): JSONValue;
//   }
// }

Function.prototype.callPolyfill = function (
  context: unknown,
  ...args: JSONValue[]
): JSONValue {
  /**
   * Convert context to an object.
   *
   * WHY Object(context)?
   * - Mirrors native Function.prototype.call behavior
   * - Allows primitives like string/number/boolean
   *
   * WHY NOT Object.assign?
   * ❌ Object.assign({}, context) creates a NEW object
   * ❌ `this` would point to the copied object, NOT the original
   * ❌ Extra allocation + slower
   *
   * WHY NOT `{ ...context }`?
   * ❌ Same issue as Object.assign
   * ❌ Breaks reference semantics
   *
   * WHY NOT Object.create(context)?
   * ❌ Adds prototype indirection
   * ❌ Slower property lookup
   *
   * WHY NOT defineProperty here?
   * ❌ Slower than direct assignment
   * ❌ Triggers hidden-class changes in V8
   */
  const ctx =
    context == null ? (globalThis as any) : Object(context);

  /**
   * Attach function using direct assignment.
   *
   * WHY direct assignment?
   * ✅ Fastest way to add a property
   * ✅ No descriptor overhead
   */
  (ctx as any)[CALL_POLYFILL_FN] = this;

  try {
    /**
     * Call function with correct `this`
     *
     * This works because:
     * - function is now a property of `ctx`
     * - calling via property sets `this = ctx`
     */
    return (ctx as any)[CALL_POLYFILL_FN](...args);
  } finally {
    /**
     * Cleanup is CRITICAL.
     *
     * WHY try/finally?
     * - Ensures cleanup even if the function throws
     *
     * WHY delete?
     * - Prevent memory leaks
     * - Restore original object shape
     *
     * Note:
     * - Symbol minimizes de-optimization risk
     * - Cleanup cost is unavoidable but safe
     */
    delete (ctx as any)[CALL_POLYFILL_FN];
  }
};

