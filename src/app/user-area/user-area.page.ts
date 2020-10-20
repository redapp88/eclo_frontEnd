import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertController, ModalController, PopoverController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ProgramsService} from '../services/programs.service';
import {Program} from '../models/Program.model';
import {PersProgramViewComponent} from './pers-program-view/pers-program-view.component';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';
import {UsersService} from '../services/users.service';
import {EditUserComponent} from '../admin-area/users/edit-user/edit-user.component';

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
                private programsService:ProgramsService,
                private usersService:UsersService,
                private toastCtrl:ToastController
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
            // console.log(this.authService.curentUser);
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
            (error)=>{this.usersService.showAlert(error.error.message);this.isLoading=false;},
            ()=>{
                this.isLoading=false;
            }
        );
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
                this.authService.logout();
            }
        })
    }

    onEditProfile(){
        this.modalCtrl.create(
            {component:EditUserComponent,componentProps:{user:this.authService.curentUser,editable:false}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.authService.logout();
                this.toastCtrl.create(
                    {message:'عملية ناجحة',color:'success',cssClass:"ion-text-center",duration:1500}
                ).then(toastEl=>{toastEl.present()})
            }
        })
    }

    monthName(month) {
        return this.programsService.getMonthName(month);
    }
}
