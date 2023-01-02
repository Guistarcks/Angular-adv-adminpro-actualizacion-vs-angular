import { environment } from "src/environments/environment";
import { Clinica } from "./clinicas.model";

const base_url = environment.base_url;

interface _ClientesUser{
    _id?: string;
    nombre?:string;
    img?: string;
}


export class Cliente{
 

    constructor(
        public _id: string,
        public nombre:string,
        public email:string,
        public telefono:string,
        public usuario:_ClientesUser,
        public clinica:Clinica,
        

    ){}
}