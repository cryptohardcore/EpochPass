import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface MintButtonProps {
  price: string;
 onMint: (imageHash?: string) => Promise<string | false>;
  disabled?: boolean;
  isMinting?: boolean;
  isMinted?: boolean;
  error?: string | null;
  className?: string;
}

const MintButton: React.FC<MintButtonProps> = ({
  price,
  onMint,
  disabled = false,
  isMinting = false,
  isMinted = false,
  error = null,
  className = '',
}) => {
  const handleMint = async () => {
    if (disabled || isMinting) return;
    await onMint();
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
      ) : isMinted ? (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Minted!
        </>
      ) : error ? (
        <>
          <span className="w-5 h-5 mr-2">⚠️</span>
          Error
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