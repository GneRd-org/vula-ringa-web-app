import { LangStore, useLangStore } from "../../../store";
import { Toggle } from "../../common";

export const Config = () => {
  const { fromLang, toLang, setFromLang, setToLang, textMode, setTextMode } =
    useLangStore() as LangStore;
  return (
    <section className="h-full w-full flex flex-col gap-6">
      <section className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-lightGreen h-58 px-3 py-5 rounded-bl-3xl">
            <h1 className="text-5xl font-extrabold text-center text-white">
              Settings
            </h1>
            <section className="flex items-center justify-around w-full">
              <p className="py-10 text-xs text-black font-bold w-2/3">
                Let's get you set up! and keep your default languages and other
                settings.
              </p>
            </section>
          </section>
        </section>
      </section>

      <section className="flex flex-col gap-1 items-center">
        <h2 className="text-2xl font-bold text-black">{`${
          textMode ? "Text " : "Audio"
        } Mode`}</h2>
        <Toggle
          label1="Text"
          label2="Audio"
          enabled={textMode}
          setEnabled={setTextMode}
        />
      </section>
    </section>
  );
};
