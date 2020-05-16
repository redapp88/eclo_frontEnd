import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import {AlertController, Platform} from '@ionic/angular';
import {AuthService} from './auth.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Injectable({
  providedIn: 'root'
})
export class DownloadsService {
  constructor(
        private transfer: FileTransfer,
        private file: File,
        private http:HttpClient,
        private platform: Platform,
        private alertCtrl: AlertController,
        private authService:AuthService,
        private fileOpener:FileOpener,
    ) {
    }




    public downloadFile3(fileName:string) {
        return new Observable(observer=>{
            let url=`${environment.backEndUrl}/downloadFile?fileName=${fileName}`;
            if (!this.platform.is('cordova')) {
                console.log(fileName)
                window.open(url, '_system');
                observer.complete();
            }
            else{
                const fileTransfer: FileTransferObject = this.transfer.create();
                fileTransfer.download(url, this.file.externalDataDirectory+ fileName).then((entry) => {
                  /* this.fileOpener.open(entry.toURL(), 'application/vnd.ms-excel')  .then(() => console.log('File is opened'))
                        .catch(e => console.log('Error opening file', e));*/
                    //this.document.viewDocument(entry.toURL(), 'application/vnd.ms-excel', {});
                    console.log(entry);
                    observer.complete();
                }, (error) => {
                    console.log(error)
                    observer.error()
                });
            }
        })
    }
}
