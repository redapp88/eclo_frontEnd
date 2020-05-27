import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../../services/lessons.service';
import {AuthService} from '../../../services/auth.service';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent  implements OnInit {

    form:FormGroup;
    usersCategories: any[];
    usersAreas: any[];
    constructor(private modalCtrl:ModalController,
        private alertCtrl:AlertController,
        private lessonsService:LessonsService,
        private loadingCtrl:LoadingController,
        private authService:AuthService,
                private usersService:UsersService) { }

    ngOnInit() {
        this.usersCategories=this.usersService.usersCategories;
        this.usersAreas=this.usersService.usersAreas;

        this.form=new FormGroup({
            username:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required,Validators.minLength(4)]
            }),
            password:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required,Validators.maxLength(12),Validators.minLength(4)]
            }),
            name:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            sex:new FormControl('m',{
                updateOn:'change',
                validators:[Validators.required]
            }),
            phone:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            categorie:new FormControl(this.usersCategories[0].id,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            area:new FormControl(this.usersAreas[0].id,{
                updateOn:'change',
                validators:[Validators.required]
            })

        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onAddUser() {
        this.alertCtrl.create
        ({header:"confirmation",
            message:"voulez vous enregistrer cet utilisateur?",
            buttons:[
                {text:"oui",handler:()=>{
                        this.addUser(this.form.value['username'],this.form.value['password'],
                            this.form.value['name'],this.form.value['sex'],this.form.value['phone'],
                            this.form.value['categorie'],this.form.value['area'])
                    }},
                {text:"non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    addUser(username:string,password:string,name:string,sex:string,phone:string,categorie:string,area:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'enregistrement...'}).then((loadingEl)=>{
            loadingEl.present();
            this.usersService.addUser(username,password,name,sex,phone,categorie,area).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message)},
                ()=>{this.modalCtrl.dismiss({},'success');loadingEl.dismiss()}
            )
        })

    }

}