import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/vazirmatn/arabic-400.css';
import '@fontsource/vazirmatn/arabic-500.css';
import '@fontsource/vazirmatn/arabic-600.css';
import '@fontsource/vazirmatn/arabic-700.css';
import '@fontsource/vazirmatn/arabic-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import App from './App';
import { I18nProvider } from './i18n/I18nProvider';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><I18nProvider><App /></I18nProvider></React.StrictMode>);
