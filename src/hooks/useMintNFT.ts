import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract';
import { useEpochWallet } from '../contexts/WalletContext';



export const useMintNFT = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConnected, account } = useEpochWallet();


const handleMint = useCallback(async (imageHash: string = 'QmYourImageHashExample') => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return null;
    }

    if (!isConnected || !account) {
      setError('Please connect your wallet first!');
      return null;
    }

    try {
      setIsMinting(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

// Проверка баланса аккаунта
      const balance = await provider.getBalance(userAddress);
      const balanceInEther = ethers.formatEther(balance);
      console.log(`Balance of ${userAddress}: ${balanceInEther} ETH`);
      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const mintPrice = ethers.parseEther('0.05');
      const tx = await contract.mint(imageHash, { value: mintPrice });

      console.log('Mint tx sent:', tx.hash);
      const receipt = await tx.wait();
      if (receipt.status !== 1) {
        throw new Error(`Transaction failed with status ${receipt.status}`);
      }

      let tokenId: string | null = null;
      for (const log of receipt.logs) {
        let parsed: ethers.LogDescription | null = null;
        try {
          parsed = contract.interface.parseLog(log);
        } catch {
          continue;
        }
        if (parsed && parsed.name === 'Minted' && parsed.args.to.toLowerCase() === userAddress.toLowerCase()) {
          tokenId = parsed.args.tokenId.toString();
          break;
        }
      }

      if (tokenId) {
        console.log('Mint successful, tokenId:', tokenId);
        alert(`NFT successfully minted! Token ID: ${tokenId}`);
        setIsMinted(true);
        return tokenId;
      } else {
        throw new Error('Transfer event not found in logs');
      }
    } catch (err: unknown) {
      console.error('Mint failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      return false;
    } finally {
      setIsMinting(false);
    }
  }, [isConnected, account]);

  return { handleMint, isMinting, isMinted, error };
};