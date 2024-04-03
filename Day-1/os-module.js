const os = require("os");

console.log(os.cpus());
console.log("Platform:", os.platform());
console.log("Release:", os.release());
console.log("Hostname:", os.hostname());
console.log("Total Memory:", os.totalmem());
console.log('Free Memory:', os.freemem() );
console.log('Network Interfaces:', os.networkInterfaces());
console.log('Constants:', os.constants);
