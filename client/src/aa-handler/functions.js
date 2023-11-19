import { ethers } from "ethers";
import  SIMPLE_FACTORY  from "./factory.json";
import  ENTRY_POINT  from "./entrypoint.json";
import  SIMPLE_ACCOUNT from "./simpleAccount.json";

const ALCHEMY_URL =
    "https://base-goerli.g.alchemy.com/v2/DHIP1pjkN-YakKhuQDC6iKQapwcWX8wZ";
  
export const getSmartWalletAddress = async (signer, address) => {
    const SIMPLE_ACCOUNT = getContractInstance(SIMPLE_FACTORY.address, SIMPLE_FACTORY.abi, signer);
    const aa_address = await SIMPLE_ACCOUNT.getAddress(address, 0);
    return aa_address;
};

export const deploySmartWallet = async (signer, address) => { 
    const SIMPLE_ACCOUNT = getContractInstance(SIMPLE_FACTORY.address, SIMPLE_FACTORY.abi, signer);
    const tx = await SIMPLE_ACCOUNT.createAccount(address, 0);
    await tx.wait();
}
  
export const sendUserop = async (accountAddress, eoaAddress, signer, tx) => { 
    // tx = {to, value, data}
    
    const smartContractAccount = getContractInstance(
        accountAddress,
        SIMPLE_ACCOUNT.abi,
        signer
    ); 

    const callData = smartContractAccount.interface.encodeFunctionData(
        "execute",
        [tx.to, tx.value, tx.data]
    );

    const ENTRY_POINT_CONTRACT = getContractInstance(
        ENTRY_POINT.address,
        ENTRY_POINT.abi,
        signer
    );

    let nonce = await ENTRY_POINT_CONTRACT.getNonce(accountAddress, 0);

    nonce = parseInt(nonce.toString());
      
    let initCode = getCode(accountAddress, eoaAddress, 0, signer.provider);

    if (initCode != "0x") {
        await deploySmartWallet(signer, eoaAddress);
        initCode = "0x"
    }
    
    const userOperation = {
        sender: accountAddress,
        nonce: "0x" + nonce.toString(16),
        initCode,
        callData,
        callGasLimit: "0x2e8b",
        verificationGasLimit: "0x1cb54",
        preVerificationGas: "0xa89c",
        maxFeePerGas: "0x59682f18",
        maxPriorityFeePerGas: "0x59682f00",
        paymasterAndData: "0x",
        signature:
        "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
    };
    
    const gasFeesOptions = {
        method: "POST",
        headers: {
        accept: "application/json",
        "content-type": "application/json",
        },
        body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_requestGasAndPaymasterAndData",
        params: [
            {
            policyId: "32acac7a-e362-40e2-960d-67c83baba5d8",
            entryPoint: ENTRY_POINT.address,
            dummySignature:
                "0xe8fe34b166b64d118dccf44c7198648127bf8a76a48a042862321af6058026d276ca6abb4ed4b60ea265d1e57e33840d7466de75e13f072bbd3b7e64387eebfe1b",
            userOperation,
            },
        ],
        }),
    };

    const gasFeesResponse = await fetchJson(ALCHEMY_URL, gasFeesOptions);
    updateUserOperationWithGasFees(userOperation, gasFeesResponse.result);
    const userOpHash = await ENTRY_POINT_CONTRACT.getUserOpHash(userOperation);
    const signedUserOpHash = await signer.signMessage(
        ethers.utils.arrayify(userOpHash)
    );
    userOperation.signature = signedUserOpHash;
    
    const sendUserOpOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "eth_sendUserOperation",
      params: [userOperation, ENTRY_POINT.address],
    }),
  };

    const sendUserOpResponse = await fetchJson(ALCHEMY_URL, sendUserOpOptions);
    console.log(sendUserOpResponse);
   return sendUserOpResponse;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

function getContractInstance(address, abi, signerOrProvider) {
  return new ethers.Contract(address, abi, signerOrProvider);
}

async function getCode(accountAddress, ownerAddress, salt, provider) {
  const code = await provider.getCode(accountAddress);
  if (code.length <= 2) {
    return concatHex([
      SIMPLE_FACTORY.address,
      encodeFunctionData({
        abi: SIMPLE_FACTORY.abi,
        functionName: "createAccount",
        args: [ownerAddress, salt],
      }),
    ]);
  }
  return "0x";
}

function updateUserOperationWithGasFees(userOperation, gasFees) {
  userOperation.preVerificationGas = gasFees.preVerificationGas;
  userOperation.verificationGasLimit = gasFees.verificationGasLimit;
  userOperation.callGasLimit = gasFees.callGasLimit;
  userOperation.maxPriorityFeePerGas = gasFees.maxPriorityFeePerGas;
  userOperation.maxFeePerGas = gasFees.maxFeePerGas;
  userOperation.paymasterAndData = gasFees.paymasterAndData;
}