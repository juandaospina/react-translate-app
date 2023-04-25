import React, { useEffect } from "react";
import "./App.css";

import { Container, Row, Col, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  LanguageSelector,
  TextArea,
  Clipboard,
  VoiceSound,
} from "./components";
import { useDataReducer } from "./hooks/useDataReducer";
import { AUTO_LANGUAGE } from "./constants";
import { useDebounce } from "./hooks/useDebounce";
import { translator } from "./services/translator";

export const AppRoot = () => {
  const {
    fromLanguage,
    fromText,
    loading,
    toLanguage,
    result,
    setInterchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useDataReducer();
  const isDisabled: boolean = fromLanguage === AUTO_LANGUAGE || fromLanguage === toLanguage;
  const debounceFromText = useDebounce<string>(fromText, 2000);
  console.log("translations", JSON.parse(localStorage.getItem('history_translation') ?? ''))

  useEffect(() => {
    (async () => {
      if (debounceFromText === "") return;
      let _history = JSON.parse(localStorage.getItem('history_translation') as string) ?? []

      try {
        const response = await translator({
          fromLanguage,
          toLanguage,
          text: debounceFromText,
        });
        setResult(response);
        const newResult = {
          id: window.crypto.randomUUID(),
          text: debounceFromText,
          translation: response,
        }
        localStorage.setItem('history_translation', JSON.stringify([..._history, newResult]))
        // console.log(_history)
      } catch (error) {
        console.log("[error]", error);
      }
    })();
  }, [debounceFromText, fromLanguage, toLanguage]);

  return (
    <React.Fragment>
      <h2>Google Translate Clone</h2>
      <Container fluid>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type="from"
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <div style={{ position: "relative" }}>
                <TextArea onChange={setFromText} type="from" value={fromText} />
              </div>
            </Stack>
          </Col>

          <Col>
            <button
              onClick={() => setInterchangeLanguage()}
              className="btn-interchange active"
              disabled={isDisabled}
            >
              <span className={!isDisabled ? "active" : "disabled"}>⇄</span>
              {/* <span>Intercambiar</span> */}
            </button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type="to"
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div style={{ position: "relative" }}>
                <TextArea
                  onChange={setResult}
                  loading={loading}
                  type="to"
                  value={result}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <Clipboard value={result} />
                  <VoiceSound value={result} lang={toLanguage}/>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
