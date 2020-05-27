import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {FormGroup} from '@angular/forms';
import {Program} from '../../models/Program.model';
import {Subscription} from 'rxjs';
import {LessonsService} from '../../services/lessons.service';
import {AuthService} from '../../services/auth.service';
import {Lesson} from '../../models/Lesson.model';
import {AddLessonComponent} from './add-lesson/add-lesson.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

    constructor(private route:ActivatedRoute,
                private navCtrl:NavController,
                private loadingCtrl:LoadingController,
                private router:Router,
                private lessonsService:LessonsService,
                private usersService:UsersService,
                private authService:AuthService,
                private alertCtrl:AlertController,
                private modalCtrl:ModalController,
                private toastctrl:ToastController) { }
    loadedLessons:Lesson[];
    lessonsSubscription:Subscription;
    userSubscription:Subscription;
    isLoading=false;
    month:string;
    year:string;
    ngOnInit() {
        this.route.paramMap.subscribe(

            paramMap=>{
                if(!paramMap.has("month") || !paramMap.has("year")){
                    this.navCtrl.navigateBack('userArea');
                    return
                }
                this.month=paramMap.get("month");
                this.year=paramMap.get("year");
                this.isLoading=true;
                this.userSubscription=this.authService.userSubject.subscribe(
                    (resData)=>{
                        if(resData===null){
                            this.router.navigate(['/login'])
                        }
                    }
                )
                this.lessonsSubscription=this.lessonsService.lessonsSubject.subscribe(
                    (resultData)=>{
                        console.log(resultData)
                        this.loadedLessons=resultData
                    }
                )


            }
        )


    }
    ionViewWillEnter(){
        this.loadLessons();

    }
    private loadLessons(){
        this.loadedLessons=[];
        this.isLoading=true;
        this.lessonsService.fetchLessonsByUser(this.month,this.year,this.authService.curentUser.username,'*').subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message);this.isLoading=false;},
            ()=>{
                this.isLoading=false;
            }
        );
    }


    onLogout(){
        this.alertCtrl.create
        ({header:"تأكيد",
            message:"هل تؤكد الخروج؟",
            buttons:[
                {text:"نعم",handler:()=>{this.authService.logout()}},
                {text:"لا",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    onAddLesson() {
        this.modalCtrl.create(
            {component:AddLessonComponent,componentProps:{month:this.month,year:this.year}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.loadLessons();
            }
        })
    }


    onDeleteLesson(id:number) {
        this.alertCtrl.create(
            {header:'confirmation',
                message:'voulez vous vraiment supprimer cette lesson',
                buttons:[{text:'Oui',handler:()=>{this.deleteLesson(id)}},{text:'Annuler',role:'cancel'}]}
        ).then(alertEl=>{
            alertEl.present()
        })
    }
    private deleteLesson(id:number){
        this.lessonsService.deleteLesson(id).subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message)},
            ()=>{this.loadLessons();
            this.toastctrl.create(
                {message:'operation reussite',color:'success',duration:2000}
            ).then(toastEl=>{toastEl.present()})}
        )
    }

    onEditLesson(lesson:Lesson) {
        this.modalCtrl.create(
            {component:EditLessonComponent,componentProps:{lesson:lesson}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.loadLessons();
            }
        })
    }
}