import { BASE_URL_AUTH } from "@/configs/configs";
import {
  ErrorResponseImpl,
  GenericError,
  GenericResponseImpl,
  InternalError,
} from "../../dto/generic";

interface UserModelSecurity {
  salt: String;
  verifier: String;
  password: String;
}
interface webUserModelSecurity {
  oldPassword: string;
  password: string;
}
// API para cambiar la contraseña del juego del usuario
export const gameChangePassword = async (
  jwt: string,
  body: UserModelSecurity
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL_AUTH}/api/account/password/change/game`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(body),
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

export const webChangePassword = async (
  jwt: string,
  body: webUserModelSecurity
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL_AUTH}/api/account/password/change/web`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(body),
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
