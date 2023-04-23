import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'

// keyof (las llaves) typeof (del) SUPPORTED_LANGUAGES (objeto) → Toma las key del objeto pasado
export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;
export type SectionType = 'from' | 'to';