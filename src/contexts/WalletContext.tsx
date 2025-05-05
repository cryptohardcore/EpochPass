import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  provider: ethers.BrowserProvider | null;
  isConnected: boolean;
  firstTxDate: string | null;
  points: number | null;
  checkWalletHistory: (address?: string) => Promise<void>;
  isChecking: boolean;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  provider: null,
  isConnected: false,
  firstTxDate: null,
  points: null,
  checkWalletHistory: async () => {},
  isChecking: false,
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

const ALCHEMY_API_KEY = 'D58XPcpaMPHKrXvOIB_dV5Bxyhd6osAn';
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [firstTxDate, setFirstTxDate] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedAccount');
    if (savedAccount) {
      checkConnection();
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', disconnectWallet);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('disconnect', disconnectWallet);
      }
    };
  }, []);

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const ethProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await ethProvider.listAccounts();
        
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          setProvider(ethProvider);
          localStorage.setItem('connectedAccount', accounts[0].address);
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Ethereum wallet provider');
      return;
    }

    setIsConnecting(true);
    
    try {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      setAccount(accounts[0]);
      setProvider(ethProvider);
      localStorage.setItem('connectedAccount', accounts[0]);

      // Check wallet history after connecting
      await checkWalletHistory(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const checkWalletHistory = async (addressParam?: string) => {
    const addressToCheck = addressParam || account;
    if (!addressToCheck) {
      console.error('No address provided');
      return;
    }

    setIsChecking(true);
    
    try {
      // Get first transfer
      const transferData = {
        jsonrpc: "2.0",
        id: 0,
        method: "alchemy_getAssetTransfers",
        params: [{
          fromAddress: addressToCheck,
          category: ["external", "internal", "erc20", "erc721", "erc1155"],
          order: "asc",
          maxCount: "0x1"
        }]
      };

      const transferResponse = await fetch(ALCHEMY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData)
      });

      if (!transferResponse.ok) {
        throw new Error(`HTTP error! status: ${transferResponse.status}`);
      }

      const transferJson = await transferResponse.json();
      const transfers = transferJson?.result?.transfers || [];

      if (transfers.length > 0) {
        const firstTransfer = transfers[0];
        
        // Get block timestamp
        const blockData = {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBlockByNumber",
          params: [firstTransfer.blockNum, false]
        };

        const blockResponse = await fetch(ALCHEMY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blockData)
        });

        if (!blockResponse.ok) {
          throw new Error(`HTTP error! status: ${blockResponse.status}`);
        }

        const blockJson = await blockResponse.json();
        const blockTimestamp = parseInt(blockJson.result.timestamp, 16) * 1000;
        const firstTxTimestamp = new Date(blockTimestamp);
        
        setFirstTxDate(firstTxTimestamp.toISOString());

        const currentTimestamp = Date.now();
        const years = (currentTimestamp - blockTimestamp) / (1000 * 60 * 60 * 24 * 365);
        const calculatedPoints = Math.floor(years * 100);
        setPoints(calculatedPoints > 0 ? calculatedPoints : 0);
      } else {
        setFirstTxDate(null);
        setPoints(0);
      }
    } catch (error) {
      console.error('Error checking wallet history:', error);
      setFirstTxDate(null);
      setPoints(0);
    } finally {
      setIsChecking(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setFirstTxDate(null);
    setPoints(null);
    localStorage.removeItem('connectedAccount');
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      localStorage.setItem('connectedAccount', accounts[0]);
      checkWalletHistory(accounts[0]);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
        isConnecting,
        provider,
        isConnected: !!account,
        firstTxDate,
        points,
        checkWalletHistory,
        isChecking,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

declare global {
  interface Window {
    ethereum?: any;
  }
}