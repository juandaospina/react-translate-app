import { useReducer } from "react";

import { FromLanguage, Language } from "../types/languages";
import { State, Action } from "../types/reducer";

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === "INTERCHANGE_LANGUAGES") {
    if (state.fromLanguage === "auto") return state;
    const loading = !!state.fromText ? true : false;
    return {
      ...state,
      loading,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage as Language,
      fromText: state.result,
      result: state.fromText,
    };
  }

  if (action.type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.fromText !== "";
    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
      loading,
    };
  }
  if (action.type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== "";
    return {
      ...state,
      toLanguage: action.payload,
      loading,
      result: "",
    };
  }

  if (action.type === "SET_FROM_TEXT") {
    const loading = !!state.fromText ? true : false
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (action.type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export const useDataReducer = () => {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  function setInterchangeLanguage() {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  }

  function setFromLanguage(payload: FromLanguage) {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  }

  function setToLanguage(payload: Language) {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  }

  function setFromText(payload: string) {
    dispatch({ type: "SET_FROM_TEXT", payload });
  }

  function setResult(payload: string) {
    dispatch({ type: "SET_RESULT", payload });
  }

  return {
    // ↓ Properties
    fromLanguage,
    fromText,
    loading,
    toLanguage,
    result,
    // ↓ Methods
    setInterchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
};
