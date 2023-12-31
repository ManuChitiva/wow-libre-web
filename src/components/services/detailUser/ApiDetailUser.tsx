import exp from "constants";
import { useState } from "react";

export interface RegistrationData {}

export interface GenericResponse<T> {
  code: number;
  message: string;
  transactionId: string;
  data: T;
}

export interface ErrorBadRequest {
  numberOfInvalid: number;
  valuesInvalid: string[];
}

export interface UserDetail {
  username: string;
  country: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  date_of_birth: Date;
}

export const getUserDetail = async (jwt: string): Promise<UserDetail> => {
  try {
    const response = await fetch("http://localhost:8080/api/account/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const responseData: GenericResponse<UserModel> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else if (response.status >= 400) {
      throw new Error("Error al Obtener los datos");
    }

    // Agregar un retorno por defecto en caso de otros casos no contemplados
    throw new Error("Error desconocido al obtener los datos");
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${error.message}`
    );
  }
};

export const updateUser = async (
  jwt: string,
  user: UserDetail
): Promise<void> => {
  console.log(user);
  try {
    const response = await fetch("http://localhost:8080/api/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(user),
    });

    if (response.ok && response.status === 200) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      return;
    }
    throw new Error("Ha ocurrido un error al actualizar los datos");
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ha ocurrido un error al actualizar los datos : ${error.message}`
    );
  }
};

export const convertToErrorBadRequest = (
  result: GenericResponse<void> | GenericResponse<ErrorBadRequest>
): GenericResponse<ErrorBadRequest> => {
  if (
    "code" in result &&
    "message" in result &&
    "transactionId" in result &&
    "data" in result &&
    typeof result.data !== "undefined" &&
    "numberOfInvalid" in result.data &&
    "valuesInvalid" in result.data
  ) {
    return result as GenericResponse<ErrorBadRequest>;
  }
  return {
    code: result.code,
    message: result.message,
    transactionId: result.transactionId,
    data: {
      numberOfInvalid: 0,
      valuesInvalid: [],
    },
  };
};
