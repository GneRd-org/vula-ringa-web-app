import { IoHomeOutline, IoHome, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineTranscribe, MdTranscribe } from "react-icons/md";
import { ROUTES } from "../../contants";
import { Link, useLocation } from "react-router-dom";
import { BsTranslate } from "react-icons/bs";
import { PiTranslateBold } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export const Footer = () => {
  const { pathname, hash } = useLocation();
  const active = (path: string) =>
    hash === path || pathname === path
      ? "font-semibold"
      : "hover:text-secondary";

  const isActive = (path: string) => hash === path || pathname === path;

  return (
    <footer className="absolute bottom-0 w-full fixed flex flex-col items-center md:hidden ">
      <section className="flex items-center gap-2 bg-white drop-shadow-lg w-full justify-between px-5">
        <Link to={ROUTES.home} className="p-2 flex items-center flex-col gap-1">
          {isActive(ROUTES.home) ? (
            <IoHome size={25} />
          ) : (
            <IoHomeOutline size={25} />
          )}
          <p className={`${active(ROUTES.home)} text-xs text-center"`}>Home</p>
        </Link>
        <Link
          to={ROUTES.detect}
          className="p-2 flex items-center flex-col gap-1"
        >
          {isActive(ROUTES.detect) ? (
            <FaSearch size={25} />
          ) : (
            <CiSearch size={25} />
          )}
          <p className={`${active(ROUTES.detect)} text-xs text-center"`}>
            Detect
          </p>
        </Link>
        <Link
          to={ROUTES.translate}
          className="p-2 flex items-center flex-col gap-1"
        >
          {isActive(ROUTES.translate) ? (
            <BsTranslate size={25} />
          ) : (
            <PiTranslateBold size={25} />
          )}
          <p className={`${active(ROUTES.translate)} text-xs text-center`}>
            Translate
          </p>
        </Link>
        <Link
          to={ROUTES.transcribe}
          className="p-2 flex items-center flex-col gap-1"
        >
          {isActive(ROUTES.transcribe) ? (
            <MdTranscribe size={25} />
          ) : (
            <MdOutlineTranscribe size={25} />
          )}
          <p className={`${active(ROUTES.transcribe)} text-xs text-center`}>
            Transcribe
          </p>
        </Link>

        <Link
          to={ROUTES.config}
          className="p-2 flex items-center flex-col gap-1"
        >
          {isActive(ROUTES.config) ? (
            <IoSettingsSharp size={25} />
          ) : (
            <CiSettings size={25} />
          )}
          <p className="text-xs text-center">Config</p>
        </Link>
      </section>
    </footer>
  );
};
