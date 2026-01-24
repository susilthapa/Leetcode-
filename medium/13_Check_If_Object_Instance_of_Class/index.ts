function checkIfInstanceOf(obj: any, classFunction: any): boolean {
  while (obj != null) {
    if (obj.constructor === classFunction) {
      return true;
    }

    obj = Object.getPrototypeOf(obj);
  }

  return false;
}

// Solution using instanceof operator
/**
 * @param {Object} object
 * @param {Function} classFunction
 * @return {boolean}
 */
var checkIfInstanceOfTwo = function (obj: any, classFunction: any) {
  if (obj === null || obj === undefined || typeof classFunction !== "function")
    return false;
  return Object(obj) instanceof classFunction;
};
/**
 * checkIfInstanceOf(new Date(), Date); // true
 */
