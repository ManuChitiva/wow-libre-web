import {
  ErrorResponseImpl,
  GenericResponseImpl,
  GenericError,
  InternalError,
} from "../dto/generic";
import { BASE_URL_AUTH } from "../../../configs/configs";

interface UserModelSecurity {
  salt: String;
  verifier: String;
  password: String;
}

export const gameChangePassword = async (
  jwt: string,
  userSecurity: UserModelSecurity
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL_AUTH}/api/account/password/change/game`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(userSecurity),
    }
  );

  console.log(response.status);
  if (response && response.ok && response.status === 200) {
    return;
  } else if (response.status == 400) {
    const responseData: GenericResponseImpl<ErrorResponseImpl> =
      await response.json();
    throw new GenericError(
      responseData.message,
      responseData.code,
      responseData
    );
  } else if (response.status === 401) {
    throw new Error("No autorizado");
  } else if (response.status == 500) {
    const responseData: GenericResponseImpl<void> = await response.json();

    throw new InternalError(
      responseData.message,
      responseData.code,
      responseData
    );
  }
  throw new Error("Ha ocurrido un error al actualizar los datos");
};
