import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  cols: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  cols,
  className,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        return;
      }

      setCurrentText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [index, text]);

  return (
    <textarea className={className} cols={cols} value={currentText} readOnly />
  );
};
