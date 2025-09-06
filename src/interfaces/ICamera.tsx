export interface ICamera {
    id: number;
    name: string;
}
export interface ICameraCreate{
    name:string,
    ip_address:string,
    port:number,
    username:string,
    password:string
    path:string
}