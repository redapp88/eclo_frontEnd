import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../../../../models/Lesson.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../services/auth.service';
import {LessonsService} from '../../../../services/lessons.service';
import {ActivatedRoute} from '@angular/router';
import {AlertController, ModalController} from '@ionic/angular';
import {ProgramsService} from '../../../../services/programs.service';
import {UsersService} from '../../../../services/users.service';

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
                private programsService:ProgramsService,
                private usersService:UsersService) { }


    @Input() month:string;
    @Input() year:string;
    @Input() categorie:string;

    loadedLessons:Lesson[];
    isLoading:boolean;
    lessonsSubscription:Subscription;
    categorieName:string;

    ngOnInit() {
        this.lessonsSubscription=this.lessonsService.lessonsSubject.subscribe(
            (resultData)=>{
                this.loadedLessons=resultData
            }
        )
        this.categorieName=this.getCategorieName(this.categorie);
    }





    ionViewWillEnter(){
        this.loadLessons();

    }
    private getCategorieName(categorie:string){
        let categorieName:string="";
        for(var i:number=0;i<this.usersService.usersCategories.length;i++){
            if(this.usersService.usersCategories[i].id==categorie)
                categorieName=this.usersService.usersCategories[i].name
        }
        return categorieName
    }
    private loadLessons(){
        this.loadedLessons=[];
        this.isLoading=true;
        this.lessonsService.fetchLessonsByUser(this.month,this.year,
            '*',this.categorie).subscribe(
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
        this.programsService.downloadUserProgram(this.month,this.year,'*')

    }

}
