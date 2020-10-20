import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
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
    @Input()editable:boolean;
    form:FormGroup;
    usersCategories: any[];
    usersAreas: any[]
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private lessonsService:LessonsService,
                private loadingCtrl:LoadingController,
                private authService:AuthService,
                private usersService:UsersService,
                private toastCtrl:ToastController) { }

    ngOnInit() {
        this.usersCategories=this.usersService.usersCategories;
        this.usersAreas=this.usersService.usersAreas;

        this.form=new FormGroup({
            name:new FormControl({value:this.user.name,disabled:!this.editable},{
                updateOn:'change',
                validators:[Validators.required],
            }),
            sex:new FormControl({value:this.user.sex,disabled:!this.editable},{
                updateOn:'change',
                validators:[Validators.required]
            }),
            phone:new FormControl({value:this.user.phone,disabled:false},{
                updateOn:'change',
                validators:[Validators.required]
            }),
            categorie:new FormControl({value:this.user.categorie,disabled:!this.editable},{
                updateOn:'change',
                validators:[Validators.required]
            }),
            area:new FormControl({value:this.user.area,disabled:!this.editable},{
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
        ({header:"تأكيد",
            message:"هل تريد تعديل المعلومات؟",
            buttons:[
                {text:"نعم",handler:()=>{
                        this.editUser(this.user.username,
                            this.form.get('name').value,this.form.get('sex').value,this.form.get('phone').value,
                            this.form.get('categorie').value,this.form.get('area').value,this.user.status)
                    }},
                {text:"لا",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    editUser(username:string,name:string,sex:string,phone:string,categorie:string,area:string,status:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'تسجيل...'}).then((loadingEl)=>{
            loadingEl.present();
            this.usersService.editUser(username,name,sex,phone,categorie,area,status).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.usersService.showAlert(error.error.message)},
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
                this.toastCtrl.create(
                    {message:'عملية ناجحة',color:'success',cssClass:"ion-text-center",duration:2000}
                ).then(toastEl=>{toastEl.present()})
            }
        })
    }


}
