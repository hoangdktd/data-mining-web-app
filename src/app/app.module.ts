import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { ArchitectureInfo, Service } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxChartModule,
    DxSelectBoxModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
