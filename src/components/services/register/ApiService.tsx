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

interface LoginData {
  jwt: string;
  refresh_token: string;
  expiration_date: string;
}

export const registerUser = async (
  userData: RegistrationData
): Promise<GenericResponse<void> | GenericResponse<ErrorBadRequest>> => {
  try {
    const response = await fetch("http://localhost:8080/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    if (response.ok && response.status === 201) {
      return responseData;
    } else if (response.status == 400) {
      const badRequestError: GenericResponse<ErrorBadRequest> = responseData;
      return badRequestError;
    } else if (response.status == 409) {
      console.log("Error 409");
      return responseData;
    } else {
      const errorMessage = await response.text();
      throw new Error(
        `Ocurrió un error al intentar registrar los datos: ${errorMessage}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${error.message}`
    );
  }
};

export const loginUser = async (
  userName: string,
  password: string
): Promise<GenericResponse<LoginData>> => {
  try {
    const requestBody: {
      username: string;
      password: string;
    } = {
      username: userName,
      password: password,
    };

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const responseData: GenericResponse<LoginData> = await response.json();
    console.log(responseData);

    if (response.ok && response.status === 200) {
      console.log("CHITI");
      return responseData;
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
