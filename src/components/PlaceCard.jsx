import { ArrowLeft, Bookmark, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { categories } from '../data/categories';

export default function PlaceCard({ place, saved, onSave, onOpen }) {
  const { t } = useI18n();
  const category = categories.find(item => item.id === place.category);
  return <article className="place-card">
    <div className="card-image-wrap">
      <button className="card-image-button" onClick={() => onOpen(place.id)} aria-label={`${t('details')}: ${place.title}`}><img src={place.image} alt={place.title} loading="lazy" width="720" height="440" /></button>
      <span className={`category-badge tone-${category.tone}`}><category.icon size={13} />{t(place.category)}</span>
      <button className={`card-save ${saved ? 'is-saved' : ''}`} onClick={() => onSave(place.id)} aria-label={saved ? t('unsave') : t('save')} aria-pressed={saved}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.7} /></button>
    </div>
    <div className="card-content"><div className="card-tags">{place.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}</div><h3><button onClick={() => onOpen(place.id)}>{place.title}</button></h3><p>{place.excerpt}</p><div className="card-address"><MapPin size={14} /><span>{place.address}</span></div><div className="card-bottom"><button onClick={() => onOpen(place.id)}>{t('details')}<ArrowLeft size={15} className="direction-arrow" /></button><a href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.join(',')}`} target="_blank" rel="noreferrer"><MapPin size={14} />{t('map')}</a></div></div>
  </article>;
}
