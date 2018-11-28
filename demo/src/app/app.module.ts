import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import {HttpModule,JsonpModule} from "@angular/http";

import {FormsModule} from "@angular/forms";





import { AppComponent } from './app.component';
import { StartComponent } from './components/start/start.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { SearchComponent } from './components/search/search.component';
import { HotComponent } from './components/hot/hot.component';
import { PcontentComponent } from './components/pcontent/pcontent.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';



import { HttpClientService } from "./services/httpclient.service";

import { SocketioService } from "./services/socketio.service";

import { StorageService } from "./services/storage.service";

import { EditpeopleinfoComponent } from './components/editpeopleinfo/editpeopleinfo.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    SearchComponent,
    HotComponent,
    PcontentComponent,
    NavfooterComponent,
    EditpeopleinfoComponent,
    SuccessComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpModule, JsonpModule,FormsModule],
  providers: [HttpClientService,SocketioService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
