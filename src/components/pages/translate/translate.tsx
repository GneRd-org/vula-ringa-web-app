import { Tabs } from "../../common/tabs";

export const Translate = () => {
  return (
    <section className="h-full w-full flex flex-col gap-6">
      <section className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-lightGreen h-58 px-3 py-5 rounded-b-3xl">
            <h1 className="text-5xl font-extrabold text-center text-white">
              Translate
            </h1>
            <section className="flex items-center justify-around w-full">
              <p className="py-10 text-xs text-black font-bold w-2/3">
                Your friend in a foreign land, which helps you to communicate
                with people who speak different languages.
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
                  <section className="w-1/2">
                    <input
                      className="w-full rounded-lg px-2 py-4 border-b-2 border-primary"
                      type="text"
                      placeholder="Enter text to translate"
                    />
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
