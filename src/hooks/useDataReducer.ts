import { useReducer } from "react";

import { FromLanguage, Language } from "../types/languages";
import { State, Action } from "../types/reducer";
// import { AUTO_LANGUAGE } from "../constants";

const initialState: State = {
  fromLanguage: "es",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === "INTERCHANGE_LANGUAGES") {
    if (state.fromLanguage === "auto") return state;
    return {
      ...state,
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
    return {
      ...state,
      loading: true,
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
    console.log("interchange_language");
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
    toLanguage,
    fromText,
    result,
    loading,
    // ↓ Methods
    setInterchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
};
