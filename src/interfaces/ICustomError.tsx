export interface ICustomError {
  message: string;
  details?: { [key: string]: string };
}
