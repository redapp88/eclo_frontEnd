import {AppUser} from './appUser.model';
import {Program} from './Program.model';
export class Lesson {
    constructor(public id:number,
                public type:string,
                public title:string,
                public date:Date,
                public time:string,
                public area:string,
                public program:Program,
                public appUser:AppUser){}

};