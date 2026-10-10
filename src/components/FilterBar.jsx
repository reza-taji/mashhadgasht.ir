import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { categories, AllIcon } from '../data/categories';
import { useI18n } from '../i18n/I18nProvider';

export default function FilterBar({ category, onCategory, tag, onTag, sort, onSort, count, query, onClear }) {
  const { t, number } = useI18n();
  const [showTags, setShowTags] = useState(false);
  return <div className="filter-area">
    <div className="filter-bar">
      <div className="category-tabs" role="group" aria-label={t('discover')}>
        {[{ id: 'all', icon: AllIcon }, ...categories].map(({ id, icon: Icon }) => <button key={id} className={`filter-tab ${category === id ? 'active' : ''}`} aria-pressed={category === id} onClick={() => onCategory(id, false)}><Icon size={17} strokeWidth={1.6} />{t(id)}</button>)}
      </div>
      <button className={`filter-toggle ${showTags || tag ? 'active' : ''}`} aria-expanded={showTags} onClick={() => setShowTags(!showTags)}><SlidersHorizontal size={17} />{t('filters')}{tag && <span className="filter-dot" />}</button>
    </div>
    {showTags && <div className="tag-panel"><span>{t('tags')}</span>{['free', 'culture', 'nature', 'shopping', 'family'].map(id => <button key={id} className={tag === id ? 'active' : ''} aria-pressed={tag === id} onClick={() => onTag(tag === id ? '' : id)}>{t(id)}</button>)}</div>}
    <div className="results-row"><p aria-live="polite"><strong>{number(count)}</strong> {t('results')}{query && <span className="query-label">«{query}»</span>}{(query || tag || category !== 'all') && <button className="clear-filter" onClick={onClear} aria-label={t('clear')}><X size={13} />{t('clear')}</button>}</p><label className="sort-select"><span>{t('sort')}</span><select value={sort} onChange={event => onSort(event.target.value)} aria-label={t('sort')}><option value="recommended">{t('recommended')}</option><option value="alphabetical">{t('alphabetical')}</option></select><ChevronDown size={13} /></label></div>
  </div>;
}
