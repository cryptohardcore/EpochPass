import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Gift, Sparkles, Ticket, Crown, Clock, LockKeyhole } from 'lucide-react';

const PerksPage = () => {
  const perks = [
    {
      title: 'Early Access to Products',
      description: 'Be the first to try new blockchain products before they launch to the public',
      icon: <Clock className="w-8 h-8 text-primary-400" />,
      available: false,
    },
    {
      title: 'Exclusive Community',
      description: 'Join private Discord channels with other OG Ethereum users',
      icon: <Crown className="w-8 h-8 text-primary-400" />,
      available: false,
    },
    {
      title: 'Airdrops',
      description: 'Qualify for special airdrops from partner projects',
      icon: <Gift className="w-8 h-8 text-primary-400" />,
      available: false,
    },
    {
      title: 'Event Tickets',
      description: 'Get priority access to blockchain events and conferences',
      icon: <Ticket className="w-8 h-8 text-primary-400" />,
      available: false,
    },
    {
      title: 'Special Badge',
      description: 'Display your EpochPass tier on your social media profiles',
      icon: <Sparkles className="w-8 h-8 text-primary-400" />,
      available: false,
    },
    {
      title: 'Partner Discounts',
      description: 'Receive special discounts on partner services and products',
      icon: <LockKeyhole className="w-8 h-8 text-primary-400" />,
      available: false,
    },
  ];

  return (
    <div className="container-custom py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">EpochPass Perks</h1>
          <p className="text-gray-400">
            Special benefits for EpochPass holders based on your tier and rank.
          </p>
        </div>
        
        {/* Coming Soon Notice */}
        <div className="mb-10">
          <div className="card p-4 md:p-6 bg-gray-900/70 border border-primary-900">
            <div className="flex items-start">
              <div className="mr-4 hidden sm:block">
                <AlertCircle className="w-8 h-8 text-primary-400" />
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 sm:hidden text-primary-400" />
                  Coming Soon
                </h2>
                <p className="text-gray-300">
                  We're working on something special! The perks program for EpochPass holders 
                  is currently under development and will be launching soon.
                </p>
                <div className="mt-4">
                  <button className="btn-primary">
                    Get Notified
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 relative overflow-hidden"
            >
              {/* Locked overlay */}
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <LockKeyhole className="w-10 h-10 text-gray-600 mb-2" />
                <p className="text-gray-400 font-medium">Coming Soon</p>
              </div>
              
              <div className="mb-4">
                {perk.icon}
              </div>
              
              <h3 className="text-lg font-medium mb-2">{perk.title}</h3>
              <p className="text-gray-400 text-sm">{perk.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Tier Benefits */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Tier Benefits</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Benefit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Soldier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Corporal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Captain
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    OG
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/50 divide-y divide-gray-800">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    Airdrop Eligibility
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    ✓
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    ✓✓
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    ✓✓✓
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    ✓✓✓✓
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    Discord Access
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    Basic
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    Extended
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    Premium
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    OG Lounge
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    Partner Discounts
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    5%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    10%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    15%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    25%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    Event Access
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    General
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    Priority
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    VIP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    Backstage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerksPage;