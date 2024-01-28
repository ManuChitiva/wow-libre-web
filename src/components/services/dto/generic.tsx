export interface GenericResponse<T> {
  code: number;
  message: string;
  transactionId: string;
  data: T;
}

export interface ErrorResponse {
  numberOfInvalid: number;
  valuesInvalid: string[];
}

export class ErrorResponseImpl implements ErrorResponse {
  constructor(public numberOfInvalid: number, public valuesInvalid: string[]) {}
}

export class GenericResponseImpl<T> implements GenericResponse<T> {
  constructor(
    public code: number,
    public message: string,
    public transactionId: string,
    public data: T
  ) {}
}

export class GenericError extends Error {
  public statusCode: number;
  public responseData: GenericResponseImpl<ErrorResponseImpl>;

  constructor(
    message: string,
    statusCode: number,
    responseData: GenericResponseImpl<ErrorResponseImpl>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.responseData = responseData;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InternalError extends Error {
  public statusCode: number;
  public responseData: GenericResponseImpl<void>;

  constructor(
    message: string,
    statusCode: number,
    responseData: GenericResponseImpl<void>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.responseData = responseData;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
