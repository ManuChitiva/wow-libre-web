"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Definición del modelo de usuario
export interface AccountBannedModel {
  active: boolean;
  reason: string;
  ban_date: string;
  banned_by: string;
  unban_date: string;
}

export interface AccountMutedModel {
  mute_date: string;
  mute_time: string;
  muted_by: string;
  reason: string;
}

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
  token: string;
  logged_in: boolean;
  refresh_token: string | null;
  expiration_date: string | null;
  account_banned: AccountBannedModel | null;
  account_muted: AccountMutedModel | null;
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
  token: "",
  refresh_token: null,
  expiration_date: null,
  logged_in: false,
  account_banned: null,
  account_muted: null,
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

const UserProvider = ({ children }: UserProviderProps) => {
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
