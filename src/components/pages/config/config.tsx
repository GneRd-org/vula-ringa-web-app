import { LangStore, useLangStore } from "../../../store";
import { Dropdown, Toggle } from "../../common";

export const Config = () => {
  const { fromLang, toLang, setFromLang, setToLang, textMode, setTextMode } =
    useLangStore() as LangStore;
  return (
    <section className="h-full w-full flex flex-col gap-6">
      <section className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-tertiaryDark h-58 px-3 py-5 rounded-b-3xl">
            <h1 className="text-5xl font-extrabold text-center text-white">
              Settings
            </h1>
            <section className="flex items-center justify-around w-full">
              <p className="py-10 text-xs text-black">
                Currently translating from{" "}
                <span className="text-sm font-bold">{fromLang}</span> to{" "}
                <span className="text-sm font-bold">{toLang}</span>
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

      <section className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-2xl font-bold text-black">From Language</h2>
        <Dropdown selection={fromLang} onChange={setFromLang} />
      </section>

      <section className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-2xl font-bold text-black">To Language</h2>
        <Dropdown selection={toLang} onChange={setToLang} />
      </section>
    </section>
  );
};
