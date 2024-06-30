export const getLanguageFromText = async (text: string) => {
  const response = await fetch(
    `https://api.cognitive.microsofttranslator.com/detect?api-version=3.0`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AZURE_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: text }]),
    }
  );

  const data = await response.json();
  return data[0].language;
};

export const getLanguageFromSpeech = async (base64String: string) => {
  const response = await fetch(
    `https://api.cognitive.microsofttranslator.com/detect?api-version=3.0`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AZURE_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Content: base64String }]),
    }
  );

  const data = await response.json();
  return data[0].language;
};
