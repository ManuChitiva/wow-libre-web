import { BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseImpl } from "../../dto/generic";

export interface CharactersOnline {
  alliance: number;
  horde: number;
}

export const getNumberCharactersOline = async (): Promise<CharactersOnline> => {
  try {
    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/character/number/online`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: GenericResponseImpl<CharactersOnline> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    }
    throw new Error(
      "It was not possible to obtain the number of online players"
    );
  } catch (error: any) {
    console.error(
      "An unexpected error has occurred: When obtaining the number of Online players: ",
      error
    );
    throw new Error(`An unexpected error has occurred: ${error.message}`);
  }
};
