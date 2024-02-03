import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponse } from "../../dto/generic";

export interface CountryModel {
  value: string;
  label: string;
}

export const getCountry = async (): Promise<CountryModel[]> => {
  try {
    const response = await fetch(`${BASE_URL_AUTH}/api/resources/country`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: GenericResponse<CountryModel[]> = await response.json();

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
