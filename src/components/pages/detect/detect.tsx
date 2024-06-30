import { VoiceRecorder } from "../../common";

export const Detect = () => {
  return (
    <section className="h-full w-full flex flex-col gap-6">
      <section className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-lightPurple h-58 px-3 py-5 rounded-bl-3xl">
            <h1 className="text-5xl font-extrabold text-center text-white">
              Detect
            </h1>
            <section className="flex items-center justify-around w-full">
              <p className="py-10 text-xs text-center text-black font-bold w-full">
                Let's help you detect the language around you.
              </p>
            </section>
          </section>
        </section>
      </section>
      <VoiceRecorder detect transcribe={false} />
    </section>
  );
};
