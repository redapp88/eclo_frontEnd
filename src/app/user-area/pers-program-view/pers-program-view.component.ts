import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {AddLessonComponent} from '../lessons/add-lesson/add-lesson.component';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {LessonsService} from '../../services/lessons.service';
import {EditLessonComponent} from '../lessons/edit-lesson/edit-lesson.component';
import {Lesson} from '../../models/Lesson.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Program} from '../../models/Program.model';
import {ProgramsService} from '../../services/programs.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-pers-program-view',
  templateUrl: './pers-program-view.component.html',
  styleUrls: ['./pers-program-view.component.scss'],
})
export class PersProgramViewComponent implements OnInit {

    constructor(private route:ActivatedRoute,
                private lessonsService:LessonsService,
                private usersService:UsersService,
                private authService:AuthService,
                private alertCtrl:AlertController,
                private modalCtrl:ModalController,
                private programsService:ProgramsService,
                private loadingCtrl:LoadingController,
                private toastCtrl:ToastController) { }


    @Input() month:string;
    @Input() year:string;
    @Input() username:string;
    loadedLessons:Lesson[];
    isLoading:boolean;
    lessonsSubscription:Subscription;

    ngOnInit() {
                this.lessonsSubscription=this.lessonsService.lessonsSubject.subscribe(
                    (resultData)=>{
                        console.log(resultData)
                        this.loadedLessons=resultData
                    }
                )

    }



    ionViewWillEnter(){
        this.loadLessons();

    }
    private loadLessons(){
        this.loadedLessons=[];
        this.isLoading=true;
        this.lessonsService.fetchLessonsByUser(this.month,this.year,
            this.username,'*').subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message);this.isLoading=false;},
            ()=>{
                this.isLoading=false;
            }
        );
    }

    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }
    onDownloadProgram(){
        let loading = this.loadingCtrl.create({
    message:"المرجو الانتظار",

        });
        loading.then(loadingEl=>{
            loadingEl.present();
            this.programsService.downloadUserProgram(this.month,this.year,this.username).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message);},
                ()=>{
                    loadingEl.dismiss();
                    this.toastCtrl.create({message:"تحميل ناجح ",color:'success',cssClass:"ion-text-center"
                        ,duration:2500}) .then(
                        (toastEL)=>{
                            toastEL.present()
                        }
                    )
                }
            );
        })

    }

    monthName(month){
        return this.programsService.getMonthName(month);
    }

    }