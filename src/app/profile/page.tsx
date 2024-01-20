"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faCog,
  faUser,
  faClipboard,
  faComment,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  Character,
  Characters,
  UserDetail,
  getCharacters,
  getUserDetail,
} from "@/components/services/detailUser/ApiDetailUser";
import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LoadingSpinner from "@/components/loading-spinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Friend from "@/components/friend";
import ProfileDetail from "@/components/profile-detail/page";
import CharacterList from "@/components/character";

const Profile = () => {
  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Characters = await getCharacters(user.token || "");
        setCharacters(response.characters);
      } catch (error) {
        console.error("Error al obtener personajes:", error);
        setCharacters([]); // Inicializa characters como un arreglo vacío en caso de error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: UserDetail = await getUserDetail(user.token || "");
        console.log(response.last_name);

        if (user) {
          setUser({
            ...user,
            email: response.email,
            cell_phone: response.cell_phone,
            country: response.country,
            last_name: response.last_name,
            first_name: response.first_name,
            date_of_birth: response.date_of_birth,
          });
        }

        setIsLoading(false); // Marcamos la carga como completada
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido obtener el detalle",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    };

    fetchData();
  }, [setIsLoading]);

  const handleSelectCharacter = (character: Character) => {
    console.log("Personaje seleccionado:", character);
    setSelectedCharacter(character);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Puedes utilizar cualquier spinner o animación de carga aquí */}
        <div className="flex flex-col items-center">
          <LoadingSpinner />{" "}
          {/* Reemplaza esto con tu componente de spinner o loader */}
          <p className="mt-4 text-gray-600 text-lg">Cargando...</p>
        </div>
      </div>
    ); // Muestra un estado de carga mientras se obtienen los datos
  }

  return (
    <div className="container  mx-auto py-20  mb-">
      {/* Sección de perfil */}
      <div className="flex flex-col  items-center justify-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar del usuario"
          className="w-24 h-24 rounded-full mb-4"
        />
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-500 text-lg">Email: {user.email}</p>
          <p className="text-gray-500 text-lg">Pais: {user.country}</p>
          <p className="text-gray-500 text-lg">Username: {user.username}</p>
          <div className="mt-6">
            {!isLoading && characters.length > 0 ? (
              <CharacterList
                characters={characters}
                onSelectCharacter={handleSelectCharacter}
              />
            ) : (
              <p>No hay personajes disponibles</p>
            )}
          </div>
        </div>
      </div>

      {/* Secciones con pestañas */}
      <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden">
        <Tabs>
          <div className="flex">
            <TabList className="flex flex-col  border-r">
              <Tab className="py-4 px-6 hover:bg-gray-400 cursor-pointer text-lg font-semibold  flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2" />
                Amigos
              </Tab>
              <Tab className="py-4 px-6 hover:bg-gray-400 cursor-pointer text-lg font-semibold  flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Notificaciones
              </Tab>
              <Tab className="py-4 px-6  hover:bg-gray-400 cursor-pointer text-lg font-semibold  flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Perfil
              </Tab>
              <Tab className="py-4 px-6  hover:bg-gray-400 cursor-pointer text-lg font-semibold  flex items-center">
                <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                Movimientos
              </Tab>
              <Tab className="py-4 px-6  hover:bg-gray-400 cursor-pointer text-lg font-semibold  flex items-center">
                <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                Seguridad
              </Tab>
            </TabList>

            {/* Separadores verticales */}
            <div className="border-l border-gray-300"></div>

            {/* Paneles de las pestañas */}
            <div className="w-full px-4">
              <TabPanel>
                {/* Contenido de la pestaña Amigos */}
                {selectedCharacter && (
                  <Friend character={selectedCharacter} token={user.token} />
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Configuraciones */}
                <div className="p-4">
                  Contenido de la pestaña Configuraciones
                </div>
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
                <div className="p-4">
                  <ProfileDetail user={user} setUser={setUser} />
                </div>
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
                <div className="p-4">Contenido de la pestaña Transacciones</div>
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
                <div className="p-4">Contenido de la pestaña Seguridad</div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
