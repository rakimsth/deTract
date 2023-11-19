require('dotenv').config();

require('@nomiclabs/hardhat-ethers');
require("@nomicfoundation/hardhat-chai-matchers");
require("solidity-docgen");
require("@nomicfoundation/hardhat-verify");
require("@atixlabs/hardhat-time-n-mine");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

  networks: {
    hardhat: {
      chains: {
        99: {
          hardforkHistory: {
            berlin: 10000000,
            london: 20000000,
          },
        }
      }
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/<key>",
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [process.env.PRIVATE_KEY]
    },
    arbiGoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      accounts: [process.env.PRIVATE_KEY]
    },
    baseGoerli: {
      url: "https://goerli.base.org",
      accounts: [process.env.PRIVATE_KEY]
    },

  },
  paths: {
    sources: './src/contracts',
    tests: './tests',
    cache: './hardhat_build/cache',
    artifacts: './hardhat_build/artifacts',
  },

  etherscan: {
    apiKey: {
      baseGoerli: 'process.env.ETHERSCAN_KEY',
    }
  }
};
