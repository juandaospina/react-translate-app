import { VOICE_FOR_LANGUAGE } from "../../constants";
import { IconVoiceSound } from "../Icons/sound";
import { Language } from "../../types/languages";

interface Props {
  value: string;
  lang: Language;
}

export const VoiceSound: React.FC<Props> = ({ value, lang }) => {
  const onHandleVoiceSound = async () => {
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = VOICE_FOR_LANGUAGE[lang];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      style={{
        backgroundColor: "transparent",
      }}
      onClick={onHandleVoiceSound}
    >
      <IconVoiceSound />
    </button>
  );
};
