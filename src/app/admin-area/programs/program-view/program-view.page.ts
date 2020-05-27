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
import {AppUser} from '../../../models/appUser.model';
import {UserDetailsComponent} from '../../../shared/user-details/user-details.component';


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
                private toastCtrl:ToastController,
                private popoverCtrl:PopoverController
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


     loadUsersWithLessonsCount(){
        this.isLoading=true;
        this.programsService.fetchUsersByCountLesson
        (this.form.value['keyword'],this.month+this.year,this.form.value['categorie'],"active").subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message);this.isLoading=false;},
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


    onDownloadGeneralProgram(){
        let loading = this.loadingCtrl.create({
            message:"المرجو الانتظار",

        });
        loading.then(loadingEl=>{
            loadingEl.present();
            this.programsService.downloadGeneralProgram(this.month,this.year,this.form.value['categorie']).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message);},
                ()=>{
                    loadingEl.dismiss();
                    this.toastCtrl.create({message:"تحميل ناجح للملف",cssClass:"ion-text-center"
                        ,duration:2500}) .then(
                        (toastEL)=>{
                            toastEL.present()
                        }
                    )
                }
            );
        })

    }
    onDownloadIndividualProgram(username:string){
        let loading = this.loadingCtrl.create({
            message:"المرجو الانتظار",

        });
        loading.then(loadingEl=>{
            loadingEl.present();
            this.programsService.downloadUserProgram(this.month,this.year,username).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message);},
                ()=>{
                    loadingEl.dismiss();
                    this.toastCtrl.create({message:"تحميل ناجح للملف",cssClass:"ion-text-center"
                        ,duration:2500}) .then(
                        (toastEL)=>{
                            toastEL.present()
                        }
                    )
                }
            );
        })

    }
    public OnDetailsUserPopUp(user:AppUser){
        this.popOverCtrl.create({
            component:UserDetailsComponent,
            componentProps:{user:user}
        }).then(popEl=>{
            popEl.present();
        })
    }
}
