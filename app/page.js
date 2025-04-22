'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('Not Connected');
  const [firstTxDate, setFirstTxDate] = useState('');
  const [points, setPoints] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        setStatus('Connected');
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const checkScore = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }
    const alchemyApiKey = 'D58XPcpaMPHKrXvOIB_dV5Bxyhd6osAn';
    const url = `https://eth-mainnet.g.alchemy.com/v2/{alchemyApiKey}`;
    const data = {
      jsonrpc: "2.0",
      id: 0,
      method: "alchemy_getAssetTransfers",
      params: [{
        fromAddress: walletAddress,
        category: ["external"],
        order: "asc",
        maxCount: "1"
      }]
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const resJson = await response.json();
      const transfer = resJson.result.transfers[0];
      if (transfer) {
        const firstTxTimestamp = new Date(transfer.metadata.blockTimestamp);
        setFirstTxDate(firstTxTimestamp.toDateString());

        const currentTimestamp = Date.now() / 1000;
        const firstInteractionTimestamp = firstTxTimestamp.getTime() / 1000;
        const years = (currentTimestamp - firstInteractionTimestamp) / 31536000;
        const calculatedPoints = Math.floor(years * 100);
        setPoints(calculatedPoints > 0 ? calculatedPoints : 0);
      } else {
        setFirstTxDate('No transactions found');
        setPoints(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container">
      <img src="/vitalik-frog.png" alt="Vitalik Frog" className="frog-image" />
      <h1>Ethereum OG Score</h1>
      <p>Discover how long you've been using Ethereum.</p>
      <input type="text" value={walletAddress} placeholder="Enter your Ethereum wallet address..." readOnly />
      <div className="button-group">
        <button className="check-btn" onClick={checkScore}>Check Score</button>
        <button className="connect-btn" onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div style={marginTop: '20px'}>
        <p>Status: {status}</p>
        {firstTxDate && <p>First Interaction: {firstTxDate}</p>}
        {points !== '' && <p>Earned Points: {points}</p>}
      </div>
    </main>
  );
}
