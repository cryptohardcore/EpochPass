import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Share, Clock3 } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import NFTCard from '../components/nft/NFTCard';
import MintButton from '../components/nft/MintButton';
import SocialShareButtons from '../components/social/SocialShareButtons';
import { formatDetailedTimeAgo } from '../utils/formatters';

const getTierFromPoints = (points: number): 'og' | 'captain' | 'corporal' | 'soldier' => {
  if (points >= 300) return 'og';
  if (points >= 200) return 'captain';
  if (points >= 100) return 'corporal';
  return 'soldier';
};

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, account, firstTxDate, points, isChecking, checkWalletHistory } = useWallet();
  const [loading, setLoading] = useState(true);
  const [isNftMinted, setIsNftMinted] = useState(false);
  
  const searchedAddress = location.state?.address || '';
  const displayAddress = searchedAddress || account;

  useEffect(() => {
    if (!isConnected && !searchedAddress) {
      navigate('/');
      return;
    }

    const loadData = async () => {
      if (displayAddress) {
        await checkWalletHistory(displayAddress);
      }
      setLoading(false);
    };

    loadData();
  }, [isConnected, navigate, searchedAddress, displayAddress]);

  const handleMint = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsNftMinted(true);
        resolve();
      }, 2000);
    });
  };

  if (loading || isChecking) {
    return (
      <div className="container-custom py-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="spinner inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading your data...</p>
        </div>
      </div>
    );
  }

  const timestamp = firstTxDate ? new Date(firstTxDate).getTime() / 1000 : Date.now() / 1000;
  const timeAgo = formatDetailedTimeAgo(timestamp);
  const tier = points ? getTierFromPoints(points) : 'soldier';
  const remainingNfts = 10000 - 4253; // Mock data
  const shareUrl = `https://epochpass.eth/address/${displayAddress}`;
  const shareText = `I've been on Ethereum for ${timeAgo} and ranked #${points} on @EpochPass! Check your rank:`;

  return (
    <div className="container-custom py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your EpochPass</h1>
          <p className="text-gray-400">
            Discover your Ethereum history and claim your unique soulbound NFT.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* NFT Card Section */}
          <div className="flex flex-col">
            <NFTCard
              tier={tier}
              timestamp={timestamp}
              imageUrl="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
              rank={points || 0}
            />
            
            <div className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Share your rank</h3>
                <SocialShareButtons
                  title="My EpochPass Rank"
                  text={shareText}
                  url={shareUrl}
                />
              </div>
              
              <div className="card p-4 bg-gray-900/80">
                <div className="flex items-start space-x-3">
                  <Share className="w-5 h-5 text-primary-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Share this exact message to showcase your Ethereum journey:
                    </p>
                    <p className="text-gray-400 italic text-sm mt-2">
                      "{shareText}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Details Section */}
          <div>
            <div className="card p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Your Ethereum Journey</h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="mr-4 p-3 rounded-full bg-primary-900/30">
                    <Clock className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-lg font-medium">First Transaction</div>
                    <div className="text-gray-400">
                      {firstTxDate ? new Date(firstTxDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'No transactions found'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-4 p-3 rounded-full bg-secondary-900/30">
                    <Clock3 className="w-6 h-6 text-secondary-400" />
                  </div>
                  <div>
                    <div className="text-lg font-medium">Time in Ethereum</div>
                    <div className="text-gray-400">{timeAgo}</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Claim Your Soulbound NFT</h3>
                    <span className="text-sm text-gray-400">{remainingNfts} / 10000 remaining</span>
                  </div>
                  
                  {isNftMinted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-success-700/20 border border-success-700/50 rounded-lg p-4 text-success-50"
                    >
                      <div className="font-medium">NFT successfully minted!</div>
                      <p className="text-sm opacity-80 mt-1">Your EpochPass NFT is now bound to your wallet forever.</p>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-gray-400 mb-4">
                        Preserve your Ethereum history by minting a unique, soulbound NFT that captures your timeline.
                      </p>
                      <MintButton 
                        price="0.05"
                        onMint={handleMint}
                        disabled={!isConnected}
                      />
                      {!isConnected && (
                        <p className="text-sm text-error-500 mt-2">
                          Connect your wallet to mint the NFT
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="card p-6 bg-gradient-to-r from-secondary-900/30 to-primary-900/30">
              <h3 className="text-lg font-medium mb-2">What's a Soulbound NFT?</h3>
              <p className="text-gray-400 text-sm">
                A soulbound NFT is a non-transferable token that's permanently tied to your wallet address.
                Your EpochPass NFT represents your unique place in Ethereum history and can't be sold or transferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;