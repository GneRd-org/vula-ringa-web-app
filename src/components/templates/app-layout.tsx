import { FC, PropsWithChildren } from "react";
import { Footer } from "..";
import { AppStore, useAppStore } from "../../store/app-store";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { showNav } = useAppStore() as AppStore;
  // get current route
  const currentRoute = window.location.pathname;
  const notHome = currentRoute !== "/";
  return (
    <main className="flex flex-col">
      <section className="lg:px-16 w-full bg-gray-100">{children}</section>
      {(showNav || notHome) && <Footer />}
    </main>
  );
};
