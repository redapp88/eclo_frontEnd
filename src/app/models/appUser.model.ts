export class AppUser{
    constructor(public username:string,
                public name:string,
                public categorie:string,
                public sex:string,
                public area:string,
                public phone:string,
                public status:string,
                public roles:{authority:string}[],
                public expirationDate:Date,
                public jwt:string){}



    get token(){
        if(!this.expirationDate || this.expirationDate<=new Date()){
            return null
        }
        else {
            return this.jwt;
        }
    }

    get tokenDuration(){
        if(!this.token)
            return 0
        else
            return this.expirationDate.getTime()-new Date().getTime();
    }
}