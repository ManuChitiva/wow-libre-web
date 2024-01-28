import { UserModel } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faSave, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

interface ProfileSecurityProps {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

const ProfileSecurityWeb = ({ user, setUser }: ProfileSecurityProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserModel>({ ...user });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserModel
  ) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  return (
    <div className="mx-auto mt-8">
      <div className="text-center">
        <h2 className="mb-10 font-bold">
          Protege tu imperio digital con una contraseña fuerte y segura. <br />{" "}
          ¡Sé el héroe de tu propia historia en World of Warcraft y defiende tus
          tesoros virtuales con una clave invulnerable!
        </h2>
      </div>
      {/* Línea horizontal */}
      <hr className="border-t-1 border-gray-300 my-4 mx-8" />
      <div className="bg-white   px-8 pt-6 pb-8 mb-9">
        {/* Agrupando cada dos inputs en columnas */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {/* Input  email*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña web actual
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*********</span>
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e, "email")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  first_name*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nueva Contraseña Web
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e, "first_name")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>
          {/* Input  first_name*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña Web
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e, "first_name")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-300"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSecurityWeb;
