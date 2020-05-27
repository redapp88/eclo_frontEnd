import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Program} from '../../models/Program.model';
import {AppUser} from '../../models/appUser.model';
import {UsersService} from '../../services/users.service';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {AddLessonComponent} from '../../user-area/lessons/add-lesson/add-lesson.component';
import {AddUserComponent} from './add-user/add-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  form:FormGroup;
    usersCategories: any[];
    usersAreas:any[];
    loadedUsers:AppUser[];
    usersSubscription:Subscription;
    isLoading=false;
  constructor(private authService:AuthService,
              private usersService:UsersService,
              private alertCtrl:AlertController,
              private modalCtrl:ModalController,
              private toastCtrl:ToastController) { }

  ngOnInit() {
    this.usersCategories=this.usersService.usersCategories;
      this.usersAreas=this.usersService.usersAreas;
      this.form=new FormGroup({
          categorie:new FormControl(this.usersCategories[0].id,{
              updateOn:'change',
              validators:[Validators.required]
          }),
          keyword:new FormControl('',{
              updateOn:'change',
              validators:[]
          })
      })
      this.usersSubscription=this.usersService.usersSubject.subscribe(
          (resultData)=>{
              this.loadedUsers=resultData;
          }
      )
  }
    ionViewWillEnter(){
        this.loadUsers();
    }
    onAddUser() {
        this.modalCtrl.create(
            {component:AddUserComponent,componentProps:{}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.loadUsers();
            }
        })
    }
    onEditUser(user:any) {
        this.modalCtrl.create(
            {component:EditUserComponent,componentProps:{user:user}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.loadUsers();
            }
        })
    }
    onDeleteUser(username:string) {
        this.alertCtrl.create(
            {header:'تأكيد',
                message:'هل تريد ازالة هذا المستخدم؟ ',
                buttons:[{text:'نعم',handler:()=>{this.deleteUser(username)}},{text:'لا',role:'cancel'}]}
        ).then(alertEl=>{
            alertEl.present()
        })
    }
    private deleteUser(username:string){
        this.usersService.deleteUser(username).subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message)},
            ()=>{this.loadUsers();
                this.toastCtrl.create(
                    {message:'operation reussite',color:'success',duration:2000}
                ).then(toastEl=>{toastEl.present()})}
        )
    }
     loadUsers(){
        console.log(this.form.value['keyword'],this.form.value['categorie']);
        this.isLoading=true;
        this.usersService.fetchUsers('active',this.form.value['keyword'],this.form.value['categorie']).subscribe(
            ()=>{},
            (error)=>{this.usersService.showAlert(error.error.message);this.isLoading=false;},
            ()=>{
                this.isLoading=false;
            }
        );
    }

    areaById(id:string){
       let  area:string;
       for(let i=0;i<this.usersService.usersAreas.length;i++){
           if(this.usersService.usersAreas[i].id==id)
               area=this.usersService.usersAreas[i].name;
        }
        return area;

    }

}
