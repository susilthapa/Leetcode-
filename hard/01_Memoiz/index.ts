type Fn = (...params: any) => any

const RES = Symbol("result");

function memoize(fn:Fn):Fn {
    const cache = new Map();

    return function(...params:any) {
        let currentCache = cache;
        for(let i=0; i<params.length; i++) {
            const param = params[i]
            if (!currentCache.has(param)) {
                currentCache.set(param, new Map());
            }
            currentCache = currentCache.get(param);
        }

        if (currentCache.has(RES)) return currentCache.get(RES);

        const result = fn(...params);

        currentCache.set(RES, result);
        return result;
    }
}