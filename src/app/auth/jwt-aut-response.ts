export class JwtAutResponse{
    token: string ;
    constructor(token:string , username:string){
        this.token = token;
    }
    
}