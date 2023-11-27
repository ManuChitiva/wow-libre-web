"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

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
};
// Definición del contexto y sus tipos
interface UserContextProps {
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUser = window.localStorage.getItem("user");
      try {
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return initialUserData;
      }
    }
    return null;
  });

  useEffect(() => {
    console.log("User state:", user); // Agrega esta línea para verificar el estado de user

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = (): UserContextProps => {
  return useContext(UserContext);
};
