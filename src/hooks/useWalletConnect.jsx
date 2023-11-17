import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalSigner,
} from "@web3modal/ethers5/react";

export const useWalletConnect = () => {
  const { open, disconnect, selectedNetworkId } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { signer } = useWeb3ModalSigner();

  return {
    open,
    disconnect,
    selectedNetworkId,
    address,
    chainId,
    isConnected,
    signer,
  };
};
