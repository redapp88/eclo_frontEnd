import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../../../../models/Lesson.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../services/auth.service';
import {LessonsService} from '../../../../services/lessons.service';
import {ActivatedRoute} from '@angular/router';
import {AlertController, ModalController} from '@ionic/angular';
import {ProgramsService} from '../../../../services/programs.service';

@Component({
  selector: 'app-general-program-view',
  templateUrl: './general-program-view.component.html',
  styleUrls: ['./general-program-view.component.scss'],
})
export class GeneralProgramViewComponent implements OnInit {

    constructor(private route:ActivatedRoute,
                private lessonsService:LessonsService,
                private authService:AuthService,
                private alertCtrl:AlertController,
                private modalCtrl:ModalController,
                private programsService:ProgramsService) { }


    @Input() month:string;
    @Input() year:string;
    @Input() categorie:string;

    loadedLessons:Lesson[];
    isLoading:boolean;
    lessonsSubscription:Subscription;

    ngOnInit() {
        this.lessonsSubscription=this.lessonsService.lessonsSubject.subscribe(
            (resultData)=>{
                console.log(resultData)
                this.loadedLessons=resultData
            }
        )}



    ionViewWillEnter(){
        this.loadLessons();

    }
    private loadLessons(){
        this.loadedLessons=[];
        this.isLoading=true;
        this.lessonsService.fetchLessonsByUser(this.month,this.year,
            '*',this.categorie).subscribe(
            ()=>{},
            (error)=>{this.showAlert(error.message);this.isLoading=false;},
            ()=>{
                this.isLoading=false;
            }
        );
    }
    showAlert(message){
        this.alertCtrl.create({
            message:message,
            header:'erreur',
            buttons:[{text:'Ok',role:'cancel'}]
        }).then(
            (alertEl)=>{alertEl.present()}
        )
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }
    onDownloadProgram(){
        this.programsService.downloadUserProgram(this.month,this.year,'*')

    }

}
