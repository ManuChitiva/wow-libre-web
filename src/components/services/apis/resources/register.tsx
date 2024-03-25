import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponse } from "../../dto/generic";

export interface InformationModel {
  exist: boolean;
}

export const existEmail = async (email: string): Promise<InformationModel> => {
  try {
    const response = await fetch(
      `${BASE_URL_AUTH}/api/account/search?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: GenericResponse<InformationModel> =
      await response.json();
    if (response.ok && response.status === 200) {
      return responseData.data;
    } else if (response.status === 400) {
      throw new Error(
        `It was not possible to validate your information, please try again later.`
      );
    } else {
      throw new Error(
        `It was not possible to validate your information, please try again later.`
      );
    }
  } catch (error: any) {
    console.error("Error Message [{%s}]", error);
    throw new Error(
      `It was not possible to validate your information, please try again later. ${error.message}`
    );
  }
};
