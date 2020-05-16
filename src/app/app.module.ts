import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {File} from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@NgModule({

    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
    exports:[ ReactiveFormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        HttpClientModule,
        FileTransfer,
        File,
        FileOpener,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

