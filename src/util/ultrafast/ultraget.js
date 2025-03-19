// ✅ Extract values from nested object paths
const extractValuesByPaths = (obj, paths) => {
  let keys = Object.keys(paths);
  let pathLengths = new Array(keys.length);
  let values = new Array(keys.length);
  for (let i = 0; i < keys.length; i++) {
    pathLengths[i] = paths[keys[i]].length;
    values[i] = obj; // Initialize at root
  }
  let maxDepth = Math.max(...pathLengths);
  for (let depth = 0; depth < maxDepth; depth++) {
    for (let i = 0; i < keys.length; i++) {
      if (depth < pathLengths[i]) {
        values[i] = values[i]?.[paths[keys[i]][depth]] ?? "";
      }
    }
  }
  let result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
};

const extractValuesByPathsValues = (obj, paths) => {
  return paths.map((path) => path.reduce((acc, key) => acc?.[key] ?? "", obj));
};

// ✅ Example Usage:
const data1 = {
  level1: {
    key1: "value1",
    level2: [
      [{ key3: "value3" }, { key3: "wrong_value" }],
      [{ key3: "another_wrong_value" }],
    ],
    level3: {
      level4: {
        level5: {
          key10: "value10",
        },
      },
    },
  },
};

const paths2 = [
  ["level1", 0],
  ["level1", "level2", 0, 1],
  ["level1", "level2", 1, 0],
  ["level1", "level3", "level4", "level5"],
  ["level1", "does_not_exist"], // Should return ""
];

console.log("Values", extractValuesByPathsValues(data1, paths2));

const paths1 = [
  ["level1", "key1"],
  ["level1", "level2", 0, 1, "key3"],
  ["level1", "level2", 1, 0, "key3"],
  ["level1", "level3", "level4", "level5", "key10"],
  ["level1", "does_not_exist"], // Should return ""
];

console.log("Values", extractValuesByPathsValues(data1, paths1));
// Expected Output: ["value1", "wrong_value", "another_wrong_value", "value10", ""]

////////////////////////////////////////////////////////////////////////////////
// ✅ Remove duplicates from array of objects (multiple keys)
const removeDuplicatesByKeys = (arr, keys) => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keys.map((k) => item[k]).join("|");
    return seen.has(key) ? false : seen.add(key);
  });
};

// ✅ Get unique values from an array based on a key
const uniqueByKey = (arr, key) => [...new Set(arr.map((item) => item[key]))];

// ✅ Chunk an array into smaller arrays
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

// ✅ Filter array of objects (must match all keys)
const filterByKeys = (arr, criteria) => {
  return arr.filter((obj) =>
    Object.entries(criteria).every(([key, value]) => obj[key] === value)
  );
};

// ✅ Filter array of objects (match at least one key)
const filterByAnyKeys = (arr, criteria) => {
  return arr.filter((obj) =>
    Object.entries(criteria).some(([key, value]) => obj[key] === value)
  );
};

// ✅ Sort an array of objects by multiple keys
const sortByKeysFixed = (arr, keys, order = "asc") =>
  [...arr].sort((a, b) => {
    for (let key of keys) {
      if (a[key] !== b[key]) {
        if (typeof a[key] === "string") {
          return order === "asc"
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        }
        return order === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    }
    return 0;
  });

// ✅ Check if an object is empty
const isEmptyObject = (obj) => Object.keys(obj).length === 0;

// ✅ Remove property from an object
const removeProperty = (obj, key) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

// ✅ Merge two objects
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

// ✅ Deep clone an object
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// ✅ Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (arr) => {
  let shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ✅ Find the most frequent item in an array
const mostFrequent = (arr) => {
  const freq = arr.reduce(
    (acc, val) => ((acc[val] = (acc[val] || 0) + 1), acc),
    {}
  );
  return Object.keys(freq).reduce((a, b) => (freq[a] > freq[b] ? a : b));
};

// ✅ Convert object to query string
const toQueryString = (obj) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

// ✅ Trim all string values in an object
const trimObjectStrings = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );

// ✅ Remove falsy values from an array
const removeFalsyValues = (arr) => arr.filter(Boolean);

