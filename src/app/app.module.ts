import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'

import { NgChartsModule } from 'ng2-charts';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HomeDefaultComponent } from './modules/home-default/home-default.component';
import { ChartsComponent } from './modules/charts/charts.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeDefaultComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
