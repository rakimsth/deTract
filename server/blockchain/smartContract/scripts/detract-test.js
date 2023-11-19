const { ethers } = require("hardhat");
const paper1 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKa'
const paper2 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKb'
const paper3 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKc'
const paper4 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd'
const evidence1 = 'QmTyDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKc'
const evidence2 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd'
const evidence3 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKe'
const evidence4 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKf'

const detractContractAddress = "0x40BdA327da6460B106001709ef2F730825c634D8";

async function main() {
    const Detract = await ethers.getContractFactory("Detract");
    const detractContract = await Detract.attach(detractContractAddress);
    console.log("contract deployed to:", await detractContract.getAddress());

    const [signer] = await ethers.getSigners();
    const paper1Hash = ethers.id(paper1);
    console.log(paper1Hash, signer.address)
    const tx = await detractContract.connect(signer).publishPaper(paper1Hash, signer.address)
    console.log(tx)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });