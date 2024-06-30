import { FC, PropsWithChildren } from "react";
import { Footer } from "..";
import useAppStore, { AppStore } from "../../store/app-store";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { showNav } = useAppStore() as AppStore;

  return (
    <main className="flex flex-col">
      <section className="lg:px-16 w-full bg-gray-100">{children}</section>
      {showNav && <Footer />}
    </main>
  );
};
