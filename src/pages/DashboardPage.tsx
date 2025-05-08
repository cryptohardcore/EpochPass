import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hourglass } from 'lucide-react';
import AddressInput from '../components/wallet/AddressInput';
import { useEpochWallet } from '../contexts/WalletContext';
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
  const { connectWallet, isConnected, account, firstTxDate, points, isChecking, checkWalletHistory } = useEpochWallet();
  const [isNftMinted, setIsNftMinted] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstTxDate && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [firstTxDate]);

  const handleSearch = async (address: string) => {
    setHasSearched(true);
    await checkWalletHistory(address);
  };

  const handleMint = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsNftMinted(true);
        resolve();
      }, 2000);
    });
  };

  const timestamp = firstTxDate ? new Date(firstTxDate).getTime() / 1000 : Date.now() / 1000;
  const timeAgo = formatDetailedTimeAgo(timestamp);
  const tier = points ? getTierFromPoints(points) : 'soldier';
  const remainingNfts = 10000 - 4253; // Mock data
  const shareUrl = `https://epochpass.eth/address/${account}`;
  const shareText = `I've been on Ethereum for ${timeAgo} and ranked #${points} on @EpochPass! Check your rank:`;

  const NoInteractionScreen = () => (
    <div className="container-custom py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My EpochPass</h1>
          <p className="text-gray-400">
            No interaction yet. Connect your wallet to see your Ethereum history.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <NFTCard
              tier="soldier"
              timestamp={Date.now() / 1000}
              imageUrl="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
              rank={0}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="relative bg-hero-pattern hero-animation">
        <div className="container-custom py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <Hourglass className="w-12 h-12 text-primary-500" />
              </div>
              <h1 className="gradient-text mb-4 glow">
                Your time in crypto, forever on-chain
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                EpochPass tracks your first interaction on Ethereum and ranks you among all wallet addresses. Get your unique time-based NFT and share your crypto journey.
              </p>
              
              <div className="max-w-xl mx-auto">
                <div className="card p-5 md:p-8 mb-6">
                  <h3 className="text-xl font-medium mb-4">Find your Ethereum rank</h3>
                  <AddressInput 
                    onSearch={handleSearch}
                    placeholder="Enter ETH address (0x...)" 
                  />
                  
                  <div className="mt-4 text-center">
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-900/70 text-gray-400">or</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setHasSearched(true);
                        connectWallet();
                      }}
                      className="btn-primary"
                      disabled={isChecking}
                    >
                      {isChecking ? 'Checking History...' : 'Connect Wallet'}
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm">
                  EpochPass is a soulbound NFT that preserves your crypto journey
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {(isConnected || hasSearched) && (
        firstTxDate ? (
          <div ref={resultsRef} className="container-custom py-8 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">My EpochPass</h1>
                <p className="text-gray-400">
                  Discover your Ethereum history and claim your unique soulbound NFT.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                  </div>
                </div>
                
                <div>
                  <div className="card p-6 md:p-8 mb-6">
                    <h2 className="text-2xl font-bold mb-6">Your Ethereum Journey</h2>
                    
                    <div className="space-y-6">
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
                      
                      <div>
                        <div className="text-lg font-medium">Time in Ethereum</div>
                        <div className="text-gray-400">{timeAgo}</div>
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoInteractionScreen />
        )
      )}
    </div>
  );
};

export default DashboardPage;