import i18next from 'i18next'
import locales from 'locales'
import { initReactI18next } from 'react-i18next'
import Storage from './storage'

let locale = navigator.language
try {
  locale = JSON.parse(Storage.getItem('user')).utente.lang
} catch (e) {
  locale = navigator.language
}
i18next
  .use(initReactI18next)
  .init({
    resources: {
      ...locales
    },
    lng: locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18next
