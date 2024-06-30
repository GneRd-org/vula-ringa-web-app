import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";

export const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraOn(true);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = canvasRef.current.toDataURL("image/png");
        extractTextFromImage(imageData);
      }
    }
  };

  const extractTextFromImage = (imageData: string) => {
    Tesseract.recognize(imageData, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  return (
    <div>
      <h1>Camera Text Extractor</h1>
      <div>
        <video
          ref={videoRef}
          width="400"
          height="300"
          style={{ display: isCameraOn ? "block" : "none" }}
        />
        <canvas
          ref={canvasRef}
          width="400"
          height="300"
          style={{ display: "none" }}
        />
      </div>
      <div>
        <button onClick={startCamera} disabled={isCameraOn}>
          Start Camera
        </button>
        <button onClick={captureImage} disabled={!isCameraOn}>
          Capture Image
        </button>
        <button onClick={stopCamera} disabled={!isCameraOn}>
          Stop Camera
        </button>
      </div>
      {extractedText && (
        <div>
          <h2>Extracted Text</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};
