import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
    lessonsSubject:Subject<any>=new Subject<any>();
    lessons:any
    lessonsTypes : any[] = ['درس ديني','درس تعليمي','محاضرة','ندوة','دورة تكوينية','تحفيظ'];
    lessonsTimes : any[] = ['صباحا','قبل صلاة الظهر','بعد صلاة الظهر','قبل صلاة العصر','بعد صلاة العصر','بين العشائين'];
    emitLessons(){
        this.lessonsSubject.next(this.lessons);
    }
    constructor(private authService:AuthService,private http:HttpClient) {
    }

    public fetchLessonsByUser(month:string,year:string,username,categorie:string){
        return new Observable(observer=>{

            this.http.get
            (`${environment.backEndUrl}/users/lessons/list?month=${month}&year=${year}&username=${username}&categorie=${categorie}`,
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    this.lessons=resData;
                    this.emitLessons();
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )

        })
    }


    public createLesson(type:string,title:string,date:string,time:string,programId:string,username:string,area:string){
        return new Observable(observer=>{
            this.http.post
            (`${environment.backEndUrl}/users/lessons/add`,
                {type:type,title:title,date:date,time:time,programId:programId,username:username,area:area},this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();
                },
                (error)=>{observer.error(error)}
            )

        })

    }
    deleteLesson(id:number){

            return this.http.delete(`${environment.backEndUrl}/users/lessons/delete?id=${id}`
                ,this.authService.httpOptions())
    }

    public editLesson(id:number,type:string,title:string,date:string,time:string,programId:string,username:string,area:string){
        return new Observable(observer=>{
            this.http.put
            (`${environment.backEndUrl}/users/lessons/edit?id=${id}`,
                {type:type,title:title,date:date,time:time,programId:programId,username:username,area:area},this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();
                },
                (error)=>{observer.error(error)}
            )

        })

    }
}
