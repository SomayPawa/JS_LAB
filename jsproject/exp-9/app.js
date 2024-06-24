// app.js
// Importing named export
import { add } from './mathUtils.js';

// Importing default export
import subtract from './mathUtils.js';

console.log(add(5, 3)); // Output: 8
console.log(subtract(10, 4)); // Output: 6
