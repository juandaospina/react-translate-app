import { FromLanguage, Language } from "../types/languages";
import { instance } from "./index";

interface Props {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}

export async function translator({ fromLanguage, toLanguage, text }: Props) {
  const params = `q=${text}&source=${fromLanguage}&target=${toLanguage}`;
  const res = await instance.post(`/v2?${params}`);
  const response = await res.data.data.translations[0].translatedText;

  return response;
}
