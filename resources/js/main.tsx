import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsNL from '../lang/nl.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            nl: {
                translation: translationsNL
            }
        },
        lng: "nl",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    })

const root = createRoot(document.getElementById('app')!);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);