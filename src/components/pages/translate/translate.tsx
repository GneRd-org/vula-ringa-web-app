import { Tabs } from "../../common/tabs";
import { useState } from "react";
import { translateText } from "../../../services";
import { LangStore, useLangStore } from "../../../store";

export const Translate = () => {
  const [translatedText, setTranslatedText] = useState("");
  const { fromLang, toLang } = useLangStore() as LangStore;

  const handleTranslate = () => {
    const text = document.querySelector("textarea")?.value;
    if (!text) return;

    translateText(text, fromLang || "en", toLang || "en").then((result) => {
      console.log(result);
    });
  };

  return (
    <section className="h-screen w-full flex flex-col gap-6">
      <section className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-lightGreen h-58 px-3 py-5 rounded-b-3xl">
            <h1 className="text-5xl font-extrabold text-center text-white">
              Translate
            </h1>
            <section className="flex items-center justify-around w-full">
              <p className="py-10 text-xs text-black font-bold w-2/3">
                Your friend in a foreign land. Let us translate from{" "}
                <span className="text-primary font-extrabold">{fromLang}</span>{" "}
                to <span className="text-primary font-extrabold">{toLang}</span>
              </p>
            </section>
          </section>
        </section>
      </section>
      <Tabs
        tabs={[
          {
            title: "Text",
            content: (
              <section>
                <section className="flex items-center justify-center">
                  <section className="w-5/6 flex justify-center flex-col">
                    <textarea
                      className="w-full rounded-lg px-2 py-4 border-b-2 border-primary"
                      rows={6}
                      placeholder="Enter text to translate"
                    />
                    <button
                      onClick={handleTranslate}
                      className="bg-primary text-white rounded-lg px-5 py-2 mt-5"
                    >
                      Translate
                    </button>
                  </section>
                </section>
              </section>
            ),
          },
          {
            title: "Audio",
            content: <section>Audio</section>,
          },
        ]}
      />
    </section>
  );
};
