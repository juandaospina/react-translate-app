import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Stack } from "react-bootstrap";

import { LanguageSelector, TextArea } from "./components";
import { useDataReducer } from "./hooks/useDataReducer";
import { AUTO_LANGUAGE } from "./constants";
import { translator } from "./services/translator";

export const AppRoot = () => {
  const {
    fromText,
    result,
    fromLanguage,
    toLanguage,
    loading,
    setInterchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useDataReducer();
  const isDisabled: boolean =
    fromLanguage === AUTO_LANGUAGE || fromLanguage === toLanguage;
  // console.log("[disabled]", isDisabled)

  useEffect(() => {
    (async () => {
      if (fromText === "") return;
      try {
        const response = await translator({
          fromLanguage,
          toLanguage,
          text: fromText,
        });
        setResult(response);
      } catch (error) {
        console.log("[error]", error)
      }
    })();
  }, [fromText, toLanguage]);

  return (
    <React.Fragment>
      <h2>Google Translate</h2>
      <Container fluid>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type="from"
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea onChange={setFromText} type="from" value={fromText} />
            </Stack>
          </Col>

          <Col>
            <button
              onClick={() => setInterchangeLanguage()}
              className="btn-interchange active"
              disabled={isDisabled}
            >
              <span className={!isDisabled ? "active" : "disabled"}>⇄</span>
              {/* <Icon name="exchange" className="icon" /> */}
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
              <TextArea
                onChange={setResult}
                loading={loading}
                type="to"
                value={result}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
