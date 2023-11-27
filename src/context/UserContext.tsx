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
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

export const UserContext = createContext<UserContextProps>({
  user: initialUserData,
  setUser: () => {},
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
    // Verifica nuevamente si estamos en el navegador antes de usar localStorage
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
  };

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
