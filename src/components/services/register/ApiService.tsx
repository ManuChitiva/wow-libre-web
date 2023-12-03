import exp from "constants";
import { useState } from "react";

export interface RegistrationData {
  username?: string;
  salt: string;
  verifier: string;
  country?: string;
  date_of_birth?: string;
  first_name?: string;
  last_name?: string;
  cell_phone?: string;
  email?: string;
  password?: string;
}

export interface GenericResponse<T> {
  code: number;
  message: string;
  transactionId: string;
  data: T;
}

interface LoginData {
  jwt: string;
  refreshToken: string;
  expirationDate: string;
}

export const registerUser = async (
  userData: RegistrationData
): Promise<GenericResponse<boolean> | boolean> => {
  try {
    const response = await fetch("http://localhost:8080/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData: GenericResponse<boolean> = await response.json();
    console.log(responseData);
    if (response.ok && response.status === 201) {
      return true; // Registro exitoso
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Error al registrar los datos");
    }
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${error.message}`
    );
  }
};

export const loginUser = async (
  userName: string,
  password: string
): Promise<GenericResponse<LoginData>> => {
  try {
    const requestBody: {
      username: string;
      password: string;
    } = {
      username: userName,
      password: password,
    };

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const responseData: GenericResponse<LoginData> = await response.json();
    console.log(responseData);

    if (response.ok && response.status === 200) {
      return responseData;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Error al registrar los datos");
    }
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${error.message}`
    );
  }
};
