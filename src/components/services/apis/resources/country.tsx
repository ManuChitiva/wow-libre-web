import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponse } from "../../dto/generic";

export interface CountryModel {
  value: string;
  label: string;
  language: string;
  site: string;
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
      throw new Error("Error [{%s}]" + errorMessage);
    }
  } catch (error: any) {
    console.error("Error Message [{%s}]", error);
    throw new Error(
      `It was not possible to obtain the available countries: ${error.message}`
    );
  }
};
