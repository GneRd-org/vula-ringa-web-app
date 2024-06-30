import React, { useCallback, useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { FaCamera } from "react-icons/fa6";
import { TbCaptureFilled } from "react-icons/tb";
import { FiCameraOff } from "react-icons/fi";
import { AppStore, useAppStore } from "../../store";
import { FaCameraRotate } from "react-icons/fa6";
import { franc } from "franc";

export const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const { setShowNav } = useAppStore() as AppStore;
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front camera, 'environment' for rear camera
  const [language, setLanguage] = useState("");

  const detectLanguage = () => {
    const langCode = franc(extractedText ?? "");
    setLanguage(langCode);
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraOn(true);
    }
  };

  useEffect(() => {
    isCameraOn ? setShowNav(false) : setShowNav(true);
  }, [isCameraOn, setShowNav]);

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

  const handleToggleCamera = useCallback(() => {
    setFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
  }, []);

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
    <div className="flex flex-col gap-1">
      <div className="flex justify-center py-3">
        <video
          ref={videoRef}
          width="80%%"
          height="200"
          style={{ display: isCameraOn ? "block" : "none" }}
        />

        <canvas
          ref={canvasRef}
          width="80%"
          height="200"
          style={{ display: "none" }}
        />
      </div>
      <div className="flex justify-center items-center border-2 rounded-lg mx-4">
        <button
          className="flex gap-2 items-center font-semibold text-xs"
          onClick={startCamera}
          disabled={isCameraOn}
        >
          <FaCamera className="text-lightPurple text-lg" /> Open
        </button>
        <span className="px-2">{" | "}</span>
        <button
          className="flex gap-2 items-center font-semibold text-xs"
          onClick={captureImage}
          disabled={!isCameraOn}
        >
          <TbCaptureFilled className="bg-lightPurple" />
          Capture
        </button>
        <span className="px-2">{" | "}</span>
        <button
          className="flex gap-2 items-center font-semibold text-xs"
          onClick={stopCamera}
          disabled={!isCameraOn}
        >
          <FiCameraOff className="bg-lightPurple" /> Camera
        </button>
        <span className="px-2">{" | "}</span>
        <button
          className="flex gap-2 items-center font-semibold text-xs"
          onClick={handleToggleCamera}
        >
          {facingMode === "user" ? (
            <>
              <FaCameraRotate className="bg-lightPurple" />
              Rear Camera
            </>
          ) : (
            <>
              <FaCameraRotate className="bg-lightPurple" />
              Front Camera
            </>
          )}
        </button>
      </div>
      {extractedText && (
        <div className="flex justify-center gap-3 items-center">
          <h2 className="font-semibold">Detected Language:</h2>
          <p className="border rounded-lg my-2 px-3 py-2">{language}</p>
        </div>
      )}
    </div>
  );
};
