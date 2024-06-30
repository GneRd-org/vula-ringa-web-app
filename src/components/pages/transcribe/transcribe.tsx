import { VoiceRecorder } from "../../common";

export const Transcribe = () => {
  return (
    <section className="h-full w-full flex flex-col gap-6">
      <section className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-lightPink h-58 px-3 py-5 rounded-b-3xl">
            <h1 className="text-5xl font-extrabold text-center text-white">
              Transcribe
            </h1>
            <section className="flex items-center justify-around w-full">
              <p className="py-10 text-xs text-black font-bold">
                Let us transcribe your voice to text.
              </p>
            </section>
          </section>
        </section>
      </section>
      <VoiceRecorder transcribe />
    </section>
  );
};
