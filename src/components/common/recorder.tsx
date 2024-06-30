import { useEffect, useRef, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { IoMicCircle } from "react-icons/io5";
import { SoundWave } from "./sound-wave";

export const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [amplitude, setAmplitude] = useState(10);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64String(base64String.split(",")[1]); // Remove the data URL prefix
      };
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    console.log(base64String);
    let amplitudeInterval: NodeJS.Timeout;
    if (isRecording) {
      amplitudeInterval = setInterval(() => {
        setAmplitude(Math.random() * 30 + 10);
      }, 100);
    } else {
      setAmplitude(10);
    }
    return () => clearInterval(amplitudeInterval);
  }, [isRecording]);

  return (
    <div className="flex justify-center flex-col items-center">
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? (
          <FaStopCircle className="text-red-300 text-8xl" />
        ) : (
          <IoMicCircle className="text-red-300 text-8xl" />
        )}
      </button>
      <SoundWave amplitude={amplitude} />
      {audioUrl && (
        <div>
          <h2>Your Audio</h2>
          <audio src={audioUrl} controls />
        </div>
      )}
    </div>
  );
};
