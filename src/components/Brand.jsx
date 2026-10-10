import { useI18n } from '../i18n/I18nProvider';

export default function Brand({ footer = false }) {
  const { t } = useI18n();
  return <a href="#" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label={t('home')}>
    <span className="brand-symbol" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M10 35h28M14 32V23c0-8 10-9 10-16 0 7 10 8 10 16v9M24 7V3M8 32V18m32 14V18M6 18h4m28 0h4M18 35V24a6 6 0 0 1 12 0v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M21 4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span>
    <span><strong>{t('brand')}</strong><small>{t('brandSub')}</small></span>
  </a>;
}
