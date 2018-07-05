/* Enter the information in the constants below */
const ACCOUNT_MNEMONIC = 'Your account mnemonic';
const RINKEBY_INFRA_ADDRESS = 'https://rinkeby.infura.io/';
const INFRA_API_KEY = 'your infra key';

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const INITIAL_MESSAGE = 'Look at me at rinkeby network';

const provider = new HDWalletProvider(
  ACCOUNT_MNEMONIC,
  RINKEBY_INFRA_ADDRESS + INFRA_API_KEY
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploying contract from account {0}', [accounts[0]]);

  await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MESSAGE]
    })
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to {0}', [result.options.address]);
};

deploy();
