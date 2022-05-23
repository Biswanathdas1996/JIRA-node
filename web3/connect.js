const _ = require("lodash");
const Web3 = require("web3");
const ABI = require("./JIRA.json");
const ADDRESS = require("./Address.json");
const { decode } = require("js-base64");

const Network = `rinkeby`;
const InfuraProjectId = `24022fda545f41beb59334bdbaf3ef32`;
const WalletPrivateKey =
  "33e8389993eea0488d813b34ee8d8d84f74f204c17b95896e9380afc6a514dc7";
const InfuraNodeURL = `https://${Network}.infura.io/v3/${InfuraProjectId}`;

const web3 = new Web3(new Web3.providers.HttpProvider(InfuraNodeURL));
const signer = web3.eth.accounts.privateKeyToAccount(WalletPrivateKey);
web3.eth.accounts.wallet.add(signer);
const contract = new web3.eth.Contract(ABI, ADDRESS);

const _fetch = async (service, ...props) => {
  const callService = _.get(contract, ["methods", service]);
  let data;
  if (props) {
    data = await callService(...props).call();
  } else {
    data = await callService().call();
  }

  return data;
};

module.exports = { _fetch };
