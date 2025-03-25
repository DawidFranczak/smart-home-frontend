import { jwtDecode, JwtPayload } from "jwt-decode";

export default function isTokenExpired (token:string):boolean {
  if (!token) return true;
  const decodedToken:JwtPayload = jwtDecode(token);
  const currentTime:number = Date.now() / 1000;
  return decodedToken.exp ? decodedToken.exp < currentTime : true;
  };