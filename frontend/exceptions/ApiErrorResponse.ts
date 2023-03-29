import { ApiResponseInterface } from "../interfaces/ApiResponsetInterface"

export default class ApiErrorResponse extends Error {
  code?: number;
  context?: unknown;
  tag?: string;

  constructor(message: string, code: number, context?: unknown, tag?: string) {
    super(message);
    this.code = code;
    if (context) this.context = context;
    if (tag) this.tag = tag;
    Object.setPrototypeOf(this, ApiErrorResponse.prototype);
  }

  getData() {
    return <ApiResponseInterface>{
      code: this.code,
      message: this.message,
      errors: this.context,
      tag: this.tag,
    }
  }
}