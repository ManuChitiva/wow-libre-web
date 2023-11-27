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
export interface ResponseRegister {
  code: number;
  message: string;
  transactionId: string;
}
export const registerUser = async (
  userData: RegistrationData
): Promise<ResponseRegister | boolean> => {
  try {
    const response = await fetch("http://localhost:8080/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData: ResponseRegister = await response.json();
    console.log(responseData);
    if (response.ok && response.status === 201) {
      return true; // Registro exitoso
    } else {
      // Manejar errores de la solicitud
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
