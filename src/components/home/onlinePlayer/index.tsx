"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import {
  CharactersOnline,
  getNumberCharactersOline,
} from "@/components/services/public/online/characters";

const Onlyplayers = () => {
  const [onlineCharacters, setOnlineCharacters] = useState<CharactersOnline>();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gets the number of online players
        const response = await getNumberCharactersOline();
        setOnlineCharacters(response);
      } catch (error) {
        setOnlineCharacters({
          alliance: 0,
          horde: 0,
        });
        console.error("An error has occured. Please try again later.", error);
      }
    };
    fetchData();
  }, []);

  const shouldRenderLink = user.logged_in;

  return (
    <div className="flex flex-col items-center container">
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">Jugadores Online</h2>
        <hr className="border my-2 " />
        <p>
          {" "}
          La información sobre jugadores en línea se actualiza cada 5 minutos
          para ofrecer la mejor precisión posible. Apreciamos tu comprensión y
          paciencia mientras mantenemos la integridad de los datos en tiempo
          real.
        </p>
      </div>
      <div className="flex flex-col items-start mt-4">
        <div className="mb-4 flex items-center">
          <img
            src="../resources/home/factions/alliance_faction.png"
            alt="Icono Alianza"
            className="w-8 h-8 ml-2"
          />
          <div className="pl-2">
            <h3 className="text-xl font-bold">Jugadores de la Alianza</h3>
            <p>
              Cantidad: {onlineCharacters?.alliance} jugador
              {onlineCharacters?.alliance !== 1 ? "es" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="../resources/home/factions/horde_faction.png"
            alt="Icono Horda"
            className="w-8 h-8 ml-2"
          />
          <div className="pl-2">
            <h3 className=" text-xl font-bold">Jugadores de la Horda</h3>
            <p>
              Cantidad: {onlineCharacters?.horde} jugador
              {onlineCharacters?.horde !== 1 ? "es" : ""}
            </p>
          </div>
        </div>
      </div>

      {shouldRenderLink && (
        <Link
          href="/profile"
          className="bg-blue-700  text-white py-3 px-6 rounded-lg hover:bg-blue-600 mt-10"
        >
          Ir a la batalla
        </Link>
      )}

      {!shouldRenderLink && (
        <Link
          href="/register"
          className="bg-blue-700  text-white py-3 px-6 rounded-lg hover:bg-blue-600 mt-10"
        >
          Unirme a azeroth
        </Link>
      )}
    </div>
  );
};

export default Onlyplayers;
