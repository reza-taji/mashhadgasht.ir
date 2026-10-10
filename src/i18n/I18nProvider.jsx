import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { messages } from './messages';

const I18nContext = createContext(null);
export const languages = [{ code: 'fa', label: 'فارسی', short: 'FA' }, { code: 'ar', label: 'العربية', short: 'AR' }, { code: 'en', label: 'English', short: 'EN' }];

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { const saved = localStorage.getItem('mashhad-language'); return messages[saved] ? saved : 'fa'; } catch { return 'fa'; }
  });
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.title = `${messages[language].brand} | ${messages[language].brandSub}`;
    try { localStorage.setItem('mashhad-language', language); } catch {}
  }, [language]);
  const value = { language, setLanguage: code => { if (messages[code]) setLanguage(code); }, t: key => messages[language][key] ?? messages.fa[key] ?? key, number: value => new Intl.NumberFormat(language).format(value) };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }
