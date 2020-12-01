import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SampleService } from './samples/sample.service';
import { SecurityService } from './security/security.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Directive, ViewContainerRef } from '@angular/core';
import { SamplesComponent } from './samples/samples.component';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    SummaryComponent
  ],
  entryComponents: [ SamplesComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    SampleService, 
    SecurityService, 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
