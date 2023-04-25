import { SUPPORTED_LANGUAGES } from "../constants";

export type Language = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES] | 'Automático'

export interface RecordTranslation {
  id: string;
  from: Language;
  to: string;
  text: string;
  translation: string;
}
