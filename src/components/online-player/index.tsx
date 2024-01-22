"use client";
import React, { useEffect, useState } from "react";
import {
  CharactersOnline,
  getNumberCharactersOline,
} from "../services/account/account_api";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

const Onlyplayers = () => {
  const [onlineCharacters, setOnlineCharacters] = useState<CharactersOnline>();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la llamada a la API y obtén los datos
        const response = await getNumberCharactersOline();
        console.log(response);
        // Actualiza el estado con los datos obtenidos de la API
        setOnlineCharacters(response);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    // Llama a la función para obtener datos cuando el componente se monta
    fetchData();
  }, []);
  const shouldRenderLink = user.logged_in;

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">Jugadores Online</h2>
        <hr className="border my-2" />
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
