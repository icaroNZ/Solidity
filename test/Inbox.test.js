('use strict');
const assert = require('assert');
/* ganache test network */
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
const DEFAULT_MESSAGE = 'I am alive!';
const CHANGED_MESSAGE = 'I still here';
describe('Inbox', () => {
  let accounts;
  let inbox;
  beforeEach(async () => {
    //get list of all accounts created by ganache
    accounts = await web3.eth.getAccounts();

    //Use the accounts collect to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: [DEFAULT_MESSAGE] })
      .send({ from: accounts[0], gas: '1000000' });
  });

  it('deploy the contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, DEFAULT_MESSAGE);
  });

  it('can modify message', async () => {
    await inbox.methods.setMessage(CHANGED_MESSAGE).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, CHANGED_MESSAGE);
  });
});
