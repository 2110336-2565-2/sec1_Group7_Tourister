import { ApiResponseInterface } from "../interfaces/ApiResponsetInterface"

export default class ApiErrorResponse extends Error {
  code?: number;
  context?: unknown;

  constructor(message: string, code: number, context?: unknown) {
    super(message);
    this.code = code;
    if (context) this.context = context;
    Object.setPrototypeOf(this, ApiErrorResponse.prototype);
  }

  getData() {
    return <ApiResponseInterface>{
      code: this.code,
      message: this.message,
      errors: this.context,
    }
  }
}