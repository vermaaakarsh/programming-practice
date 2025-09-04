function deepCopy(item) {
  if (typeof item !== "object") {
    return item;
  }
  if (Array.isArray(item)) {
    let array = [];
    for (let i = 0; i < item.length; i++) {
      let value = deepCopy(item[i]);
      array.push(value);
    }
    return array;
  } else {
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
      object[key] = value;
    }
    return object;
  }
}
let name1 = "undefine1d";
let obj = [
  {
    name1,
    age: 25,
    programmingLanguages: [{ JS: "intermediate" }, { Python: "" }],
    azhar: null,
  },
  {
    name: [{}, { a: null }],
    age: 24,
    programmingLanguages: ["JS", "TS", "Rust", "Solidity", "Go"],
  },
  {
    name: "Azhar",
    age: 35,
    programmingLanguages: ["JS", "TS", "Python", "C++", "Java", "C#"],
  },
];

let newObject = deepCopy(obj);
console.log("Before - Original", JSON.stringify(obj));
console.log("Before - Cloned", JSON.stringify(newObject));
console.log("====================================");

newObject[0]["programmingLanguages"][0]["JS"] = "introductory";

console.log("After - Original", JSON.stringify(obj));
console.log("After - Cloned", JSON.stringify(newObject));
