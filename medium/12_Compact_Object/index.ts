type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj | null {
    if (obj === null) return null;
    if (Array.isArray(obj)) return obj.filter(Boolean).map((item) => compactObject(item as Obj)) as JSONValue[];
    if (typeof obj !== "object") return obj;

    const compactObjResult: Record<string, JSONValue> = {};
    for (const key of Object.keys(obj)) {
        const compacted = compactObject(obj[key] as Obj);
        if (compacted) compactObjResult[key] = compacted;
    }
    return compactObjResult;
};