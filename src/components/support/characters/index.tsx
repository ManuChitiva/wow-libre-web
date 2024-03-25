import React, { useState } from "react";

interface Character {
  name: string;
  description: string;
}

const Characters: React.FC = () => {
  const [showNames, setShowNames] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const characters: Character[] = [
    { name: "Character 1", description: "Description 1" },
    { name: "Character 2", description: "Description 2" },
    { name: "Character 3", description: "Description 3" },
    { name: "Character 4", description: "Description 4" },
  ];

  const handleCharacterSelect = (index: number) => {
    setSelectedCharacter(characters[index]);
    setShowNames(false); // Oculta la lista de nombres cuando se selecciona un personaje
  };

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-center sm:justify-start container"
      style={{ minHeight: "200px" }}
    >
      <div
        className="w-20 mr-2 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer mb-4 sm:mb-0"
        onClick={() => setShowNames(!showNames)}
      >
        Círculo
      </div>
      {showNames && (
        <div className="w-full mb-4 sm:mb-0 sm:max-w-md">
          <ul className="bg-white rounded-md shadow-md p-2">
            {characters.map((character, index) => (
              <li
                key={index}
                onClick={() => handleCharacterSelect(index)}
                className="py-1 px-3 text-sm cursor-pointer hover:bg-gray-200"
              >
                {character.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="ml-4">
        <h2 className="text-xl text-white font-semibold mb-2">
          Detalles del personaje
        </h2>
        {selectedCharacter ? (
          <div className="bg-white rounded-md shadow-md p-4">
            <h3 className="text-lg font-semibold mb-1">
              {selectedCharacter.name}
            </h3>
            <p className="text-white">{selectedCharacter.description}</p>
          </div>
        ) : (
          <p className="text-white">Selecciona un personaje</p>
        )}
      </div>
    </div>
  );
};

export default Characters;
