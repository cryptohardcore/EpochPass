import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hourglass } from 'lucide-react';
import AddressInput from '../components/wallet/AddressInput';
import NFTCard from '../components/nft/NFTCard';
import MintButton from '../components/nft/MintButton';
import SocialShareButtons from '../components/social/SocialShareButtons';
import { formatDetailedTimeAgo } from '../utils/formatters';

const getTierFromPoints = (points) => {
  if (points >= 3000) return 'og';
  if (points >= 2000) return 'captain';
  if (points >= 1000) return 'corporal';
  return 'soldier';
};

const HomePage = () => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (address) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wallet-history?address=${address}`);
      const data = await res.json();
      setWalletData(data);
    } catch (err) {
      console.error('Failed to fetch wallet data:', err);
      setWalletData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Your EpochPass</h1>
          <p className="text-gray-400">
            Enter any Ethereum wallet address to explore its crypto age and mint a unique NFT.
          </p>
        </div>

        <AddressInput onSearch={handleSearch} />

        {loading && (
          <div className="flex justify-center items-center py-10">
            <Hourglass className="animate-spin h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Loading wallet data...</span>
          </div>
        )}

        {walletData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            <div className="flex flex-col">
              <NFTCard
                tier={getTierFromPoints(walletData.points)}
                timestamp={new Date(walletData.firstTxDate).getTime() / 1000}
                imageUrl={walletData.imageUrl || 'https://via.placeholder.com/300'}
                rank={walletData.points}
              />

              <div className="mt-6">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Share your rank</h3>
                  <SocialShareButtons
                    title="My EpochPass Rank"
                    text={`I've been on Ethereum for ${formatDetailedTimeAgo(
                      new Date(walletData.firstTxDate).getTime() / 1000
                    )} and ranked #${walletData.points} on @EpochPass! Check your rank:`}
                    url={`https://epochpass.eth/address/${walletData.address}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <MintButton onMint={() => alert('Minting NFT...')} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
