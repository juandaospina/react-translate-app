import { RecordTranslation } from "../../types/history";
import "../../styles/TranslationItem.css";

interface Props {
  item: RecordTranslation;
}

export const TranslationItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="container-item">
      <span>{`${item.from} → ${item.to}`}</span>
      <h4>{item.text}</h4>
      <h4>{item.translation}</h4>
    </div>
  );
};
