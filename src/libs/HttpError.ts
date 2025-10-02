// use it to throw http exception errors like 404 not found, 500 server error etc.
export default class HttpError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, statusText: string) {
    super(`Error${statusCode}: ${statusText}`);
    this.statusCode = statusCode;
  }
}
