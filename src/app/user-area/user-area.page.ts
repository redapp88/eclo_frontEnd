import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ProgramsService} from '../services/programs.service';
import {Program} from '../models/Program.model';
import {PersProgramViewComponent} from './pers-program-view/pers-program-view.component';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.page.html',
  styleUrls: ['./user-area.page.scss'],
})
export class UserAreaPage implements OnInit {
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private popOverCtrl:PopoverController,
                private authService:AuthService,
                private router:Router,
                private programsService:ProgramsService
    ) { }
     currentUserName:string;
    loadedPrograms:Program[];
    programsSubscription:Subscription;
    isLoading=false;
    userSubscription:Subscription;

    ngOnInit() {
        this.userSubscription=this.authService.userSubject.subscribe(
            (resData)=>{
                if(resData===null){
                    this.router.navigate(['/login'])
                }
            }
        )
        this.currentUserName=this.authService.curentUser.name
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

    onLogout(){
        this.alertCtrl.create
        ({header:"تأكيد",
            message:"هل تؤكد طلب الخروج",
            buttons:[
                {text:"نعم",handler:()=>{this.authService.logout()}},
                {text:"لا",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    onGoToProgram(month: string,year:string) {
        this.router.navigate(['/','userArea',month,year])
    }

    onShowProgram(month: string,year:string) {
        this.modalCtrl.create(
            {component:PersProgramViewComponent,componentProps:{month:month,year:year,
                    username:this.authService.curentUser.username,name:this.authService.curentUser.name}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        })
    }

    onEditPassword() {
        this.modalCtrl.create(
            {component:EditPasswordComponent,componentProps:{username:this.authService.curentUser.username}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
               this.onLogout();
            }
        })
    }
}
