import { Bookmark, ChevronDown, Globe2, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { languages, useI18n } from '../i18n/I18nProvider';
import Brand from './Brand';

export default function Header({ query, onSearch, onCategory, savedOnly, onSaved, savedCount }) {
  const { language, setLanguage, t, number } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  function navigate(category) { onCategory(category); setMenuOpen(false); }
  return <header className="site-header">
    <div className="container header-inner">
      <Brand />
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label={t('menu')}>
        <a href="#discover" className={!savedOnly ? 'active' : ''} onClick={() => navigate('all')}>{t('discover')}</a>
        <a href="#discover" onClick={() => navigate('shrine')}>{t('shrine')}</a>
        <a href="#discover" onClick={() => navigate('services')}>{t('guide')}</a>
      </nav>
      <div className="header-actions">
        <label className="header-search"><Search size={17} /><input value={query} onChange={event => onSearch(event.target.value)} placeholder={t('search')} aria-label={t('search')} /></label>
        <button className={`icon-button saved-button ${savedOnly ? 'is-saved' : ''}`} aria-label={`${t('saved')} (${number(savedCount)})`} aria-pressed={savedOnly} onClick={onSaved}><Bookmark size={20} />{savedCount > 0 && <span className="saved-count">{number(savedCount)}</span>}</button>
        <div className="language-select"><Globe2 size={17} /><select aria-label={t('language')} value={language} onChange={event => setLanguage(event.target.value)}>{languages.map(item => <option key={item.code} value={item.code}>{item.label}</option>)}</select><ChevronDown size={13} /></div>
        <button className="icon-button mobile-menu" aria-label={t('menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </div>
  </header>;
}
