const { ethers } = require("hardhat");
const paper1 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKa'

const detractContractAddress = "0x66F6ec9d6bAEe571803f806F401bfd672891f027";

async function main() {
    const Detract = await ethers.getContractFactory("Detract");
    const detractContract = await Detract.attach(detractContractAddress);
    console.log("contract deployed to:", await detractContract.getAddress());

    const [signer] = await ethers.getSigners();
    const AUTHOR_ADDRESS = process.env.AUTHOR_ADDRESS;
    const tx = await detractContract.connect(signer).publishPaper(paper1, AUTHOR_ADDRESS)
    console.log({ tx })

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });