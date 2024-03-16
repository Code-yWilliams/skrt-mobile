import 'intl-pluralrules'

import { getLocales } from 'expo-localization'
import i18n, { TOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'

const locales = {
  en,
} as const

export const setupI18n = async () => {
  try {
    await i18n.use(initReactI18next).init({
      lng: getLocales()[0].languageCode ?? undefined,
      fallbackLng: 'en',
      debug: false, // Set to true when debugging
    })
    i18n.addResourceBundle('en', 'translation', locales.en, true, true)
  } catch (error) {
    console.error(error)
  }
}

export const t = (key: keyof typeof en, options?: TOptions) =>
  i18n.t(key, options)
