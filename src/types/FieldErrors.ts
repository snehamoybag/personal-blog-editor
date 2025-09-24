export type FieldErrors = Record<
  string,
  {
    type?: "field";
    location?: "body";
    value?: string;
    msg: string;
    path: string;
  }
>;
