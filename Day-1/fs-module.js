const fs = require("fs");

fs.writeFile("welcome.txt", "Welcome again.", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("File successfully written.");
  }
});

fs.readFile("hello.txt", "utf8", (error, data) => {
  if (error) throw error;
  console.log(data);
});
