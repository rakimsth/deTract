import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { detractContractAddress, detractContractAbi } from "../constants/contract";

import { useAuthContext } from "../contexts/AuthContext";
import {
    useWeb3ModalSigner,
} from "@web3modal/ethers5/react";
export const useContract = () => {

    const { signer } = useAuthContext();

    const [contract, setContract] = useState(null);

    const getContract = useCallback(() => {
        try {
            const contract = new ethers.Contract(detractContractAddress, detractContractAbi, signer);
            console.log({ contract })
            return contract;
        } catch (e) {
            alert(e);
        }
    }, [signer]);

    const getVotingPeriod = async () => {
        try {
            const result = await contract.votingPeriod();
            return result.toString();
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const getMinimumStakeAmount = async () => {
        try {
            console.log(signer)
            console.log({ contract })
            const result = await contract.minStakingAmountForDetract();
            return result.toString();
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const challengePaper = async (paper, evidence) => {
        try {
            const stakeAmount = await getMinimumStakeAmount();
            console.log({ stakeAmount })
            const result = await contract.challengePaper(paper, evidence, { value: ethers.utils.parseEther("0.001") });
            console.log({ result })
            return result.wait();
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    const upVote = async (paper) => {
        try {
            const result = await contract.upVote(paper);
            return result.wait();
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    const downVote = async (paper) => {
        try {
            const result = await contract.downVote(paper);
            return result.wait();
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    useEffect(() => {
        const contract = new ethers.Contract(detractContractAddress, detractContractAbi, signer);
        console.log({ contract })
        setContract(contract);
    }, [signer])



    return {
        contract,
        getContract,
        getVotingPeriod,
        challengePaper,
        getMinimumStakeAmount,
        upVote,
        downVote

    };
};
