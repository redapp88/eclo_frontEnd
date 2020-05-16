import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LessonsService} from '../../services/lessons.service';
import {AuthService} from '../../services/auth.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
})
export class EditPasswordComponent implements OnInit {

    @Input() username:string;
    form:FormGroup;
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private lessonsService:LessonsService,
                private loadingCtrl:LoadingController,
                private authService:AuthService,
                private usersService:UsersService) { }

    ngOnInit() {
        this.form=new FormGroup({
            password:new FormControl(null,{
                updateOn:'change',
                validators:[Validators.required,Validators.minLength(4),Validators.maxLength(12)]
            })
        })
    }
    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

    onEditPassword() {
        this.alertCtrl.create
        ({header:"تأكيد",
            message:"هل تريد تأكيد التغيير",
            buttons:[
                {text:"oui",handler:()=>{
                        this.editPassword(this.username,
                            this.form.value['password'])
                    }},
                {text:"non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    editPassword(username:string,password:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'المرجو الانتظار...'}).then((loadingEl)=>{
            loadingEl.present();
            this.usersService.editPassword(username,password).subscribe(
                ()=>{},
                (error)=>{loadingEl.dismiss();this.showAlert(error.message)},
                ()=>{this.modalCtrl.dismiss({},'success');loadingEl.dismiss()}
            )
        })

    }

    private showAlert(message:string){
        this.alertCtrl.create({header:'Message',message:message,buttons:['Okay']}).then(
            (alertEl=>{alertEl.present()})
        )
    }

}
