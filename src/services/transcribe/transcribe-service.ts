const fileUploadURL =
  "https://vulavula-services.lelapa.ai/api/v1/transport/file-upload";
const processURL = (id: string) =>
  `https://vulavula-services.lelapa.ai/api/v1/transcribe/process/${id}`;
const processAudio = async (
  uploadId: string,
  clientToken: string,
  webhookUrl: string
) => {
  const requestBody = {
    upload_id: uploadId,
    webhook_url: webhookUrl,
  };

  //save on local storage
  localStorage.setItem("upload_id", uploadId);

  try {
    const response = await fetch(processURL(uploadId), {
      method: "POST",
      headers: {
        "X-CLIENT-TOKEN": clientToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error processing audio:", error);
  }
};

const uploadFile = async (base64String: string) => {
  const file = new File([base64String], "audio.wav", {
    type: "audio/wav",
  });

  // Create the request body
  const transportRequestBody = {
    file_name: file.name,
    audio_blob: base64String,
    file_size: file.size,
  };

  // Set the headers
  const headers = {
    "X-CLIENT-TOKEN": import.meta.env.VITE_LELAPA_API_KEY,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(fileUploadURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(transportRequestBody),
    });

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

export { processAudio, uploadFile };
