import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {EditPasswordComponent} from '../../shared/edit-password/edit-password.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ProgramsService} from '../../services/programs.service';
import {Program} from '../../models/Program.model';
import {PersProgramViewComponent} from '../../user-area/pers-program-view/pers-program-view.component';
import {AddUserComponent} from '../users/add-user/add-user.component';
import {AddProgramComponent} from './add-program/add-program.component';
import {GeneralProgramViewComponent} from './program-view/general-program-view/general-program-view.component';
import {EditProgramComponent} from './edit-program/edit-program.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private popOverCtrl:PopoverController,
                private authService:AuthService,
                private router:Router,
                private programsService:ProgramsService
    ) { }
    loadedPrograms:Program[];
    programsSubscription:Subscription;
    isLoading=false;
    userSubscription:Subscription;

    ngOnInit() {
        this.programsSubscription=this.programsService.programsSubject.subscribe(
            (resultData)=>{
                //console.log(resultData)
                this.loadedPrograms=resultData;
            }
        )
    }

    ionViewWillEnter(){
        this.loadPrograms();

    }
    onAddProgram() {
        this.modalCtrl.create(
            {component:AddProgramComponent,componentProps:{}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.loadPrograms();
            }
        })
    }

    private loadPrograms(){

        this.isLoading=true;
        this.programsService.fetchPrograms().subscribe(
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
    onGoToProgram(month: number,year:number) {
        this.router.navigate(['/','adminArea','programs',month,year])
    }

    onChangeStatus($event,program:Program) {
            program.status=$event.detail.value;
            this.programsService.editProgram(program.month,program.year,program.hijri,program.status).subscribe(
                ()=>{},
                (error)=>{this.showAlert(error)},
                ()=>{this.loadPrograms()}
            )
    }

    onEditProgram(program: Program) {
        this.modalCtrl.create(
            {component:EditProgramComponent,componentProps:{program:program}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.loadPrograms();
            }
        })
    }
}
