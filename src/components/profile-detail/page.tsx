import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserDetail, updateUser } from "../services/account/account_api";
import { UserModel } from "@/context/UserContext";
import Swal from "sweetalert2";

interface ProfileDetailProps {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

const ProfileDetail = ({ user, setUser }: ProfileDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserModel>({ ...user });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async () => {
    setUser(editedUser);
    setIsEditing(false);
    const requestBody: UserDetail = {
      username: editedUser.username,
      country: editedUser.country,
      first_name: editedUser.first_name,
      last_name: editedUser.last_name,
      cell_phone: editedUser.cell_phone,
      email: editedUser.email,
      date_of_birth: editedUser.date_of_birth || new Date(),
    };
    try {
      const registrationResult = await updateUser(
        user.token || "",
        requestBody
      );

      if (user) {
        setUser({
          ...user,
          email: editedUser.email,
          cell_phone: editedUser.cell_phone,
          country: editedUser.country,
          last_name: editedUser.last_name,
          first_name: editedUser.first_name,
          date_of_birth: editedUser.date_of_birth,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha actualizar los datos",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Agrupando cada dos inputs en columnas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Input  email*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">{user.email}</span>
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
                  value={editedUser.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  first_name*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombres
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">{user.first_name}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedUser.first_name}
                  onChange={(e) => handleInputChange(e, "first_name")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  Country*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">{user.country}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedUser.country}
                  onChange={(e) => handleInputChange(e, "country")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  last_name*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apellidos
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">{user.last_name}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedUser.last_name}
                  onChange={(e) => handleInputChange(e, "last_name")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  cell_phone*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Telefono
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">{user.cell_phone}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedUser.cell_phone}
                  onChange={(e) => handleInputChange(e, "cell_phone")}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  date_of_birth*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha de Nacimiento
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">
                  {user.date_of_birth
                    ? new Date(user.date_of_birth + "T00:00:00")
                        .toISOString()
                        .split("T")[0]
                    : "No especificada"}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="date"
                  value={
                    editedUser.date_of_birth instanceof Date
                      ? new Date(
                          editedUser.date_of_birth.getTime() -
                            editedUser.date_of_birth.getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .substr(0, 10)
                      : editedUser.date_of_birth || "" // Si es null, establecer un valor vacío para evitar errores
                  }
                  onChange={(e) => handleInputChange(e, "date_of_birth")}
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

export default ProfileDetail;
