import { FC, PropsWithChildren } from "react";
import { Footer, Nav } from "..";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex flex-col">
      <section className="lg:px-16 w-full">{children}</section>
      <Footer />
    </main>
  );
};
