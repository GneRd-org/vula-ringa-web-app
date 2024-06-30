import { useState, useCallback } from "react";
import Webcam from "react-webcam";

export const WebcamComponent = () => {
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front camera, 'environment' for rear camera

  const videoConstraints = {
    facingMode: facingMode,
  };

  const handleToggleCamera = useCallback(() => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        height={400}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
      />
      <button onClick={handleToggleCamera}>
        {facingMode === "user"
          ? "Switch to Rear Camera"
          : "Switch to Front Camera"}
      </button>
    </div>
  );
};
