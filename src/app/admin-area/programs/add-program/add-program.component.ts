import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../../services/lessons.service';
import {AuthService} from '../../../services/auth.service';
import {UsersService} from '../../../services/users.service';
import {ProgramsService} from '../../../services/programs.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss'],
})
export class AddProgramComponent implements OnInit {
    today:Date=new Date();
    form:FormGroup;
    months: any[];
    years: any[]
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private lessonsService:LessonsService,
                private loadingCtrl:LoadingController,
                private programsService:ProgramsService) { }

    ngOnInit() {
        this.months=this.programsService.months;
        this.years=this.programsService.years;
        this.form=new FormGroup({
            month:new FormControl(this.today.getMonth()+1,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            year:new FormControl(this.today.getYear()+1900,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            hijri:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required]
            }),
        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onAddProgram() {
        this.alertCtrl.create
        ({header:"confirmation",
            message:"voulez vous enregistrer cet utilisateur?",
            buttons:[
                {text:"oui",handler:()=>{
                        this.addProgram(this.form.value['month'],this.form.value['year'],
                            this.form.value['hijri'])
                    }},
                {text:"non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    addProgram(month:number,year:number,hijri:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'enregistrement...'}).then((loadingEl)=>{
            loadingEl.present();
            this.programsService.addProgram(month,year,hijri).subscribe(
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
