import { useRef, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { IoMicCircle } from "react-icons/io5";

export const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);
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
      {audioUrl && (
        <div>
          <h2>Recorded Audio</h2>
          <audio src={audioUrl} controls />
        </div>
      )}
      {/* {base64String && (
        <div>
          <h2>Base64 String</h2>
          <textarea readOnly value={base64String} rows={10} cols={50} />
        </div>x
      )} */}
    </div>
  );
};
