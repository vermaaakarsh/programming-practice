function deepCopy(item) {
  if (typeof item !== "object") {
    return item;
  }
  if (Array.isArray(item)) {
    let array = [];
    for (let i = 0; i < item.length; i++) {
      let value = deepCopy(item[i]);
      if (value) {
        if (
          typeof value === "object" &&
          ((value.isArray && !value.length) || !Object.keys(value).length)
        ) {
          continue;
        }
        array.push(value);
      }
    }
    return array;
  }
  let object = {};
  if (!item) {
    return item;
  }
  let keys = Object.keys(item);
  for (const key of keys) {
    if (!key) {
      continue;
    }
    let value = deepCopy(item[key]);
    if (value) {
      if (
        typeof value === "object" &&
        ((value.isArray && !value.length) || !Object.keys(value).length)
      ) {
        continue;
      }
      object[key] = value;
    }
  }
  return object;
}

let obj = [
  {
    name: "Aakarsh",
    age: 25,
    programmingLanguages: [{ JS: "intermediate" }, { Python: "" }],
    azhar: null,
  },
  {
    name: [{}, { a: null, name: "Tushar" }],
    age: 24,
    programmingLanguages: ["", "TS", "Rust", "Solidity", "Go"],
  },
  {
    name: "Azhar",
    age: 35,
    programmingLanguages: ["JS", "TS", "Python", "C++", "Java", "C#"],
  },
];

console.log("Original", JSON.stringify(obj));
console.log("====================================");
let newObject = deepCopy(obj);
console.log("Cloned", JSON.stringify(newObject));
