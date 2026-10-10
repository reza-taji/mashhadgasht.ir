import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, SearchX, Sparkles } from 'lucide-react';
import { useI18n } from './i18n/I18nProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import PlaceCard from './components/PlaceCard';
import PlaceDialog from './components/PlaceDialog';
import Footer, { TravelBanner } from './components/Footer';
import faPlaces from './data/places.fa.json';
import arPlaces from './data/places.ar.json';
import enPlaces from './data/places.en.json';
import { filterPlaces } from './data/search';

const datasets = { fa: faPlaces, ar: arPlaces, en: enPlaces };

export default function App() {
  const { language, t } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(6);
  const [savedOnly, setSavedOnly] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [saved, setSaved] = useState(() => {
    try { const value = JSON.parse(localStorage.getItem('mashhad-saved') || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem('mashhad-saved', JSON.stringify(saved)); } catch {} }, [saved]);
  useEffect(() => { setQuery(''); }, [language]);
  useEffect(() => { setVisibleCount(6); }, [query, category, tag, sort, savedOnly, language]);
  const places = datasets[language];
  const filtered = useMemo(() => filterPlaces(places, { query, category, tag, sort, savedOnly, saved, language }), [places, query, category, tag, sort, savedOnly, saved, language]);
  const openPlace = places.find(place => place.id === openId);
  function selectCategory(id, scroll = true) { setCategory(id); setSavedOnly(false); if (scroll) { setTag(''); setQuery(''); document.getElementById('discover').scrollIntoView({ behavior: 'smooth' }); } }
  function toggleSave(id) { setSaved(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]); }
  function clearFilters() { setCategory('all'); setTag(''); setQuery(''); }
  function showSaved() { setSavedOnly(!savedOnly); clearFilters(); document.getElementById('discover').scrollIntoView({ behavior: 'smooth' }); }
  return <>
    <a className="skip-link" href="#discover">{t('skip')}</a>
    <Header query={query} onSearch={setQuery} onCategory={selectCategory} savedOnly={savedOnly} onSaved={showSaved} savedCount={saved.length} />
    <main className="min-h-screen">
      <Hero query={query} onSearch={setQuery} onCategory={selectCategory} category={category} />
      <section className="discover-section container" id="discover">
        <nav className="breadcrumbs" aria-label={t('home')}><a href="#" onClick={() => { clearFilters(); setSavedOnly(false); }}>{t('home')}</a><ArrowLeft size={11} className="direction-arrow" /><span>{t('discover')}</span></nav>
        <div className="section-heading"><div><div className="section-eyebrow"><span>✦</span>{t('sectionEyebrow')}</div><h2>{t(savedOnly ? 'savedTitle' : 'sectionTitle')}</h2><p>{t('sectionText')}</p></div><div className="heading-flower" aria-hidden="true"><Sparkles size={28} strokeWidth={1} /><span /></div></div>
        <FilterBar category={category} onCategory={selectCategory} tag={tag} onTag={setTag} sort={sort} onSort={setSort} count={filtered.length} query={query} onClear={clearFilters} />
        <div className="places-grid">{filtered.slice(0, visibleCount).map(place => <PlaceCard key={place.id} place={place} saved={saved.includes(place.id)} onSave={toggleSave} onOpen={setOpenId} />)}</div>
        {filtered.length === 0 && <div className="empty-state"><SearchX size={36} strokeWidth={1.3} /><h3>{t('empty')}</h3><p>{t('emptyText')}</p><button className="secondary-button" onClick={() => { clearFilters(); setSavedOnly(false); }}>{t('back')}<ArrowLeft size={16} className="direction-arrow" /></button></div>}
        {visibleCount < filtered.length && <div className="load-more"><button className="secondary-button" onClick={() => setVisibleCount(previous => previous + 6)}>{t('more')}<ChevronDown size={17} /></button></div>}
        <TravelBanner onCategory={selectCategory} />
      </section>
    </main>
    <Footer onCategory={selectCategory} />
    {openPlace && <PlaceDialog place={openPlace} onClose={() => setOpenId(null)} saved={saved.includes(openPlace.id)} onSave={toggleSave} />}
  </>;
}
