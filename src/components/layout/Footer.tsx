import React from 'react';
import { Link } from 'react-router-dom';
import { Hourglass, Twitter, Send, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Hourglass className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-bold gradient-text">EpochPass</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your time in crypto, forever on-chain.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Send size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-end items-center space-x-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
              Dashboard
            </Link>
            <Link to="/leaderboard" className="text-gray-400 hover:text-white transition-colors text-sm">
              Leaderboard
            </Link>
            <Link to="/perks" className="text-gray-400 hover:text-white transition-colors text-sm">
              Perks
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EpochPass. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Built with 🖤 for the Ethereum community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;