import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { detractContractAddress, detractContractAbi } from "../constants/contract";

import { useAuthContext } from "../contexts/AuthContext";


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

    const getMinimumStakeAmount = useCallback(async () => {
        try {
            console.log({ contract })
            const result = await contract.minStakingAmountForDetract();
            return result.toString();
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }, []);

    const challengePaper = async (paper, evidence) => {
        try {
            const stakeAmount = await getMinimumStakeAmount();
            console.log({ stakeAmount })
            const result = await contract.challengePaper(paper, evidence, { value: stakeAmount.toString() });
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
        setContract(getContract());
    }, [setContract])



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
