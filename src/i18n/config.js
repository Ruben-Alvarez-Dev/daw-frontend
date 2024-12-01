import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          sidebar: {
            global: 'Global',
            restaurants: 'Restaurantes',
            users: 'Usuarios',
            tables: 'Mesas',
            reservations: 'Reservas',
            settings: 'Configuración',
            expandMenu: 'Expandir menú',
            collapseMenu: 'Contraer menú'
          }
        }
      },
      en: {
        translation: {
          sidebar: {
            global: 'Global',
            restaurants: 'Restaurants',
            users: 'Users',
            tables: 'Tables',
            reservations: 'Reservations',
            settings: 'Settings',
            expandMenu: 'Expand menu',
            collapseMenu: 'Collapse menu'
          }
        }
      }
    }
  });

export default i18n;
