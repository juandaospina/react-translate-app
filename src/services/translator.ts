import { FromLanguage, Language } from "../types/languages";
import { instance } from "./index";

interface Props {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}

export async function translator({ fromLanguage, toLanguage, text }: Props) {
  const params = `q=${text}&source=${fromLanguage}&target=${toLanguage}`;
  const response = await instance.post(`/translate?${params}`).then((res) => {
    return res.data.translation;
  })
  .catch(err => {
    console.log("[err_translate]", err)
    throw Error(err);
  })
  ;

  return response;
}
