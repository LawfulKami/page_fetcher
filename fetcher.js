const page = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetch = (arg) => {
  request(arg[0], (error, response, body) => {
    if (error) {
      console.log("Something with wrong with the fetch destination");
      process.exit();
    }
    if (response.statusCode !== 200) {
      console.log("Something with wrong with the fetch destination");
      process.exit();
    }
    confirmPrompt(arg[1], body);
  });
};

const write = (path, file) => fs.writeFile(path, file, (err) => {
  if (err) {
    console.log("The specified path is invalid");
    process.exit();
  }
  console.log('The file has been saved!');
  process.exit();
});

const confirmPrompt = (path, body) => fs.access(path,(err) => {
  if (!err) {
    rl.question("The file already exist do you want ot overwrite? (y/n)", answer => {
      if (answer === "n") {
        console.log("No file has been saved");
        process.exit();
      } else if (answer === "y") {
        write(path, body);
      } else {
        confirmPrompt(path, body);
      }
    });
  }
});
  



fetch(page);