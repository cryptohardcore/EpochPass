import React, { useState } from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { useEpochWallet } from '../../contexts/WalletContext';
import { formatAddress } from '../../utils/formatters';

interface ConnectWalletButtonProps {
  buttonClassName?: string;
  showText?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  buttonClassName = '',
  showText = true,
}) => {
  const { account, connectWallet, disconnectWallet, isConnecting, isConnected } = useEpochWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (isConnected) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    connectWallet();
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    disconnectWallet();
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="relative">
      {isConnected ? (
        // Connected state
        <button
          onClick={toggleDropdown}
          className={`btn-outline py-1.5 ${buttonClassName}`}
        >
          <Wallet className="h-4 w-4 mr-2" />
          {showText && (
            <>
              <span>{formatAddress(account || '')}</span>
            </>
          )}
        </button>
      ) : (
        // Not connected state
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`btn-primary ${buttonClassName}`}
        >
          {isConnecting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Wallet className="h-4 w-4 mr-2" />
          )}
          {showText && (
            <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
          )}
        </button>
      )}

      {/* Dropdown menu */}
      {isDropdownOpen && isConnected && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <button
              onClick={handleDisconnect}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              role="menuitem"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;