import React, { useState, useEffect } from 'react';
import { getLegalTranslation } from '../lib/i18n-legal';
import { Language } from '../lib/i18n';

interface CookieConsentProps {
  lang: Language;
}

export default function CookieConsent({ lang }: CookieConsentProps) {
  const t = getLegalTranslation(lang);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-6 md:pb-8 flex justify-center pointer-events-none">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl p-6 rounded-2xl max-w-3xl w-full pointer-events-auto flex flex-col md:flex-row items-center gap-6 transition-colors duration-300">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">{t.cookieTitle}</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {t.cookieText}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleDecline}
            className="px-6 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium hover:bg-stone-800 dark:hover:bg-white shadow-md transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
