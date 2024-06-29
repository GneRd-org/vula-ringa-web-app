import { FC } from "react";

interface HeadingProps {
  heading: string;
  heading2: string;
}

export const Heading: FC<HeadingProps> = ({ heading, heading2 }) => {
  return (
    <header className="flex flex-col gap-3">
      <div className="bg-gradient-to-r from-primary to-secondary h-2 w-16" />
      <h1 className="text-4xl font-bold">{heading}</h1>
      <h1 className="text-4xl ">{heading2}</h1>
    </header>
  );
};
