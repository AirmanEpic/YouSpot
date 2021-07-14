const fs = require("fs");
const args = process.argv;

const path = "backend/index.js";
const str = fs.readFileSync(path).toString();

const str2 = str.replace(/#SECRET_A/g,args[2]);

fs.writeFileSync(path,str2)