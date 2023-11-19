// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};
const delay = ms => new Promise(res => setTimeout(res, ms));


async function main() {

  const DetractContract = await ethers.getContractFactory('Detract');
  detractContract = await DetractContract.deploy();

  const detractContractAddress = await detractContract.getAddress();
  console.log({ detractContractAddress })
  await delay(5000);
  await verify(detractContractAddress, []);

  console.log("CONTRACT VERIFIED!");

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
