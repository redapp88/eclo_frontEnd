import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../../services/lessons.service';
import {AuthService} from '../../../services/auth.service';
import {DatePipe} from '@angular/common';
import {Lesson} from '../../../models/Lesson.model';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss'],
})
export class EditLessonComponent implements OnInit {
    @Input() lesson:Lesson;
    minDate:string;
    maxDate:string;
    defaultDate:string;
    form:FormGroup;
    lessonsTypes : any[];
    lessonsTimes : any[];

    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private lessonsService:LessonsService,
                private loadingCtrl:LoadingController,
                private authService:AuthService,
                public datepipe: DatePipe) { }

    ngOnInit() {
        this.lessonsTypes=this.lessonsService.lessonsTypes;
        this.lessonsTimes=this.lessonsService.lessonsTimes;
        this.minDate=this.lesson.program.year+"-"+this.lesson.program.month;
        this.maxDate=this.lesson.program.year+"-"+this.lesson.program.month;
        this.defaultDate=this.maxDate+"-01";
        this.form=new FormGroup({
            type:new FormControl(this.lesson.type,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            title:new FormControl(this.lesson.title,{
                updateOn:'change',
                validators:[Validators.required,Validators.maxLength(180),Validators.minLength(5)]
            }),
            date:new FormControl(this.lesson.date,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            time:new FormControl(this.lesson.time,{
                updateOn:'change',
                validators:[Validators.required]
            })

        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onEditLesson() {
        this.alertCtrl.create
        ({header:"تأكيد",
            message:"هل تؤكد التعديلات؟",
            buttons:[
                {text:"نعم",handler:()=>{
                        this.editLesson(this.lesson.id,this.form.value['type'],this.form.value['title'],
                            this.form.value['date'],this.form.value['time'],null,
                            null)
                    }},
                {text:"لا",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    editLesson(id:number,type:string,title:string,date:string,time:string,programId:string,username:string){
        let formated_date =this.datepipe.transform(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        console.log(type,formated_date);
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'المرجو الانتظار...'}).then((loadingEl)=>{
            loadingEl.present();
            this.lessonsService.editLesson(id,type,title,formated_date,time,programId,username).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.showAlert(error.message)},
                ()=>{this.modalCtrl.dismiss({},'success');loadingEl.dismiss()}
            )
        })

    }

    private showAlert(message:string){
        this.alertCtrl.create({header:'Message',message:message,buttons:['Okay']}).then(
            (alertEl=>{alertEl.present()})
        )
    }
}

