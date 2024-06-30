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

const processAudio = async (
  uploadId: string,
  clientToken: string,
  webhookUrl: string
) => {
  const requestBody = {
    upload_id: uploadId,
    webhook_url: webhookUrl,
  };

  try {
    const response = await fetch(
      "https://vulavula-services.lelapa.ai/api/v1/transport/process-audio",
      {
        method: "POST",
        headers: {
          "X-CLIENT-TOKEN": clientToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error processing audio:", error);
  }
};

const uploadFile = (audioChunks: BlobPart[]) => {
  const file = new File(audioChunks, "audio.wav", {
    type: "audio/wav",
  });

  if (!file) {
    alert("Please select a file");
    return;
  }

  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);

  fileReader.onload = async () => {
    const arrayBuffer = fileReader.result;
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    // Create the request body
    const transportRequestBody = {
      file_name: file.name,
      audio_blob: base64String,
      file_size: file.size,
    };

    // Set the headers
    const headers = {
      "X-CLIENT-TOKEN":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YjQ1MGY5MDcyOTRlM2ZhMzAyZDU0Nzg4NWNiYmEzIiwiY2xpZW50X2lkIjoyNywicmVxdWVzdHNfcGVyX21pbnV0ZSI6MCwibGFzdF9yZXF1ZXN0X3RpbWUiOm51bGx9.3xQ7MpYDtjvy7uJfIpYZ4mwI_OdVH2JTuX4OzqUmJyQ", // Replace with your actual client token
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "https://vulavula-services.lelapa.ai/api/v1/transport/file-upload",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(transportRequestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { upload_id } = data;
      processAudio(
        upload_id,
        headers["X-CLIENT-TOKEN"],
        "https://webhook.site/85a1d3f6-e293-4fd7-bb11-793f44d3008e"
      );
      // read webhook response
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  fileReader.onerror = (error) => {
    console.error("Error reading file:", error);
  };
};

export { processAudio, uploadFile };
