const fs = require('fs');

const input = fs.readFileSync('people.txt').toString();
const PATTERN = /^([^\(]+)\s*\((.+)\)\s*\n(https?:\/\/.+)$/gm;

let match;
let output = [];

/**
 * Little script to parse the list of people from the provided text document into json
 */

while ((match = PATTERN.exec(input)) !== null) {
  const [_, name, personTitle, url] = match;
  output.push({
    name: name.trim(),
    personTitle: personTitle.trim(),
    url: url.trim(),
  });
}

fs.writeFileSync('people.json', JSON.stringify({ people: output }));
