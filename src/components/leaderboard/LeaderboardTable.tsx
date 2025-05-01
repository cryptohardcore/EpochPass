import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { formatAddress, formatTimeAgo } from '../../utils/formatters';

export interface LeaderboardEntry {
  address: string;
  timestamp: number; // Unix timestamp
  rank: number;
  tier: string;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
}

type SortField = 'rank' | 'timestamp';
type SortDirection = 'asc' | 'desc';

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  isLoading = false,
}) => {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'rank') {
      return (a.rank - b.rank) * direction;
    } else {
      return (a.timestamp - b.timestamp) * direction;
    }
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="spinner inline-block w-6 h-6 border-2 border-t-2 border-primary-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-gray-400">Loading leaderboard data...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort('rank')}
            >
              <div className="flex items-center">
                Rank
                {getSortIcon('rank')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort('timestamp')}
            >
              <div className="flex items-center">
                First Interaction
                {getSortIcon('timestamp')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Tier
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900/50 divide-y divide-gray-800">
          {sortedEntries.map((entry, index) => (
            <motion.tr
              key={entry.address}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="hover:bg-gray-800 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-white">#{entry.rank}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">
                    {formatAddress(entry.address)}
                  </div>
                  <a
                    href={`https://etherscan.io/address/${entry.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-gray-400 hover:text-primary-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {formatTimeAgo(entry.timestamp)}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(entry.timestamp * 1000).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${entry.tier === 'OG' ? 'bg-purple-900 text-purple-100' : 
                  entry.tier === 'Captain' ? 'bg-blue-900 text-blue-100' : 
                  entry.tier === 'Corporal' ? 'bg-green-900 text-green-100' : 
                  'bg-gray-800 text-gray-100'}`}
                >
                  {entry.tier}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-400 hover:text-primary-300 mr-3">
                  Details
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      {entries.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;