export interface FieldError {
  type?: "field";
  location?: "body";
  value?: string;
  msg: string;
  path: string;
}
