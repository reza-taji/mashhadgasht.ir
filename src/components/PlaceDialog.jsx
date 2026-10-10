import { useEffect, useRef } from 'react';
import { Bookmark, MapPin, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

export default function PlaceDialog({ place, onClose, saved, onSave }) {
  const { t } = useI18n();
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; element.close(); previousFocus?.focus(); };
  }, []);
  return <dialog ref={dialog} className="place-dialog" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === dialog.current) onClose(); }} aria-labelledby="place-dialog-title">
    <div className="dialog-content"><div className="dialog-image"><img src={place.image} alt={place.title} /><button className="icon-button" onClick={onClose} aria-label={t('close')} autoFocus><X size={21} /></button></div><div className="dialog-body"><div className="section-eyebrow">{t(place.category)}</div><h2 id="place-dialog-title">{place.title}</h2><p>{place.excerpt}</p><div className="dialog-tags">{place.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{t('address')}</h3><p className="dialog-address"><MapPin size={17} />{place.address}</p><p className="demo-note">{t('demo')}</p><div className="dialog-actions"><a className="primary-button" href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.join(',')}`} target="_blank" rel="noreferrer"><MapPin size={17} />{t('map')}</a><button className="secondary-button" onClick={() => onSave(place.id)} aria-pressed={saved}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />{t(saved ? 'unsave' : 'save')}</button></div></div></div>
  </dialog>;
}
