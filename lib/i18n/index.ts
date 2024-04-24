import 'intl-pluralrules'

import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'

export const defaultNS = 'translation'
export const resources = {
  en: {
    translation: en,
  },
} as const

export const setupI18n = async () => {
  try {
    await i18n.use(initReactI18next).init<typeof initReactI18next>({
      lng: getLocales()[0].languageCode ?? 'en',
      fallbackLng: 'en',
      defaultNS,
      resources,
      debug: false, // Set to true when debugging
    })
  } catch (error) {
    console.error(error)
  }
}
