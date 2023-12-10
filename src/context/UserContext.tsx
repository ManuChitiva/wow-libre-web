"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Definición del modelo de usuario
export interface UserModel {
  id: number;
  username: string;
  salt: number[] | null;
  verifier: number[] | null;
  country: string;
  date_of_birth: Date | null;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  password: string;
  password_web: string;
  token: string | null;
  logged_in: boolean;
  refresh_token: string | null;
  expiration_date: string | null;
}

const initialUserData: UserModel = {
  id: 1,
  username: "",
  salt: null,
  verifier: null,
  country: "",
  date_of_birth: null,
  first_name: "",
  last_name: "",
  cell_phone: "",
  email: "",
  password: "",
  password_web: "",
  token: null,
  refresh_token: null,
  expiration_date: null,
  logged_in: false,
};
// Definición del contexto y sus tipos
interface UserContextProps {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  clearUserData: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: initialUserData,
  setUser: () => {},
  clearUserData: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  let initialUser = initialUserData;

  // Verifica si estamos en el navegador (cliente)
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    initialUser = storedUser ? JSON.parse(storedUser) : initialUserData;
  }

  const [user, setUser] = useState<UserModel>(initialUser);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  }, [user]);

  const clearUserData = () => {
    localStorage.removeItem("user");
    setUser(initialUserData); // Restablecer el usuario a initialUserData
    Cookies.remove("jwt"); // Ajusta la expiración y la ruta según tus necesidades
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = (): UserContextProps => {
  return useContext(UserContext);
};
