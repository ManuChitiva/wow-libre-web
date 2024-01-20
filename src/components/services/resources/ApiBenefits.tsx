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

export interface BenefitModel {
  id: number;
  description: string;
  name: string;
  icon: string;
  background_image: string;
}

export const getBenefit = async (): Promise<BenefitModel[]> => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/resources/benefit",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: GenericResponse<BenefitModel[]> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
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
