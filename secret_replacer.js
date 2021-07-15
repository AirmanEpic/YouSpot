// get the FS package for node
const fs = require('fs');
// get the arguments that the process was run with - this will be run in github's docker env, with the secret as one of the arguments.
const args = process.argv;

// path to the index file to upload
const path = 'backend/index.js';
// read the contents of the index file
const str = fs.readFileSync(path).toString();

// find every instance of "#SECRET_A" in the index file and replace it with what was in arg 2.
const str2 = str.replace(/#SECRET_A/g, args[2]);

// re-write the modified file to the index.js to upload.
fs.writeFileSync(path, str2);

// note that this process does not in any way modify the index.js file in github, nor leak the secret code except to the lambda server.
