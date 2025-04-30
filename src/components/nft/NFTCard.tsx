import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';
import { formatTimeAgo } from '../../utils/formatters';

export type Tier = 'soldier' | 'corporal' | 'captain' | 'og';

interface NFTCardProps {
  tier: Tier;
  timestamp: number; // Unix timestamp of first interaction
  imageUrl: string;
  rank: number;
}

const tiers = {
  soldier: {
    title: 'Soldier',
    gradient: 'from-gray-500 to-gray-700',
    border: 'border-gray-600',
  },
  corporal: {
    title: 'Corporal',
    gradient: 'from-green-500 to-green-700',
    border: 'border-green-600',
  },
  captain: {
    title: 'Captain',
    gradient: 'from-blue-500 to-blue-700',
    border: 'border-blue-600',
  },
  og: {
    title: 'OG',
    gradient: 'from-purple-500 to-primary-700',
    border: 'border-purple-600',
  },
};

const NFTCard: React.FC<NFTCardProps> = ({ tier, timestamp, imageUrl, rank }) => {
  const tierData = tiers[tier];
  const timeAgo = formatTimeAgo(timestamp);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card max-w-sm w-full"
    >
      <div className={`relative bg-gradient-to-br ${tierData.gradient} p-1 rounded-t-xl`}>
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold text-white">
          Tier: {tierData.title}
        </div>
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold flex items-center">
          <Trophy className="w-3 h-3 mr-1 text-yellow-400" />
          Rank #{rank}
        </div>
        <img
          src={imageUrl}
          alt={`${tierData.title} NFT`}
          className="w-full aspect-square object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1">EpochPass #{rank}</h3>
        
        <div className="flex items-center text-gray-400 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{timeAgo}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <span className="block">First interaction</span>
            <span className="block text-primary-400 font-medium">
              {new Date(timestamp * 1000).toLocaleDateString()}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn-primary text-sm`}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NFTCard;