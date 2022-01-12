import i18next from 'i18next'
import locales from 'locales'
import { initReactI18next } from 'react-i18next'

const locale = navigator.language.split('-')[0]
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
