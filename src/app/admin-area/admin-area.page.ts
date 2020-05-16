import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ProgramsService} from '../services/programs.service';
import {Program} from '../models/Program.model';

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
      console.log("yess")
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
        ({header:"confirmation",
            message:"voulez vous vous déconnecter?",
            buttons:[
                {text:"oui",handler:()=>{this.authService.logout()}},
                {text:"non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }
}
