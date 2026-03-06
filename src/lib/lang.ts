import { useTranslation } from 'react-i18next'

export type Lang = 'fr' | 'en'

export function useLang(): Lang {
  const { i18n } = useTranslation()
  return i18n.language?.startsWith('fr') ? 'fr' : 'en'
}

export function localized<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  lang: Lang
): string {
  return (obj[`${field}_${lang}`] as string) ?? ''
}
