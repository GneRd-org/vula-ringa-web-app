import React, { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { FaCamera } from "react-icons/fa6";
import { TbCaptureFilled } from "react-icons/tb";
import { FiCameraOff } from "react-icons/fi";
import { AppStore, LangStore, useAppStore, useLangStore } from "../../store";
import { FaCameraRotate } from "react-icons/fa6";

export const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const { setShowNav } = useAppStore() as AppStore;
  const [facingMode] = useState("user");
  const [language, setLanguage] = useState<string | null>(null);
  const { setFromLang } = useLangStore() as LangStore;

  const detectLanguage = () => {
    setLanguage("English");
  };

  useEffect(() => {
    extractedText && detectLanguage();
  }, [extractedText]);

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
      </div>
      {extractedText && (
        <>
          <div className="flex justify-center gap-3 items-center">
            <h2 className="font-semibold">Detected Language:</h2>
            <p className="border rounded-lg my-2 px-3 py-2">
              {language ? language : "Detecting..."}
            </p>
          </div>
          <section className="flex flex-col justify-center items-center">
            <h3 className="font-semibold">
              Set {language} as your source language?
            </h3>
            <section className="flex gap-3 items-center">
              <button
                onClick={() => {
                  setFromLang(language ?? "");
                  window.location.href = "/translate";
                }}
                className="bg-lightPurple text-white rounded-lg px-5 py-2"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIsCameraOn(false);
                  window.location.href = "/config";
                }}
                className="bg-lightPurple text-white rounded-lg px-5 py-2"
              >
                No
              </button>
            </section>
          </section>
        </>
      )}
    </div>
  );
};
