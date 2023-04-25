import { Form } from "react-bootstrap";

import { FromLanguage, Language } from "../../types/languages";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../../constants";
import '../../styles/LanguageSelector.css';

type Props = 
  | { type: 'from', value: FromLanguage , onChange: (language: FromLanguage) => void }
  | { type: 'to', value: Language , onChange: (language: Language) => void }

export const LanguageSelector: React.FC<Props> = ({ onChange, type, value }) => {

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    // value es un string entregado por event, onChange recibe solo 'es', 'en' o 'de' 
    // agregando as Language se le indica que trate value como Language que es igual a es', 'en', 'de'
    onChange(value as Language)
  }

  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={onChangeHandler} value={value} className="">
      { type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => {
        return (
          <option key={key} value={key}>
            {literal}
          </option>
        );
      })}
    </Form.Select>
  );
};
