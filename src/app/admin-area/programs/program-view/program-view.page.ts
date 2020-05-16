import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, PopoverController, ToastController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgramsService} from '../../../services/programs.service';
import {UsersService} from '../../../services/users.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersProgramViewComponent} from '../../../user-area/pers-program-view/pers-program-view.component';
import {GeneralProgramViewComponent} from './general-program-view/general-program-view.component';

@Component({
  selector: 'app-program-view',
  templateUrl: './program-view.page.html',
  styleUrls: ['./program-view.page.scss'],
})
export class ProgramViewPage implements OnInit {
    constructor(private route:ActivatedRoute,
                private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private popOverCtrl:PopoverController,
                private authService:AuthService,
                private router:Router,
                private navCtrl:NavController,
                private programsService:ProgramsService,
                private usersService:UsersService,
                private loadingCtrl:LoadingController,
                private toastCtrl:ToastController
    ) { }
    form:FormGroup;
    usersCategories: any[];
    loadedUsersWithCount:any[];
    usersWithCount:Subscription;
    isLoading=false;
    month:string;
    year:string;
    ngOnInit() {
        this.route.paramMap.subscribe(

            paramMap=>{
                if(!paramMap.has("month") || !paramMap.has("year")){
                    this.navCtrl.navigateBack('adminArea/programs');
                    return
                }
                this.month=paramMap.get("month");
                this.year=paramMap.get("year");

                    }
                )
        this.usersCategories=this.usersService.usersCategories;
        this.form=new FormGroup({

            categorie:new FormControl(this.usersCategories[0].id,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            keyword:new FormControl("",{
                updateOn:'change',
                validators:[]
            }),


        })
        this.usersWithCount=this.programsService.usersWithCountSubject.subscribe(
            (resultData)=>{
                console.log(resultData)
                this.loadedUsersWithCount=resultData;
            }
        )
    }

    ionViewWillEnter(){
        this.loadUsersWithLessonsCount();

    }


    private loadUsersWithLessonsCount(){
        this.isLoading=true;
        this.programsService.fetchUsersByCountLesson
        (this.form.value['keyword'],this.month+this.year,this.form.value['categorie'],"active").subscribe(
            ()=>{},
            (error)=>{this.showAlert(error.message);this.isLoading=false;},
            ()=>{
                this.isLoading=false;
            }
        );
    }

    onShowProgram(username:string,name:string) {
        this.modalCtrl.create(
            {component:PersProgramViewComponent,componentProps:{month:this.month,year:this.year,username:username,name:name}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        })
    }
    onShowGeneralProgram() {
        this.modalCtrl.create(
            {component:GeneralProgramViewComponent,componentProps:{month:this.month,year:this.year,categorie:this.form.value['categorie']}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        })
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

    onDownloadProgram(){
        let loading = this.loadingCtrl.create({
            message:"chargement",

        });
        loading.then(loadingEl=>{
            loadingEl.present();
            this.programsService.downloadGeneralProgram(this.month,this.year,this.form.value['categorie']).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.showAlert(error.message);},
                ()=>{
                    loadingEl.dismiss();
                    this.toastCtrl.create({message:"Telechargement reussie ",cssClass:"ion-text-center"
                        ,duration:2500}) .then(
                        (toastEL)=>{
                            toastEL.present()
                        }
                    )
                }
            );
        })

    }
}
