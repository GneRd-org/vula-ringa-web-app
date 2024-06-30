import React from "react";
import { motion } from "framer-motion";

interface SoundWaveProps {
  amplitude: number;
}

export const SoundWave: React.FC<SoundWaveProps> = ({ amplitude }) => {
  const bars = Array.from({ length: 20 });
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {bars.map((_, index) => (
        <motion.div
          key={index}
          initial={{ height: amplitude }}
          animate={{ height: [amplitude, amplitude * 2, amplitude] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          style={{
            width: 5,
            margin: "0 2px",
            backgroundColor: "red",
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
};
