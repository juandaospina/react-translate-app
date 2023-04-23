import { FromLanguage, Language } from "./languages";

const ACTIONS = {
  interchangeLanguage: "INTERCHANGE_LANGUAGES",
  setFromLanguage: "SET_FROM_LANGUAGE",
  setToLanguage: "SET_TO_LANGUAGE",
  setFromText: "SET_FROM_TEXT",
  setResult: "SET_RESULT",
} as const;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

type Actions = typeof ACTIONS[keyof typeof ACTIONS];

// export interface Action {
//   type: Actions;
//   payload?: any;
// }

// Or, This option type the action entry in the reducer 
export type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE", payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE", payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