// ✅ Group array of objects by a key
const groupBy = (arr, key) =>
  arr.reduce((acc, obj) => {
    (acc[obj[key]] = acc[obj[key]] || []).push(obj);
    return acc;
  }, {});

// ✅ TEST CASES

const data = {
  level1: {
    key1: "value1",
    level2: [
      [{ key3: "value3" }, { key3: "wrong_value" }],
      [{ key3: "another_wrong_value" }],
    ],
    level3: {
      level4: {
        level5: {
          key10: "value10",
        },
      },
    },
  },
};

const paths = {
  key1: ["level1", "key1"],
  key3_1: ["level1", "level2", 0, 1],
  key3_2: ["level1", "level2", 1, 0, "key3"],
  key10: ["level1", "level3", "level4", "level5", "key10"],
  keyInvalid: ["level1", "does_not_exist"], // Should return ""
};

console.log("Extracted Values:", extractValuesByPaths(data, paths));

console.log(
  "Remove Duplicates:",
  removeDuplicatesByKeys(
    [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 1, name: "A" },
    ],
    ["id", "name"]
  )
);

console.log("Chunk Array:", chunkArray([1, 2, 3, 4, 5, 6], 2));

console.log(
  "Sort By Keys:",
  sortByKeysFixed(
    [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Bob", age: 10 },
    ],
    ["name", "age"],
    "asc"
  )
);

console.log("Trimmed Object:", trimObjectStrings({ name: " John ", age: 30 }));

console.log(
  "Filtered (AND):",
  filterByKeys(
    [
      { category: "Electronics", status: "Shipped" },
      { category: "Clothing", status: "Pending" },
      { category: "Clothing", status: "Shipped" },
    ],
    { category: "Electronics", status: "Shipped" }
  )
);

console.log(
  "Filtered (OR):",
  filterByAnyKeys(
    [
      { category: "Electronics", status: "Shipped" },
      { category: "Clothing", status: "Pending" },
      { category: "Clothing", status: "Shipped" },
    ],
    { category: "Electronics", status: "Shipped" }
  )
);

console.log(
  "Query String:",
  toQueryString({ search: "laptop", category: "electronics" })
);

console.log(
  "Grouped Data:",
  groupBy(
    [
      { id: 1, category: "Electronics" },
      { id: 2, category: "Clothing" },
      { id: 3, category: "Electronics" },
    ],
    "category"
  )
);

// const extractValuesByPaths = (obj, paths) => {
//   let keys = Object.keys(paths);
//   let pathLengths = new Array(keys.length);
//   let values = new Array(keys.length);
//   let count = 0;
//   for (let i = 0; i < keys.length; i++) {
//     count = count + 1;
//     pathLengths[i] = paths[keys[i]].length;
//     values[i] = obj; // Initialize each path at root
//   }

//   let maxDepth = Math.max(...pathLengths);

//   for (let depth = 0; depth < maxDepth; depth++) {
//     for (let i = 0; i < keys.length; i++) {
//       if (depth < pathLengths[i]) {
//         values[i] = values[i]?.[paths[keys[i]][depth]] ?? ""; // Fast lookup
//         count = count + 1;
//       }
//     }
//   }

//   let result = {};
//   for (let i = 0; i < keys.length; i++) {
//     count = count + 1;
//     result[keys[i]] = values[i];
//   }
//   return result;
// };

// // ✅ Example Usage:
// const data = {
//   level1: {
//     key1: "value1",
//     level2: [
//       [{ key3: "value3" }, { key3: "wrong_value" }],
//       [{ key3: "another_wrong_value" }],
//     ],
//     level3: {
//       level4: {
//         level5: {
//           key10: "value10",
//         },
//       },
//     },
//   },
// };

// const paths = {
//   key1: ["level1", "key1"],
//   key3_1: ["level1", "level2", 0, 1, "key3"],
//   key3_2: ["level1", "level2", 1, 0, "key3"],
//   key10: ["level1", "level3", "level4", "level5", "key10"],
//   keyInvalid: ["level1", "does_not_exist"], // Should return ""
// };

