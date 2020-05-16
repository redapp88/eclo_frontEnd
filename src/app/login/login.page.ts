import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {environment} from '../../environments/environment';

export interface AuthData{
    username:string,
    password:string
}
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    scannedData: any;
    encodedData: '';
    encodeData: any;
    constructor(private authService:AuthService,
                private router:Router,
                private loadingCtrl:LoadingController,
                private alertCtrl:AlertController,
                public toastCtrl:ToastController) { }

    ngOnInit() {
    }
    ionViewWillEnter(){
        if(this.authService.curentUser)
            this.roleRedirecte();
        else{
            this.authService.autoLogin().subscribe(
                (resData)=>{if(resData){
                    this.roleRedirecte();
                }}
            )
        }
    }


    onLogin(form){
        if(!form.valid){
            return;
        }
        const username=form.value.username;
        const password=form.value.password;
        this.login(username,password);

    }
    private login(username:string,password:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'المرجو الانتظار...'}).then((loadingEL)=>{
            loadingEL.present();
            this.authService.login(username,password).subscribe(
                ()=>{},
                (error)=>{
                    console.log(error)
                    loadingEL.dismiss();

                    this.showAlert(this.authCodeToError(error))},
                ()=>{

                    loadingEL.dismiss();
                    this.roleRedirecte();

                })
        })
    }


    private showAlert(message:string){
        this.alertCtrl.create({header:'Message',message:message,buttons:['Okay']}).then(
            (alertEl=>{alertEl.present()})
        )
    }
    private authCodeToError(message:string){
        if(message==='EMAIL_EXISTS')
            return 'An account with this Email exists Already'
        if(message==='EMAIL_NOT_FOUND')
            return 'Email not found'
        if(message==='INVALID_PASSWORD')
            return 'incorrecte password'
        if(message==='USER_DISABLED')
            return 'This account is disabled'

        else{
            return 'An authentication error has occured please check you Internet connexion'
        }

    }
    private roleRedirecte(){
if(this.authService.isUser())
        this.router.navigate(['userArea']);
else if(this.authService.isManager())
        this.router.navigate(['adminArea']);
        this.toastCtrl.create({message:" مرحبا بك "+this.authService.curentUser.name,cssClass:"ion-text-center"
            ,duration:3000}) .then(
            (modalEL)=>{
                modalEL.present()
            }
        )
    }
}
