import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ProgramsService} from '../services/programs.service';
import {Program} from '../models/Program.model';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.page.html',
  styleUrls: ['./admin-area.page.scss'],
})
export class AdminAreaPage implements OnInit {
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private popOverCtrl:PopoverController,
                private authService:AuthService,
                private router:Router,
                private programsService:ProgramsService
    ) { }
    currentUserName:string;
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
    }

    ionViewWillEnter(){
    }


    onLogout(){
        this.alertCtrl.create
        ({header:"تأكيد",
            message:"هل تأكد طلب الخروج؟",
            buttons:[
                {text:"نعم",handler:()=>{this.authService.logout()}},
                {text:"لا",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
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
}
