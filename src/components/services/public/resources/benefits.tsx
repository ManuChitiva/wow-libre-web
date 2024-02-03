import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponse } from "../../dto/generic";

export interface BenefitModel {
  id: number;
  description: string;
  name: string;
  icon: string;
  background_image: string;
}

export const getBenefit = async (): Promise<BenefitModel[]> => {
  try {
    const response = await fetch(`${BASE_URL_AUTH}/api/resources/benefit `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
