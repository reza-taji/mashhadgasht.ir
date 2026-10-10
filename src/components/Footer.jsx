import { ArrowLeft, Heart, Phone, ShieldCheck, Compass, ArrowUpLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import Brand from './Brand';

export function TravelBanner({ onCategory }) {
  const { t } = useI18n();
  return <section className="travel-banner"><div className="travel-banner-text"><div className="section-eyebrow"><ShieldCheck size={16} />{t('planEyebrow')}</div><h2>{t('planTitle')}</h2><p>{t('planText')}</p><button className="primary-button" onClick={() => onCategory('services')}>{t('planButton')}<ArrowLeft size={17} className="direction-arrow" /></button></div><div className="travel-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-dot dot-one" /><span className="art-dot dot-two" /><span className="art-star">✦</span><Compass size={96} strokeWidth={0.8} /><span className="art-spark">✧</span></div></section>;
}

export default function Footer({ onCategory }) {
  const { t, number } = useI18n();
  return <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand footer /><p>{t('footerText')}</p><div className="footer-languages">فارسی <span>•</span> العربية <span>•</span> English</div></div><div className="footer-links"><h3>{t('links')}</h3>{['shrine', 'attractions', 'bazaar'].map(category => <a key={category} href="#discover" onClick={() => onCategory(category, false)}>{t(category)}<ArrowUpLeft size={13} className="direction-arrow" /></a>)}</div><div className="footer-contacts"><h3><Phone size={16} />{t('emergency')}</h3>{[{ key: 'police', phone: '110' }, { key: 'ambulance', phone: '115' }, { key: 'fire', phone: '125' }].map(item => <a href={`tel:${item.phone}`} key={item.key}><span>{t(item.key)}</span><strong dir="ltr">{number(item.phone)}</strong></a>)}</div></div><div className="footer-bottom"><span>{t('credits')} <Heart size={12} /></span><span>{t('source')}<a href="/image-credits.html" target="_blank" rel="noreferrer">{t('photoCredits')}</a></span></div></div></footer>;
}
