import React, { useMemo } from "react";

import { RecordTranslation } from "../../types/history";
import { IconHistory } from "../Icons/history";
import { TranslationItem } from "..";
import "../../styles/TranslationList.css";

interface Props {
  translations: RecordTranslation[];
}

export const TranslationHistoryList: React.FC<Props> = ({ translations = [] }) => {

  const list = useMemo(() => {
    return translations.map(item => {
      return {
        ...item,
        create: false
      }
    })
  }, [translations]);

  return (
    <div style={{ marginBottom: 2 }}>
      <div className="title">
        <h4>Historial</h4>
        <IconHistory />
      </div>
      {translations.length === 0 ? (
        <h6>No se encontraron resultados</h6>
      ) : (
        <div className="wrap-translations">
          {list?.map((translate) => (
            <TranslationItem key={translate.id} item={translate} />
          ))}
        </div>
      )}
    </div>
  );
};
