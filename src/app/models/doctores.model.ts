
import { environment } from "src/environments/environment";
import { Clinica } from "./clinicas.model";

const base_url = environment.base_url;

interface _DoctoresUser{
    _id?: string;
    nombre?:string;
    img?: string;
}

export class Doctor{


    constructor(

        public nombre:string,
        public _id?: string,
        public img?:string,
        public usuario?: Doctor,
        public clinica?:Clinica

    ){}
   // /uploads/usuarios/no-image
   
   

}