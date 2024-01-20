import React from "react";
import { Character } from "../services/detailUser/ApiDetailUser";

interface CharacterListProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onSelectCharacter,
}) => {
  console.log("Longitud de la lista de personajes:", characters.length);

  if (characters.length === 0) {
    return <p>No hay personajes disponibles</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-500">
        Lista de Personajes
      </h2>
      <select
        className="text-gray-500"
        onChange={(e) => {
          const selectedCharacterId = parseInt(e.target.value, 10);
          const selectedCharacter = characters.find(
            (character) => character.id === selectedCharacterId
          );
          if (selectedCharacter) {
            onSelectCharacter(selectedCharacter);
          }
        }}
        defaultValue="" // Utiliza defaultValue para establecer la opción predeterminada
      >
        <option value="" disabled>
          Seleccione un personaje
        </option>
        {characters.map((character) => (
          <option
            key={character.id}
            value={character.id}
            className="text-gray-500"
          >
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterList;
