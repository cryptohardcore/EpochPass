import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createAppKit, useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { WagmiProvider } from 'wagmi';
import { mainnet } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { config } from '../config/app.config';

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  firstTxDate: string | null;
  points: number | null;
  checkWalletHistory: (address?: string) => Promise<void>;
  isChecking: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  isConnected: false,
  firstTxDate: null,
  points: null,
  checkWalletHistory: async () => {},
  isChecking: false,
  error: null,
});

export const useEpochWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

// Get API key from environment variables
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from config
const projectId = config.reown.projectId;

// 2. Get metadata from config
const metadata = config.reown.metadata;

// 3. Set the networks
const networks = [mainnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId,
  metadata,
  features: {
    analytics: true
  }
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { open } = useAppKit();
  const { address, isConnected, isConnecting } = useAccount();
  const [firstTxDate, setFirstTxDate] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setError(null);
      await open();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = () => {
    try {
      setError(null);
      wagmiAdapter.disconnect();
      setFirstTxDate(null);
      setPoints(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      setError('Failed to disconnect wallet. Please try again.');
    }
  };

  const checkWalletHistory = async (addressParam?: string) => {
    const addressToCheck = addressParam || address;
    if (!addressToCheck) {
      setError('No address provided');
      return;
    }

    setIsChecking(true);
    setError(null);
    
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

      const transferResponse = await fetch(config.alchemy.url, {
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

        const blockResponse = await fetch(config.alchemy.url, {
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
      setError('Failed to fetch wallet history. Please try again.');
      setFirstTxDate(null);
      setPoints(0);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (address) {
      checkWalletHistory(address);
    }
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        account: address || null,
        connectWallet,
        disconnectWallet,
        isConnecting,
        isConnected,
        firstTxDate,
        points,
        checkWalletHistory,
        isChecking,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

declare global {
  interface Window {
    ethereum?: Record<string, unknown>;
  }
}