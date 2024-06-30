const url = "https://vulavula-services.lelapa.ai/api/v1/translate/process";
import axios from "axios";

const mapLang = (lang: string) => {
  const languages: { [key: string]: string } = {
    "northern sotho": "nso_Latn",
    afrikaans: "afr_Latn",
    "southern sotho": "sot_Latn",
    swati: "ssw_Latn",
    tsonga: "tso_Latn",
    tswana: "tsn_Latn",
    xhosa: "xho_Latn",
    isizulu: "zul_Latn",
    english: "eng_Latn",
    swahili: "swh_Latn",
  };
  return languages[lang.toLowerCase()];
};

const dto = (text: string, source: string, target: string) => {
  return JSON.stringify({
    input_text: text,
    source_lang: mapLang(source),
    target_lang: mapLang(target),
  });
};
const modelTranslation = (data: any) => {
  return {
    translation: data.translation[0].translation_text,
  };
};

const translateText = (text: string, source: string, target: string) => {
  return axios
    .post(url, dto(text, source, target), {
      headers: {
        "Content-Type": "application/json",
        "X-CLIENT-TOKEN": import.meta.env.VITE_LELAPA_API_KEY as string,
      },
    })
    .then((response) => modelTranslation(response.data));
};

export { translateText };
