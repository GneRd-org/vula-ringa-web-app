import { useEffect, useState } from "react";
import { HomeBg, LelapaLogo, GnerdLogo } from "../../../assets";
import { MdOutlineTranscribe } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { BsTranslate } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { AppStore, useAppStore } from "../../../store/app-store";

export const Home = () => {
  const { setShowNav } = useAppStore() as AppStore;
  const { hash } = useLocation();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!hash) return;
    const id = hash;
    document.querySelector(`${id}`)?.scrollIntoView();
  }, [hash]);

  const getStarted = () => {
    setStarted(true);
    setShowNav(true);
  };

  return (
    <section className="h-full w-full flex flex-col gap-6">
      {started ? (
        <section className="w-full flex items-center">
          <section className="w-full flex flex-col gap-4">
            <section className="bg-primary h-58 px-3 py-5 rounded-b-3xl">
              <h1 className="text-5xl font-extrabold text-center text-white">
                Vula Ringa
              </h1>
              <section className="flex items-center justify-around w-full">
                <p className="py-10 text-xs text-black font-bold w-2/3">
                  Your friend in a foreign land, which helps you to communicate
                  with people who speak different languages.
                </p>
                <section className="w-1/3">
                  <img className="w-[95%]" src={HomeBg} alt="Speech to text" />
                </section>
              </section>
            </section>
            <section className="flex py-5 gap-2 justify-evenly items-center w-full px-3">
              <Link to="/detect">
                <button className="rounded-lg bg-lightPurple w-24 h-24 flex justify-center items-center">
                  <BsTranslate size={40} />
                </button>
                <p className="text-xs text-center"> Detect Lang. </p>
              </Link>
              <Link to="/translate">
                <button className="rounded-lg bg-lightGreen w-24 h-24 flex justify-center items-center">
                  <FaSearch size={40} />
                </button>
                <p className="text-xs text-center"> Translate </p>
              </Link>
              <Link to="/transcribe">
                <button className="rounded-lg bg-[#F5D2D4] w-24 h-24 flex justify-center items-center">
                  <MdOutlineTranscribe size={40} />
                </button>
                <p className="text-xs text-center"> Transcribe </p>
              </Link>
            </section>
            <section className="flex py-14 justify-center flex-col items-center">
              <h3 className="font-bold text-xl">Powered By:</h3>
              <img className="w-[45%]" src={LelapaLogo} alt="Lelapa Logo" />
            </section>
          </section>
        </section>
      ) : (
        <section className="h-screen">
          <section className="flex flex-col items-center justify-center h-full">
            <img className="w-2/3" src={GnerdLogo} alt="Lelapa Logo" />
            <p className="text-xl font-bold">Your friend in a foreign land.</p>
            <button
              onClick={getStarted}
              className="bg-primary text-white rounded-lg px-5 py-2 mt-5"
            >
              Get Started
            </button>
          </section>
        </section>
      )}
    </section>
  );
};
