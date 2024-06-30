const url = "https://vulavula-services.lelapa.ai/api/v1/translate/process";
import axios from "axios";

const dto = (text: string, source: string, target: string) => {
  return JSON.stringify({
    input_text: text,
    source_lang: source,
    target_lang: target,
  });
};

const translateText = (text: string, source: string, target: string) => {
  return axios.post(url, dto(text, source, target), {
    headers: {
      "Content-Type": "application/json",
      "X-CLIENT-TOKEN": import.meta.env.VITE_LELAPA_API_KEY as string,
    },
  });
};

export { translateText };
