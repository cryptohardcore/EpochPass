'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('Not Connected');
  const [firstTxDate, setFirstTxDate] = useState('');
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddressInput = (e) => {
    setWalletAddress(e.target.value);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        setStatus('Connected');
        checkScore(accounts[0]);
      } catch (err) {
        console.error(err);
        alert("Wallet connection failed.");
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const checkScore = async (addressParam) => {
    const addressToCheck = addressParam || walletAddress;
    if (!addressToCheck) {
      alert('Please enter or connect a wallet address!');
      return;
    }

    const alchemyApiKey = 'D58XPcpaMPHKrXvOIB_dV5Bxyhd6osAn';
    const url = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;
    
    try {
      setLoading(true);
      
      // First, get the transfers
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

      const transferResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transferData)
      });
      
      if (!transferResponse.ok) {
        throw new Error(`HTTP error! status: ${transferResponse.status}`);
      }
      
      const transferJson = await transferResponse.json();
      console.log('Alchemy API Response:', transferJson);

      if (transferJson.error) {
        throw new Error(transferJson.error.message);
      }

      const transfers = transferJson?.result?.transfers || [];
      console.log('Transfers found:', transfers);

      if (transfers.length > 0) {
        const firstTransfer = transfers[0];
        console.log('First transfer:', firstTransfer);
        
        // Get block timestamp using block number
        const blockData = {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBlockByNumber",
          params: [firstTransfer.blockNum, false]
        };

        const blockResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(blockData)
        });

        if (!blockResponse.ok) {
          throw new Error(`HTTP error! status: ${blockResponse.status}`);
        }

        const blockJson = await blockResponse.json();
        console.log('Block data:', blockJson);

        if (blockJson.error) {
          throw new Error(blockJson.error.message);
        }

        const blockTimestamp = parseInt(blockJson.result.timestamp, 16) * 1000; // Convert hex to milliseconds
        const firstTxTimestamp = new Date(blockTimestamp);
        setFirstTxDate(firstTxTimestamp.toDateString());

        const currentTimestamp = Date.now();
        const years = (currentTimestamp - blockTimestamp) / (1000 * 60 * 60 * 24 * 365);
        const calculatedPoints = Math.floor(years * 100);
        setPoints(calculatedPoints > 0 ? calculatedPoints : 0);
      } else {
        setFirstTxDate('No transactions found');
        setPoints(0);
      }
    } catch (err) {
      console.error("Error fetching data from Alchemy:", err);
      setFirstTxDate('Error checking transactions');
      setPoints(0);
      alert(`Failed to retrieve score: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <img 
        src="/vitalik-frog.png" 
        alt="Vitalik Frog" 
        style={{ 
          width: '200px', 
          height: 'auto',
          marginBottom: '20px',
          borderRadius: '10px'
        }} 
      />
      <button className="wallet-btn" onClick={connectWallet}>
        {status === 'Connected' ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
      </button>
      <h1>Ethereum OG Score</h1>
      <p>Discover how long you've been using Ethereum.</p>
      <input type="text" value={walletAddress} onChange={handleAddressInput} placeholder="Enter your Ethereum wallet address..." />
      <div className="button-group">
        <button className="check-btn" onClick={() => checkScore()}>
          {loading ? "Checking..." : "Check Score"}
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {firstTxDate && <p>First Interaction: {firstTxDate}</p>}
        {points !== '' && <p>Earned Points: {points}</p>}
      </div>
    </main>
  );
}