// console.log(extractValuesByPaths(data, paths));
// /////////////////////////////////////////////////////////////////
// // Array Manipulation (Built-in Methods)

// // 1. Remove Duplicates from Array of Objects (Using Map) - Multiple Keys
// const removeDuplicatesByKeys = (arr, keys) => {
//   const seen = new Set();
//   return arr.filter((item) => {
//     const key = keys.map((k) => item[k]).join("|");
//     return seen.has(key) ? false : seen.add(key);
//   });
// };

// // 2. Get Unique Values from an Array Based on a Key (Using Set)
// const uniqueByKey = (arr, key) => [...new Set(arr.map((item) => item[key]))];

// // 3. Chunk an Array (Using slice())
// const chunkArray = (arr, size) =>
//   Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//     arr.slice(i * size, i * size + size)
//   );
// ////////////////////////////////////////////////////

// const criteria = { category: "Electronics", status: "Shipped" };

// const filterByKeys = (arr, criteria) => {
//   return arr.filter((obj) =>
//     Object.entries(criteria).every(([key, value]) => obj[key] === value)
//   );
// };

// const filterByAnyKeys = (arr, criteria) => {
//   return arr.filter((obj) =>
//     Object.entries(criteria).some(([key, value]) => obj[key] === value)
//   );
// };

// // 5. Sort an Array of Objects by Multiple Keys
// const sortByKeysFixed = (arr, keys, order = "asc") =>
//   [...arr].sort((a, b) => {
//     for (let key of keys) {
//       if (a[key] !== b[key]) {
//         if (typeof a[key] === "string") {
//           return order === "asc"
//             ? a[key].localeCompare(b[key])
//             : b[key].localeCompare(a[key]);
//         }
//         return order === "asc" ? a[key] - b[key] : b[key] - a[key];
//       }
//     }
//     return 0;
//   });

// console.log(sortByKeysFixed(data, ["name", "age"], "asc"));

// // 6. Check if Object is Empty (Using Object.keys())
// const isEmptyObject = (obj) => Object.keys(obj).length === 0;

// // 7. Remove Property from Object (Using Destructuring)
// const removeProperty = (obj, key) => {
//   const { [key]: _, ...rest } = obj;
//   return rest;
// };

// // 8. Merge Objects (Using Object.assign() or Spread ...)
// const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

// // 9. Deep Clone an Object (Using structuredClone())
// const deepClone = (obj) => structuredClone(obj);

// // 10. Shuffle an Array (Using Fisher-Yates Algorithm)
// const shuffleArray = (arr) => {
//   let shuffled = [...arr];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };
// const mostFrequent = (arr) => {
//   const freq = arr.reduce(
//     (acc, val) => ((acc[val] = (acc[val] || 0) + 1), acc),
//     {}
//   );
//   return Object.keys(freq).reduce((a, b) => (freq[a] > freq[b] ? a : b));
// };
// console.log(toQueryString({ search: "laptop", category: "electronics" }));
// // "search=laptop&category=electronics"
// const trimObjectStrings = (obj) =>
//   Object.fromEntries(
//     Object.entries(obj).map(([key, value]) => [
//       key,
//       typeof value === "string" ? value.trim() : value,
//     ])
//   );
// const removeFalsyValues = (arr) => arr.filter(Boolean);

// // ✅ Example
// console.log(removeFalsyValues([0, 1, false, 2, "", 3, null, undefined, NaN])); // [1, 2, 3]
// const groupBy = (arr, key) =>
//   arr.reduce((acc, obj) => {
//     (acc[obj[key]] = acc[obj[key]] || []).push(obj);
//     return acc;
//   }, {});

// // ✅ Example
// const orders = [
//   { id: 1, category: "Electronics" },
//   { id: 2, category: "Clothing" },
//   { id: 3, category: "Electronics" },
// ];

// console.log(groupBy(orders, "category"));
// /*
//   {
//     Electronics: [{ id: 1, category: "Electronics" }, { id: 3, category: "Electronics" }],
//     Clothing: [{ id: 2, category: "Clothing" }]
//   }
//   */
