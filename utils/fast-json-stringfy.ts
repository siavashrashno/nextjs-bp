import type { KeyOf, ValueOf } from "@types";

type CompareFnParameter<T> = { key: KeyOf<T>; value: ValueOf<T> };
type CompareFn<T> = (
  a: CompareFnParameter<T>,
  b: CompareFnParameter<T>
) => number;
type StringfyOptions<T> =
  | CompareFn<T>
  | {
      cycles?: boolean;
      cmp?: CompareFn<T>;
    };

export default function stringify<T>(
  data: T,
  opts: StringfyOptions<T> = {}
): string | undefined {
  if (typeof opts === "function") opts = { cmp: opts };
  const cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
  const cmp =
    opts.cmp &&
    (function (f: CompareFn<T>) {
      return function (node: T) {
        return function (a: string, b: string) {
          var aobj = { key: a as KeyOf<T>, value: node[a as KeyOf<T>] };
          var bobj = { key: b as KeyOf<T>, value: node[b as KeyOf<T>] };
          return f(aobj, bobj);
        };
      };
    })(opts.cmp);

  const seen: any[] = [];
  return (function _stringify(node: any): string | undefined {
    if (node && node.toJSON && typeof node.toJSON === "function") {
      node = node.toJSON();
    }

    if (node === undefined) return;
    if (typeof node == "number") return isFinite(node) ? "" + node : "null";
    if (typeof node !== "object") return JSON.stringify(node);

    var i, out;
    if (Array.isArray(node)) {
      out = "[";
      for (i = 0; i < node.length; i++) {
        if (i) out += ",";
        out += _stringify(node[i]) || "null";
      }
      return out + "]";
    }

    if (node === null) return "null";

    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify("__cycle__");
      throw new TypeError("Converting circular structure to JSON");
    }

    var seenIndex = seen.push(node) - 1;
    var keys = Object.keys(node).sort(cmp && cmp(node));
    out = "";
    for (i = 0; i < keys.length; i++) {
      var key = keys[i] as KeyOf<T>;
      var value = _stringify(node[key]);

      if (!value) continue;
      if (out) out += ",";
      out += JSON.stringify(key) + ":" + value;
    }
    seen.splice(seenIndex, 1);
    return "{" + out + "}";
  })(data);
}
