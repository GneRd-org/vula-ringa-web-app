import { useEffect } from "react";
import { HomeBg, LelapaLogo } from "../../../assets";
import { MdOutlineTranscribe } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { BsTranslate } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash;
    document.querySelector(`${id}`)?.scrollIntoView();
  }, [hash]);

  return (
    <section className="h-full w-full flex flex-col gap-6">
      <section id="about-us" className="w-full flex items-center">
        <section className="w-full flex flex-col gap-4">
          <section className="bg-primary h-58 px-3 py-5 rounded-bl-3xl">
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
              <button className="rounded-lg bg-[#E0CEF9] w-24 h-24 flex justify-center items-center">
                <BsTranslate size={40} />
              </button>
              <p className="text-xs text-center"> Detect Lang. </p>
            </Link>
            <Link to="/translate">
              <button className="rounded-lg bg-[#BEE8DA] w-24 h-24 flex justify-center items-center">
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
    </section>
  );
};
