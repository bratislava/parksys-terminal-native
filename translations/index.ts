import i18n from 'i18n-js'
import * as Localization from 'expo-localization'

import { default as en } from './en'
import { default as sk } from './sk'

const resources = {
  sk,
  en,
} as const

i18n.translations = resources
i18n.locale = Localization.getLocales()[0].languageTag
i18n.fallbacks = true
i18n.defaultLocale = 'sk'

i18n.pluralization['sk'] = function (count) {
  const key =
    count === 0
      ? 'zero'
      : count === 1
      ? 'one'
      : [2, 3, 4].indexOf(count) >= 0
      ? 'few'
      : 'many'
  return [key]
}
