import { ArrowLeft, MapPin, Search, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { categories } from '../data/categories';

export default function Hero({ query, onSearch, onCategory, category }) {
  const { t } = useI18n();
  return <>
    <section className="hero">
      <img className="hero-image" src="/images/shrine.webp" alt={t('heroCaption')} fetchPriority="high" width="1600" height="980" />
      <div className="hero-overlay" />
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-eyebrow"><span className="tiny-star">✦</span>{t('eyebrow')}</span>
          <h1>{t('heroTitle')}<br /><span>{t('heroAccent')}</span></h1>
          <p>{t('heroText')}</p>
          <form className="hero-search" onSubmit={event => { event.preventDefault(); document.getElementById('discover').scrollIntoView({ behavior: 'smooth' }); }}>
            <Search size={23} aria-hidden="true" /><input value={query} onChange={event => onSearch(event.target.value)} placeholder={t('heroSearch')} aria-label={t('heroSearch')} />
            <button type="submit" aria-label={t('explore')}><ArrowLeft size={22} className="ltr:rotate-180 rtl:rotate-0" /></button>
          </form>
          <div className="popular-searches"><span>{t('popular')}</span>{t('popularTags').map(tag => <button key={tag} onClick={() => { onSearch(tag); document.getElementById('discover').scrollIntoView({ behavior: 'smooth' }); }}>{tag}</button>)}</div>
        </div>
        <div className="hero-caption"><span className="caption-icon"><MapPin size={19} /></span><div><strong>{t('heroCaption')}</strong><small>{t('heroLocation')}</small></div><Sparkles size={16} /></div>
      </div>
      <div className="hero-index" aria-hidden="true"><span /><span /><span /></div>
    </section>
    <div className="category-shortcuts container">
      {categories.map(({ id, icon: Icon, tone }) => <button key={id} onClick={() => onCategory(id)} className={`category-shortcut ${category === id ? 'selected' : ''}`} aria-pressed={category === id}>
        <span className={`shortcut-icon tone-${tone}`}><Icon size={27} strokeWidth={1.5} /></span><span>{t(id)}</span><ArrowLeft size={15} className="shortcut-arrow direction-arrow" />
      </button>)}
    </div>
  </>;
}
