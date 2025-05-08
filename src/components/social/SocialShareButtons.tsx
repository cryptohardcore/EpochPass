import React from 'react';
import { Twitter, Send, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialShareButtonsProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  title,
  text,
  url,
  className = '',
}) => {
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareOnFarcaster = () => {
    // This is a placeholder as Farcaster doesn't have a standard web share URL
    // In a real app, you'd integrate with Farcaster's API or their SDK
    alert('Farcaster sharing would be implemented with their API');
  };

  const shareOnLens = () => {
    // This is a placeholder as Lens doesn't have a standard web share URL
    // In a real app, you'd integrate with Lens Protocol API or their SDK
    alert('Lens sharing would be implemented with their API');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for desktop or unsupported browsers
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={shareOnTwitter}
        className="btn-outline p-2.5 rounded-full"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={shareOnTelegram}
        className="btn-outline p-2.5 rounded-full"
        aria-label="Share on Telegram"
      >
        <Send className="w-4 h-4" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={shareNative}
        className="btn-outline p-2.5 rounded-full"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default SocialShareButtons;