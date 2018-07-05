/* read solidity file into source variable */

const path = require('path');
const fs = require('fs');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

/* compile source with solidity */
const numberOfDifferentContracts = 1;
const solc = require('solc');

const contracts = solc.compile(source, numberOfDifferentContracts);
console.log(contracts);

module.exports = contracts[':Inbox'];
