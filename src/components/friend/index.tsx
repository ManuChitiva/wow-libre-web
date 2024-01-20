import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Character,
  Friends,
  getFriends,
} from "../services/detailUser/ApiDetailUser";

interface FriendProps {
  id: number;
  name: string;
  race: string;
  level: number;
  class: string;
}

interface CharacterProps {
  character?: Character;
  token: string | null; // Ajuste: `String` a `string`
}

const Friend: React.FC<CharacterProps> = ({ character, token }) => {
  const [friendsModel, setFriends] = useState<Friends | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (character && token) {
          const response: Friends = await getFriends(token, character.id);
          setFriends(response);
        }
      } catch (error) {
        console.error("Error al obtener amigos:", error);
        setFriends(null); // Ajuste: manejo de error
      }
    };

    fetchData();
  }, [character, token]);

  if (!character) {
    return <p>Selecciona un personaje para mostrar detalles.</p>;
  }

  if (!friendsModel) {
    return (
      <p>
        Error al obtener la lista de amigos. Por favor, inténtalo de nuevo más
        tarde.
      </p>
    );
  }

  // Número de elementos por página
  const itemsPerPage = 3;

  // Calcula el índice del primer y último elemento en la página actual
  const indexOfLastFriend = (currentPage + 1) * itemsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - itemsPerPage;
  const currentFriends = friendsModel.friends.slice(
    indexOfFirstFriend,
    indexOfLastFriend
  );

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lista de Amigos</h2>
      <div className="grid grid-cols-3 gap-4">
        {currentFriends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white rounded-lg shadow-md p-4 overflow-hidden cursor-pointer"
            onClick={openModal}
          >
            <img
              src="https://via.placeholder.com/50"
              alt={`Avatar de ${friend.name}`}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{friend.name}</h3>
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              Level: {friend.level}
            </p>
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              Class: {friend.class}
            </p>
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              Race: {friend.race}
            </p>
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              Status: {friend.flags}
            </p>
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              Nota: {friend.note}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4">
            {/* Contenido de la modal */}
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <ReactPaginate
        forcePage={currentPage}
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={Math.ceil(friendsModel.friends.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center mt-6"}
        pageClassName={"pagination flex justify-center"}
        activeClassName={"active"}
        previousClassName={"inline-block mr-2"}
        nextClassName={"inline-block ml-4 "}
      />
    </div>
  );
};

export default Friend;
