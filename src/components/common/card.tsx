import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { WiDayLightWind } from "react-icons/wi";
import { IoCloudyNightOutline } from "react-icons/io5";

interface CardProps {
  title: string;
  number: string;
  parcels?: string;
  tickets?: string;
  groceries?: string;
  color: string;
  afterHours?: boolean;
}

export const Card: FC<CardProps> = ({
  title,
  number,
  parcels,
  tickets,
  groceries,
  color,
  afterHours = false,
}) => {
  return (
    <section className="flex flex-col gap-3 w-full lg:h-96 bg-white drop-shadow-lg rounded-xl hover:translate-y-2 hover:ease-in-out">
      <h1
        className={`font-extrabold text-white justify-center flex gap-2 items-center ${color} rounded-t-xl p-6`}
      >
        <p className="text-xl font-semibold text-white">{number}</p>
        <p className="text-sm">{title}</p>
      </h1>
      <ul className="flex-1">
        <li
          className={`flex items-center font-bold justify-center gap-2  py-2`}
        >
          <WiDayLightWind size={30} />
          Normal Hours
        </li>
        {parcels && parcels !== "0" && (
          <li className="flex items-center justify-between px-4">
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Food & Parcels
            </p>
            <p className="font-semibold">R {parcels}</p>
          </li>
        )}
        {tickets && (
          <li className="flex items-center justify-between px-4">
            <p className="flex items-center gap-2">
              <FaCheckCircle
                className={tickets !== "0" ? "text-green-500" : "text-gray-300"}
              />
              Megabus Tickets
            </p>
            <p
              className={`${
                tickets === "0" ? "line-through" : ""
              } font-semibold`}
            >
              R {tickets}
            </p>
          </li>
        )}
        {groceries && (
          <li className="flex items-center justify-between px-4">
            <p className="flex items-center gap-2">
              <FaCheckCircle
                className={
                  groceries !== "0" ? "text-green-500" : "text-gray-300"
                }
              />{" "}
              Lite Groceries
            </p>
            <p
              className={`${
                groceries === "0" ? "line-through" : ""
              } font-semibold`}
            >
              R {groceries}
            </p>
          </li>
        )}

        <>
          <li className="font-bold flex items-center gap-2 justify-center py-4">
            <IoCloudyNightOutline size={25} />
            After Hours
          </li>
          {parcels && parcels !== "0" && (
            <li className="flex items-center justify-between px-4">
              <p className="flex items-center gap-2">
                <FaCheckCircle
                  className={afterHours ? "text-green-500" : "text-gray-300"}
                />
                Food & Parcels
              </p>
              <p
                className={`${afterHours ? "" : "line-through"} font-semibold`}
              >
                R {50}
              </p>
            </li>
          )}
        </>
      </ul>
    </section>
  );
};
