const { expect } = require('chai');
const { ethers } = require('hardhat');
const { generateMultiCallData } = require('./utils');

const paper1 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKa'
const paper2 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKb'
const paper3 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKc'
const paper4 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd'
const evidence1 = 'QmTyDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKc'
const evidence2 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd'
const evidence3 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKe'
const evidence4 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKf'
const papers = [paper1, paper2, paper3, paper4];
const eveidneces = [evidence1, evidence2, evidence3, evidence4]


describe('------ Detract Flow Tests ------', function () {
    let deployer
    let detractContract
    let sci1
    let sci2
    let sci3
    let challenger1
    let challenger2
    let challenger3

    before(async function () {
        [deployer, sci1, sci2, sci3, challenger1, challenger2, challenger3] = await ethers.getSigners();
    });

    describe('Detract Flow', function () {
        it('Should deploy Detract contract ', async function () {
            console.log(`Deploying Detract contract with ${deployer.address}`);
            const DetractContract = await ethers.getContractFactory('Detract');
            detractContract = await DetractContract.deploy();
            console.log("Detract deployed to:", detractContract.address);
            expect(await detractContract.getAddress()).to.be.a.properAddress;
        });

        it('Should publish papers', async function () {
            const paper1Hash = ethers.id(paper1);
            await detractContract.publishPaper(paper1, sci1);
            const paperOwner = await detractContract.paperOwner(paper1Hash);
            expect(paperOwner).to.equal(sci1.address);
        });

        it('Should publish papers', async function () {

        });

        it('Should Challenge the paper with evience', async function () {
            const paper1Hash = ethers.id(paper1);
            const minStakeAmount = await detractContract.minStakingAmountForDetract();
            console.log({ minStakeAmount: minStakeAmount.toString() })
            await detractContract.connect(challenger1).challengePaper(paper1, evidence1, { value: minStakeAmount });
            expect(await detractContract.challenger(paper1Hash)).to.equal(challenger1.address);
        })

        it('should upvote the challenge', async function () {
            const paper1Hash = ethers.id(paper1);
            console.log({ paper1Hash })
            await detractContract.connect(sci1).upVote(paper1);
            const upvoteCount = await detractContract.upVoteCount(paper1Hash);
            expect(upvoteCount).to.equal(1);
        })

        it('should upvote the challenge by 2', async function () {
            const paper1Hash = ethers.id(paper1);
            await detractContract.connect(sci2).upVote(paper1);
            const upvoteCount = await detractContract.upVoteCount(paper1Hash);
            expect(upvoteCount).to.equal(2);
        })
        it('should downVote the challenge by 1s', async function () {
            const paper1Hash = ethers.id(paper1);
            await detractContract.connect(sci3).downVote(paper1);
            const downVoteCount = await detractContract.downVoteCount(paper1Hash);
            expect(downVoteCount).to.equal(1);
        })

        // it('should be able to claim token by challenger on winning', async function () {
        //     const paper1Hash = ethers.id(paper1);
        //     const evidence1Hash = ethers.id(evidence1);
        //     const challenger1BalanceBefore = await challenger1.getBalance();
        //     await detractContract.connect(challenger1).claimToken(paper1Hash, evidence1Hash);
        //     const challenger1BalanceAfter = await challenger1.getBalance();
        //     expect(challenger1BalanceAfter).to.be.gt(challenger1BalanceBefore);
        // })




    });


});