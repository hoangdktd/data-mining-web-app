import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { ArchitectureInfo, Service } from './app.service';

import { WebsocketService } from './socket.service';
import { DataMiningService } from './data-mining.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DxChartModule,
    DxSelectBoxModule
  ],
  providers: [
    Service,
    WebsocketService,
    DataMiningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
