import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../../services/lessons.service';
import {AuthService} from '../../../services/auth.service';
import {DatePipe} from '@angular/common';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss'],
})
export class AddLessonComponent implements OnInit {
    @Input() month:string;
    @Input() year:string;
    minDate:string;
    maxDate:string;
    defaultDate:string;
    form:FormGroup;
    lessonsTypes : any[];
    lessonsTimes : any[];
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private lessonsService:LessonsService,
                private usersService:UsersService,
                private loadingCtrl:LoadingController,
                private authService:AuthService,
                public datepipe: DatePipe) { }

    ngOnInit() {
        this.lessonsTypes=this.lessonsService.lessonsTypes;
        this.lessonsTimes=this.lessonsService.lessonsTimes;
        let checkMonth=this.month;
if(this.month.length<2)
    checkMonth='0'+this.month;
        this.minDate=this.year+"-"+checkMonth;
        this.maxDate=this.year+"-"+checkMonth;
        console.log(this.minDate);
        this.defaultDate=this.maxDate+"-01";
        this.form=new FormGroup({
            type:new FormControl(this.lessonsTypes[0],{
                updateOn:'change',
                validators:[Validators.required]
            }),
            title:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required,Validators.maxLength(180),Validators.minLength(5)]
            }),
            date:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            time:new FormControl(this.lessonsTimes[0],{
                updateOn:'change',
                validators:[Validators.required]
            }),
            area:new FormControl("",{
                updateOn:'change',
                validators:[Validators.required]
            })

        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onCreateLesson() {
        this.alertCtrl.create
        ({header:"تاكيد",
            message:"هل تريد تسجيل الدرس؟",
            buttons:[
                {text:"نعم",handler:()=>{
                    this.createLesson(this.form.value['type'],this.form.value['title'],
                        this.form.value['date'],this.form.value['time'],this.month+this.year,
                        this.authService.curentUser.username,this.form.value['area'])
                    }},
                {text:"لا",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    createLesson(type:string,title:string,date:string,time:string,programId:string,username:string,area:string){
        let formated_date =this.datepipe.transform(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        console.log(type,formated_date);
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'المرجو الانتظار...'}).then((loadingEl)=>{
            loadingEl.present();
            this.lessonsService.createLesson(type,title,formated_date,time,programId,username,area).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message)},
                ()=>{this.modalCtrl.dismiss({},'success');loadingEl.dismiss()}
            )
        })

    }


}
