import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddressInputProps {
  onSearch: (address: string) => void;
  placeholder?: string;
  className?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  onSearch,
  placeholder = 'Enter wallet address (0x...)',
  className = '',
}) => {
  const [address, setAddress] = useState('');
  const [isError, setIsError] = useState(false);

  const validateAddress = (input: string) => {
    // Very basic ETH address validation - just checks format, not validity
    return /^0x[a-fA-F0-9]{40}$/.test(input);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      setIsError(true);
      return;
    }
    
    if (validateAddress(address)) {
      setIsError(false);
      onSearch(address);
    } else {
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`input pl-10 pr-16 py-3 ${
            isError 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
              : 'border-gray-700'
          }`}
          placeholder={placeholder}
        />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 -translate
          -y-1/2 btn-primary py-1.5 px-3"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
      
      {isError && (
        <p className="mt-2 text-sm text-error-500">
          Please enter a valid Ethereum address
        </p>
      )}
    </form>
  );
};

export default AddressInput;