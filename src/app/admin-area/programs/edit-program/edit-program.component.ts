import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ProgramsService} from '../../../services/programs.service';
import {LessonsService} from '../../../services/lessons.service';
import {Lesson} from '../../../models/Lesson.model';
import {Program} from '../../../models/Program.model';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss'],
})
export class EditProgramComponent implements OnInit {
    form:FormGroup;
    months: any[];
    years: any[];
    @Input() program:Program;
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private lessonsService:LessonsService,
                private loadingCtrl:LoadingController,
                private toastctrl:ToastController,
                private programsService:ProgramsService,
                private usersService:UsersService) { }

    ngOnInit() {

        this.form=new FormGroup({

            hijri:new FormControl(this.program.hijri,{
                updateOn:'change',
                validators:[Validators.required]
            }),
        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onEditProgram() {
        this.alertCtrl.create
        ({header:"confirmation",
            message:"voulez vous editer ce programme?",
            buttons:[
                {text:"oui",handler:()=>{
                        this.editProgram(this.program.month,this.program.year,this.form.value['hijri'],this.program.status)
                    }},
                {text:"non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    editProgram(month:number,year:number,hijri:string,status:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'enregistrement...'}).then((loadingEl)=>{
            loadingEl.present();
            this.programsService.editProgram(month,year,hijri,status).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message)},
                ()=>{this.modalCtrl.dismiss({},'success');loadingEl.dismiss()}
            )
        })

    }

    onDeleteProgram() {
        this.alertCtrl.create(
            {header:'confirmation',
                message:'voulez vous vraiment supprimer cet program Attention ! cela va supprimer tout les cours',
                buttons:[{text:'Oui',handler:()=>{this.deleteProgram(this.program.programId)}},{text:'Annuler',role:'cancel'}]}
        ).then(alertEl=>{
            alertEl.present()
        })
    }
    private deleteProgram(id:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'suppression...'}).then((loadingEl)=>{
        this.programsService.deleteProgram(id).subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message)},
            ()=>{loadingEl.dismiss();this.modalCtrl.dismiss({},'success');
                this.toastctrl.create(
                    {message:'operation reussite',color:'success',duration:2000}
                ).then(toastEl=>{toastEl.present()})}
        )
    })
    }

}
