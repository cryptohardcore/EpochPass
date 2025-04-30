import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hourglass, Clock, Trophy, Sparkles } from 'lucide-react';
import AddressInput from '../components/wallet/AddressInput';
import { useWallet } from '../contexts/WalletContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnected } = useWallet();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (address: string) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      navigate('/dashboard', { state: { address } });
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
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
                      onClick={() => connectWallet()}
                      className="btn-primary"
                    >
                      Connect Wallet
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
      
      {/* Features Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How EpochPass Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform records the first on-chain interactions of Ethereum addresses, 
              allowing you to discover and showcase your place in crypto history.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="rounded-full bg-primary-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Time</h3>
              <p className="text-gray-400">
                Discover exactly when you first interacted with the Ethereum blockchain
                and how long you've been part of the ecosystem.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="rounded-full bg-secondary-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Ranking</h3>
              <p className="text-gray-400">
                See your rank among all Ethereum addresses based on your first transaction
                date and showcase your OG status.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="rounded-full bg-accent-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mint Soulbound NFT</h3>
              <p className="text-gray-400">
                Create a unique, non-transferable NFT that represents your place in
                Ethereum history and unlocks special perks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to claim your spot?</h2>
                <p className="text-gray-400">
                  Connect your wallet now and discover your place in Ethereum history.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => connectWallet()}
                  className="btn-primary px-6 py-3"
                >
                  Connect Wallet
                </button>
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="btn-outline px-6 py-3"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;