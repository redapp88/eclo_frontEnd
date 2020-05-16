import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../../services/lessons.service';
import {AuthService} from '../../../services/auth.service';
import {UsersService} from '../../../services/users.service';
import {EditPasswordComponent} from '../../../shared/edit-password/edit-password.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

    @Input() user:any;
    form:FormGroup;
    usersCategories: any[];
    usersAreas: any[]
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
            name:new FormControl(this.user.name,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            sex:new FormControl(this.user.sex,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            phone:new FormControl(this.user.phone,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            categorie:new FormControl(this.user.categorie,{
                updateOn:'change',
                validators:[Validators.required]
            }),
            area:new FormControl(this.user.area,{
                updateOn:'change',
                validators:[Validators.required]
            })

        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onEditUser() {
        this.alertCtrl.create
        ({header:"confirmation",
            message:"voulez vous enregistrer les modifications?",
            buttons:[
                {text:"oui",handler:()=>{
                        this.editUser(this.user.username,
                            this.form.value['name'],this.form.value['sex'],this.form.value['phone'],
                            this.form.value['categorie'],this.form.value['area'],this.user.status)
                    }},
                {text:"non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    editUser(username:string,name:string,sex:string,phone:string,categorie:string,area:string,status:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'enregistrement...'}).then((loadingEl)=>{
            loadingEl.present();
            this.usersService.editUser(username,name,sex,phone,categorie,area,status).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.showAlert(error.message)},
                ()=>{this.modalCtrl.dismiss({},'success');loadingEl.dismiss()}
            )
        })

    }
    onEditPassword(username:string) {
        this.modalCtrl.create(
            {component:EditPasswordComponent,componentProps:{username:username}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
             //
            }
        })
    }

    private showAlert(message:string){
        this.alertCtrl.create({header:'Message',message:message,buttons:['Okay']}).then(
            (alertEl=>{alertEl.present()})
        )
    }

}
