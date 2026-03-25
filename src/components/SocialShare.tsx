import { Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { getTranslation, Language } from '../lib/i18n';

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
  lang?: Language;
}

export default function SocialShare({ 
  url, 
  title,
  className = "mt-8 pt-6 border-t border-stone-200",
  lang = 'pt'
}: SocialShareProps) {
  const t = getTranslation(lang);
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || t.shareTitle);

  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-stone-500">
        {copied ? t.linkCopied : t.shareGame}
      </span>
      <div className="flex gap-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full text-stone-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          title={t.shareFacebook}
        >
          <Facebook size={20} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          title={t.shareTwitter}
        >
          <Twitter size={20} />
        </a>
        <button
          onClick={handleInstagramClick}
          className="p-3 rounded-full text-stone-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
          title={t.copyInstagram}
        >
          <Instagram size={20} />
        </button>
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full text-stone-400 hover:text-green-600 hover:bg-green-50 transition-colors"
          title={t.shareWhatsApp}
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  );
}
