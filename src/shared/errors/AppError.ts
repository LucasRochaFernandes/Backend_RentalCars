export class AppError {
  public readonly message: string;
  public readonly statuscode: number;

  constructor(message: string, statusCode: number = 400) {
    this.message = message;
    this.statuscode = statusCode;
  }
}



// test error[]