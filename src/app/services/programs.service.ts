import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {Program} from '../models/Program.model';
import {DownloadsService} from './downloads.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
    months : any[] = [1,2,3,4,5,6,7,8,9,10,11,12];
    years : any[] = [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
    programsSubject:Subject<any>=new Subject<any>();
    programs:any
    emitPrograms(){
        this.programsSubject.next(this.programs);
    }

    usersWithCountSubject:Subject<any>=new Subject<any>();
    usersWithCount:any
    emitUsersWithCount(){
        this.usersWithCountSubject.next(this.usersWithCount);
    }
    constructor(private authService:AuthService,
                private http:HttpClient,
                private dowloadsService:DownloadsService) {
    }

    public fetchPrograms(){
        return new Observable(observer=>{

            this.http.get
            (`${environment.backEndUrl}/users/programs/list`,this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    this.programs=resData;
                    this.emitPrograms();
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )

        })
    }


    addProgram(month: number, year: number, hijri: string) {
        return new Observable(observer=>{
            this.http.post
            (`${environment.backEndUrl}/admin/programs/add`,
                {month:month,year:year,hijri:hijri},
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();

                },
                (error)=>{observer.error(error)}
            )

        })
    }

    editProgram(month:number,year:number,hijri:string,status:string) {
       return  this.http.put
        (`${environment.backEndUrl}/admin/programs/edit?month=${month}&year=${year}`,
            {month:month,year:year,status:status,hijri:hijri},
            this.authService.httpOptions())
}

    deleteProgram(id:string){

        return this.http.delete(`${environment.backEndUrl}/admin/programs/delete?id=${id}`
            ,this.authService.httpOptions())
    }

    fetchUsersByCountLesson(keyword:string,programId:string,categorie:string,status:string) {

        return new Observable(observer=>{
            this.http.get
            (`${environment.backEndUrl}/admin/programs/LessonsCountByUser?keyword=${keyword}&programId=${programId}&categorie=${categorie}&status=${status}`
                ,this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    this.usersWithCount=resData;
                    this.emitUsersWithCount()
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )

        })

    }
    public downloadUserProgram(month:string,year:string,username:string){
        return new Observable(observer=>{
            this.http.get
            (`${environment.backEndUrl}/exportProgramPdf?month=${month}&year=${year}&username=${username}`
                ,this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    this.dowloadsService.downloadFile(resData.name).subscribe(
                        ()=>{},
                    (error)=>{observer.error(error)},
                    ()=>{observer.complete()}
                    );
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )

        })
    }

    public downloadGeneralProgram(month:string,year:string,categorie:string){
        console.log(month,year,categorie);
        return new Observable(observer=>{
            this.http.get
            (`${environment.backEndUrl}/exportProgramXls?month=${month}&year=${year}&username=*&categorie=${categorie}`
                ,this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    this.dowloadsService.downloadFile(resData.name).subscribe(
                        ()=>{},
                        (error)=>{observer.error(error)},
                        ()=>{observer.complete()}
                    );
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )

        })
    }


}
