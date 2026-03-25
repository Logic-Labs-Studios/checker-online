import React from 'react';
import { getLegalTranslation } from '../lib/i18n-legal';
import { Language } from '../lib/i18n';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

interface LegalPageProps {
  lang: Language;
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export default function LegalPage({ lang, type, onBack }: LegalPageProps) {
  const t = getLegalTranslation(lang);

  const title = type === 'privacy' ? t.privacyTitle : t.termsTitle;
  const content = type === 'privacy' ? t.privacyText : t.termsText;
  const Icon = type === 'privacy' ? ShieldCheck : FileText;

  return (
    <div className="max-w-3xl w-full mx-auto p-6 bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-transparent dark:border-stone-800 transition-colors duration-300 mt-12 mb-20 relative">
      <button 
        onClick={onBack}
        className="absolute -top-14 left-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition shadow-sm font-medium"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <div className="flex items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-8">
        <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-2xl text-stone-800 dark:text-stone-300">
          <Icon size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">{title}</h1>
      </div>

      <div className="prose dark:prose-invert prose-stone max-w-none">
        <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
          {content}
        </p>
        <div className="mt-8 p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700 text-sm text-stone-500 dark:text-stone-400">
          Revisão: Política adaptada para cumprimento do RGPD, CCPA e diretrizes para publicidade automatizada. Damas Online não partilha informações sensíveis sobre si.
        </div>
      </div>
    </div>
  );
}
