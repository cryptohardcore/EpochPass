import React, { useState, useEffect } from 'react';
import LeaderboardTable, { LeaderboardEntry } from '../components/leaderboard/LeaderboardTable';
import AddressInput from '../components/wallet/AddressInput';

// Mock data - in a real app, this would come from your API
const mockLeaderboardData: LeaderboardEntry[] = [
  { address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', timestamp: 1438269973, rank: 1, tier: 'OG' },
  { address: '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', timestamp: 1438270167, rank: 2, tier: 'OG' },
  { address: '0x2b6ed29a95753c3ad948348e3e7b1a251080ffb9', timestamp: 1438270973, rank: 3, tier: 'OG' },
  { address: '0x9e2cb43165936e8b05ae9c109cb8a4de8f05b567', timestamp: 1438314973, rank: 4, tier: 'OG' },
  { address: '0xc78a09c9c56d9ef9ff592bbeae1d8fe45d2f7f17', timestamp: 1438369973, rank: 5, tier: 'OG' },
  { address: '0x3b873a919aa0512d5a0f09e6dcceaed5a31ed16a', timestamp: 1440869973, rank: 6, tier: 'OG' },
  { address: '0x88888136687a9aeabbc694ff780e0bf0a37edeaa', timestamp: 1443869973, rank: 7, tier: 'OG' },
  { address: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', timestamp: 1446869973, rank: 8, tier: 'OG' },
  { address: '0x5c385e1878d0c496e9dcb771e5549500a36fad31', timestamp: 1460869973, rank: 9, tier: 'OG' },
  { address: '0xc1e42f862d202b4a23b025a2c5f894195c9a78a3', timestamp: 1470869973, rank: 10, tier: 'OG' },
  { address: '0x6c6bc977e13df9b0de53b251522280bb72383700', timestamp: 1500869973, rank: 120, tier: 'Captain' },
  { address: '0x7979f6c54dba05c2e3c9bea76943a0157c9b2a94', timestamp: 1520869973, rank: 1542, tier: 'Captain' },
  { address: '0x35fb6abcfbd9e2a089eec585f1e67da89c3d2dbe', timestamp: 1540869973, rank: 5423, tier: 'Corporal' },
  { address: '0x35e46c87c671a773aa8586fc7a898e8f28b27dd6', timestamp: 1600869973, rank: 12543, tier: 'Soldier' },
];

const LeaderboardPage = () => {
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<LeaderboardEntry | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      // In a real app, fetch from your API
      setTimeout(() => {
        setLeaderboardEntries(mockLeaderboardData);
        setIsLoading(false);
      }, 1000);
    };

    fetchLeaderboard();
  }, []);

  const handleSearch = (address: string) => {
    setIsSearching(true);
    setSearchResult(null);
    
    // Simulate search delay
    setTimeout(() => {
      // Find the entry with the searched address or closest match
      const foundEntry = mockLeaderboardData.find(entry => 
        entry.address.toLowerCase() === address.toLowerCase()
      );
      
      if (foundEntry) {
        setSearchResult(foundEntry);
      } else {
        // In a real app, you would make an API call to find the address
        // For demo, we'll create a mock result
        const randomRank = Math.floor(Math.random() * 50000) + 15000;
        const mockTimestamp = 1630000000 - (randomRank * 100); // Earlier rank = earlier timestamp
        
        const tier = randomRank <= 1000 ? 'OG' : 
                    randomRank <= 5000 ? 'Captain' : 
                    randomRank <= 10000 ? 'Corporal' : 'Soldier';
        
        setSearchResult({
          address,
          timestamp: mockTimestamp,
          rank: randomRank,
          tier
        });
      }
      
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="container-custom py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ethereum Leaderboard</h1>
          <p className="text-gray-400">
            Discover the earliest adopters on the Ethereum blockchain.
          </p>
        </div>
        
        {/* Search Section */}
        <div className="card p-6 mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-medium mb-2">Find Your Rank</h2>
            <p className="text-gray-400 text-sm">
              Enter any Ethereum address to see when they first interacted with the blockchain and their rank.
            </p>
          </div>
          
          <div className="lg:flex items-start space-y-4 lg:space-y-0">
            <div className="flex-grow lg:mr-6">
              <AddressInput
                onSearch={handleSearch}
                className="mb-4 lg:mb-0"
              />
            </div>
            
            {isSearching ? (
              <div className="rounded-lg border border-gray-800 p-4 min-w-[300px] bg-gray-900/50">
                <div className="flex justify-center items-center h-24">
                  <div className="spinner inline-block w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : searchResult ? (
              <div className="rounded-lg border border-gray-800 p-4 min-w-[300px] bg-gray-900/50">
                <h3 className="font-medium mb-1">Search Result</h3>
                <p className="text-sm text-gray-400 mb-3 truncate">
                  {searchResult.address}
                </p>
                
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Rank:</span>
                  <span className="font-medium text-white">#{searchResult.rank}</span>
                </div>
                
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">First Transaction:</span>
                  <span className="font-medium text-white">
                    {new Date(searchResult.timestamp * 1000).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Tier:</span>
                  <span className={`font-medium ${
                    searchResult.tier === 'OG' ? 'text-purple-400' : 
                    searchResult.tier === 'Captain' ? 'text-blue-400' : 
                    searchResult.tier === 'Corporal' ? 'text-green-400' : 
                    'text-gray-400'
                  }`}>
                    {searchResult.tier}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        
        {/* Leaderboard Table */}
        <div className="card overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-800">
            <h2 className="text-xl font-medium">Top Ethereum Addresses</h2>
            <p className="text-gray-400 text-sm">
              The earliest adopters based on first transaction date.
            </p>
          </div>
          
          <LeaderboardTable
            entries={leaderboardEntries}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;