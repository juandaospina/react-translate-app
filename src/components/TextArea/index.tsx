import React, { useMemo } from "react";

import { SectionType } from "../../types/languages";
import "../../styles/Textarea.css";

interface Props {
  loading?: undefined | boolean;
  onChange: (value: string) => void;
  type: SectionType;
  value: string;
}

const commonStyles = { height: "150px", border: 0 };

function getPlaceholder(type: SectionType, loading?: boolean) {
  if (type === "from") return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
}

export const TextArea: React.FC<Props> = ({
  type,
  loading,
  onChange,
  value,
}) => {

  const _text = useMemo(() => {
    return value;
  }, [value])

  const styles =
    type === "from"
      ? { ...commonStyles, border: "3px solid #F2F4F9" }
      : { ...commonStyles, backgroundColor: "#F2F4F9" };

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(type === "from") {
      const elementList = JSON.parse(localStorage.getItem("history_translation") as string) ?? [];
      const latest = elementList.length > 0 ? elementList.slice(-1)[0].translation : '_x';
      localStorage.setItem('latest', latest);
    }
    const { value } = event.target;
    onChange(value);            
  };

  return (
    <React.Fragment>
      <textarea
        // autoFocus={type === "from"}
        disabled={type === "to"}
        placeholder={getPlaceholder(type, loading)}
        style={styles}
        value={_text}
        onChange={onInputChange}
      />
    </React.Fragment>
  );
};
