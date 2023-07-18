const path = require('path');

// Base file name
console.log(path.basename(__filename));

// Directory name
console.log(path.basename(__dirname));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));

// .. just get one object
console.log(path.parse(__filename).dir);

// Concatenate paths
console.log(path.join(__dirname, 'test', 'hello.html'));