import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface MintButtonProps {
  price: string;
  onMint: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

const MintButton: React.FC<MintButtonProps> = ({ 
  price, 
  onMint, 
  disabled = false,
  className = ''
}) => {
  const [isMinting, setIsMinting] = useState(false);
  
  const handleMint = async () => {
    if (disabled || isMinting) return;
    
    setIsMinting(true);
    try {
      await onMint();
    } catch (error) {
      console.error('Mint error:', error);
    } finally {
      setIsMinting(false);
    }
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled || isMinting}
      onClick={handleMint}
      className={`btn btn-primary w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isMinting ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Minting...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Mint NFT • {price} ETH
        </>
      )}
    </motion.button>
  );
};

export default MintButton;