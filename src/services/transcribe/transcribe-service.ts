const fileUploadURL =
  "https://vulavula-services.lelapa.ai/api/v1/transport/file-upload";
const processURL =
  "https://vulavula-services.lelapa.ai/api/v1/transport/process";

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
    const response = await fetch(processURL, {
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
    const arrayBuffer = fileReader.result as ArrayBuffer;
    
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer ?? new ArrayBuffer(0)))
    );

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

  fileReader.onerror = (error) => {
    console.error("Error reading file:", error);
  };
};

export { processAudio, uploadFile };
