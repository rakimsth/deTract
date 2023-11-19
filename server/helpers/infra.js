const { ethers } = require('ethers');
const { BASE_GOERLI_URL } = require("../constants/blockchains");

const getTreasuryWallet = () => {
    console.log(`BASE_GOERLI_URL: ${BASE_GOERLI_URL}`);
    const provider = new ethers.JsonRpcProvider(BASE_GOERLI_URL);
  
    const privateKey = process.env.PRIVATE_KEY;
    const treasuryWallet = new ethers.Wallet(privateKey, provider);
  
    return treasuryWallet;
  }

module.exports = {
    getTreasuryWallet
}