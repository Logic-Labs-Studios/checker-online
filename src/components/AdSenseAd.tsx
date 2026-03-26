import { useEffect, useRef, useState } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adClient?: string;
  adFormat?: string;
  className?: string;
}

let scriptInjected = false;

function injectAdSenseScript(adClient: string) {
  if (scriptInjected) return;
  scriptInjected = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export default function AdSenseAd({
  adSlot,
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX',
  adFormat = 'auto',
  className = '',
}: AdSenseAdProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Check consent on mount and whenever localStorage changes
    const check = () => {
      const consent = localStorage.getItem('cookieConsent');
      setHasConsent(consent === 'accepted');
    };
    check();
    window.addEventListener('storage', check);
    // Also poll briefly in case consent was just set in the same tab
    const interval = setInterval(check, 1000);
    return () => {
      window.removeEventListener('storage', check);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!hasConsent) return;
    injectAdSenseScript(adClient);
    try {
      // Push the ad unit
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      // silently fail in dev/localhost
    }
  }, [hasConsent, adClient]);

  if (!hasConsent) return null;

  return (
    <div className={`w-full flex justify-center overflow-hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
