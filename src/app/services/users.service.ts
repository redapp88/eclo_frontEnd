import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    usersCategories : any[] = [
        {id: 'wa',name: 'واعظ'},
        {id: 'mo', name: 'متطوع'},
        {id: '3o', name: 'عضو'}
        ];
    usersAreas : any[] = [
        {id: 'taounate',name: 'تاونات'},
        {id: 'karia', name: 'القرية'},
        {id: 'ghafsay', name: 'غفساي'},
        {id: 'tissa', name: 'تيسة'},
        {id: 'tahrSouk', name: 'طهر الصوق'}
    ];
    usersSubject:Subject<any>=new Subject<any>();
    users:any
    emitUsers(){
        this.usersSubject.next(this.users);
    }
    constructor(private authService:AuthService,private http:HttpClient) {
    }

    public fetchUsers(status:string,keyword:string,categorie:string){
        return new Observable(observer=>{
            this.http.get
            (`${environment.backEndUrl}/admin/usersList?status=${status}&keyword=${keyword}&categorie=${categorie}`,
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    this.users=resData;
                    this.emitUsers();
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )

        })
    }

    addUser(username: string, password: string, name: string, sex: string, phone: string, categorie: string, area: string) {
        return new Observable(observer=>{
            this.http.post
            (`${environment.backEndUrl}/admin/addUser`,
                {username:username,password:password,name:name,sex:sex,phone:phone,categorie:categorie,area:area,status:'active'},
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();
                },
                (error)=>{observer.error(error)}
            )

        })
    }

    editUser(username: string, name: string, sex: string, phone: string, categorie: string, area: string,status:string) {
        return new Observable(observer=>{
            this.http.put
            (`${environment.backEndUrl}/admin/editUser?username=${username}`,
                {name:name,sex:sex,phone:phone,categorie:categorie,area:area,status:status},
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();
                },
                (error)=>{observer.error(error)}


            )

        })

    }

    editPassword(username: string, password: string) {
        return new Observable(observer=>{
            this.http.put
            (`${environment.backEndUrl}/user/editPassword?username=${username}`,
                {password:password},
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();
                },
                (error)=>{observer.error(error)}
            )

        })
    }

    deleteUser(username:string){
        return this.http.delete(`${environment.backEndUrl}/admin/deleteUser?username=${username}`
            ,this.authService.httpOptions())
    }
}